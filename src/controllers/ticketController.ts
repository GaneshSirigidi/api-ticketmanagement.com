
import { Request, Response, NextFunction } from "express";
import { TicketDataServiceProvider } from '../services/ticketDataServiceProvider'
import paginationHelper from "../helpers/paginationHelper";
import { stringGen } from "../helpers/stringGen";
import { UserDataServiceProvider } from "../services/userDataServiceProvider";
import { ThreadsDataServiceProvider } from "../services/threadsDataServiceProvider";
import roleBasedFilterHelper from "../helpers/roleBasedFilterHelper";
import filterHelper from "../helpers/filterHelper";
import emailServiceProvider from "../services/notifications/emailServiceProvider";
import { prepareAssignTicketdetailsData, prepareTicketdetailsData } from "../helpers/emailHelper";
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'

import { S3DataServiceProvider } from "../services/s3DataServiceProvider";

const threadsDataServiceProvider = new ThreadsDataServiceProvider()
const userDataServiceProvider = new UserDataServiceProvider()
const ticketDataServiceProvider = new TicketDataServiceProvider();
const s3DataServiceProvider = new S3DataServiceProvider()

export class TicketController {

  public async addTicket(req: Request, res: Response, next: NextFunction) {
    try {

      const ticketData = req.body;
      const ticketId = await stringGen();
      ticketData.ticket_id = ticketId;
      const responseData = await ticketDataServiceProvider.saveTicket(ticketData);

      const fileName = `${uuidv4()}_${req.body.file}`;
      if (!fileName) {
        return res.status(400).json({ message: "No file provided" });
      }
      await ticketDataServiceProvider.findTicket(ticketId)

      const proof = await ticketDataServiceProvider.addProof(ticketId, fileName)

      responseData.proofs = proof


      const filePath = "Ticket-Proofs";
      const uploadUrl = await s3DataServiceProvider.getPreSignedUrl(fileName, 'put', filePath)

      // send email to admin 
      const { emailData, emailContent } = prepareTicketdetailsData(responseData)
      await emailServiceProvider.sendTicketDetailsEmail(emailData, emailContent)

      //send email to user
      await emailServiceProvider.sendTicketDetailsEmailToUser(emailData, emailContent)

      return res.status(200).json({
        success: true,
        message: "Ticket Created successfully",
        data: responseData,
        uploadUrl: uploadUrl
      });
    }
    catch (err) {
      return next(err)
    }
  }

  public async listTickets(req: Request, res: Response, next: NextFunction) {
    try {

      const { skip, limit, sort } = req.parsedFilterParams || {};
      let { query = {} } = req.parsedFilterParams || {};
      query = filterHelper.tickets(query, req.query)
      query = roleBasedFilterHelper.tickets(query, req.user, req.query);

      const [tickets, count] = await Promise.all([
        ticketDataServiceProvider.getAll({
          query, skip, limit, sort
        }),
        ticketDataServiceProvider.countAll({ query })
      ])

      if (!tickets.length) {
        return res.status(400).json({
          success: false,
          message: "No tickets found",
          data: [],
        });
      }

      const response = paginationHelper.getPaginationResponse({
        page: req.query.page || 1,
        count,
        limit,
        skip,
        data: tickets,
        message: "Tickets fetched successfully",
        searchString: req.query.search_string,
      });

      return res.status(200).json(response);
    }
    catch (err) {
      return next(err)
    }
  }

  public async updateTicket(req: Request, res: Response, next: NextFunction) {
    try {

      const ticketId = req.params.id
      await ticketDataServiceProvider.updateTicket(ticketId, req.body);

      return res.status(200).json({
        success: true,
        message: "Ticket Updated successfully"
      });
    }
    catch (err) {
      return next(err)
    }
  }
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {

      const ticketId = req.params.id;
      if (!ticketId.length) {
        return res.status(400).json({
          success: false,
          message: "Ticket not found",
          data: [],
        });
      }
      const ticketData = await ticketDataServiceProvider.getOne(ticketId);

      if (ticketData === null) {
        return res.status(400).json({
          success: false,
          message: "Ticket details not found",
          data: [],
        });
      }

      return res.status(200).json({
        success: true,
        message: "Ticket details fetched successfully",
        data: ticketData,
      });

    }
    catch (err) {

      return next(err);
    }
  }
  public async getThread(req: Request, res: Response, next: NextFunction) {
    try {

      const ticketId = req.params.id;
      if (!ticketId.length) {
        return res.status(400).json({
          success: false,
          message: "Ticket not found",
          data: [],
        });
      }
      const ticketData = await threadsDataServiceProvider.getTicketById(ticketId);

      if (ticketData === null) {
        return res.status(400).json({
          success: false,
          message: "Ticket details not found",
          data: [],
        });
      }

      return res.status(200).json({
        success: true,
        message: "Ticket details fetched successfully",
        data: ticketData,
      });

    }
    catch (err) {

      return next(err);
    }
  }
  public async assignTicket(req: Request, res: Response,) {
    try {

      const agent = req.body;
      const emailExists = await userDataServiceProvider.emailExists(agent.assigned_to)
      if (!emailExists) {
        return res.status(400).json({
          success: false,
          message: "Agent not found",
          data: [],
        });
      }

      const id = req.params.id
      const ticektDetails = await ticketDataServiceProvider.ticketExists(id)
      if (!ticektDetails) {
        return res.status(400).json({
          success: false,
          message: "Ticket not found",
          data: [],
        });
      }

      await ticketDataServiceProvider.assignTicketById(id, agent);

      const { emailData, emailContent } = prepareAssignTicketdetailsData(ticektDetails, agent)
      await emailServiceProvider.sendTicketDetailsToAgentEmail(emailData, emailContent)

      return res.status(200).json({
        success: true,
        message: `Ticket assigned to ${agent.assigned_to}`,
      });

    } catch (error) {
      let respData = {
        success: false,
        message: error.message,
      };
      return res.status(error.statusCode || 500).json(respData);
    }
  }

  public async replyTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const reqData = req.body
      const ticketId = req.params.id;
      const ticket = await ticketDataServiceProvider.getTicketById(ticketId);

      if (!ticket) {
        return res.status(400).json({
          success: false,
          message: "Ticket not found",
        });
      }
      const replyData = {
        reporter_by: req.user.full_name,
        ticket_id: ticketId,
        reporter_type: req.user.user_type,
        message: reqData.message,
        ticket_status: reqData.ticket_status
      };

      const threadData = await threadsDataServiceProvider.replyTicket(replyData);
      //  await ticketDataServiceProvider.updateTicketStatus(ticket, reqData.ticket_status)

      return res.status(200).json({
        success: true,
        message: "Reply posted successfully",
        data: threadData,
      });
    } catch (err) {
      return next(err);
    }
  }

  public async mainReply(req: Request, res: Response, next: NextFunction) {
    try {
      const reqData = req.body
      const ticketId = req.params.id;
      const ticket = await ticketDataServiceProvider.getTicketById(ticketId);
     
      if (!ticket) {
        return res.status(400).json({
          success: false,
          message: "Ticket not found",
        });
      }

      if (ticket && ticket.query_status === 'CLOSE') {
        return res.status(400).json({
          success: false,
          message: "Query status should be in Open",
        });
      }

      const replyData = {
        reporter_by: req.user.full_name,
        reporter_type: req.user.user_type,
        message: reqData.message,
      };
      ticket.reply=replyData
      await ticketDataServiceProvider.replyTicket(ticketId,replyData);

      return res.status(200).json({
        success: true,
        message: "Reply posted successfully",
      });
    } catch (err) {
      return next(err);
    }
  }

  async replyTicketWithImage(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketId = req.params.id;
      const ticket = await ticketDataServiceProvider.getTicketById(ticketId);

      if (!ticket) {
        return res.status(400).json({
          success: false,
          message: "Ticket not found",
        });
      }

      const fileName = `${uuidv4()}_${req.body.file}`;
      if (!fileName) {
        return res.status(400).json({ message: "No file provided" });
      }

      const proof = {
        file_path: fileName,
      }
      const replyData =
      {
        ticket_id: ticketId,
        reporter_by: req.user.full_name,
        reporter_type: req.user.user_type,
        message: req.body.message,
        proofs: [proof]
      }
      const threadData = await threadsDataServiceProvider.replyTicketWithProof(replyData);

      const filePath = "Ticket-Proofs";
      const uploadUrl = await s3DataServiceProvider.getPreSignedUrl(fileName, 'put', filePath);


      return res.status(200).json({
        success: true,
        message: "Reply posted successfully",
        data: threadData,
        uploadUrl
      });
    } catch (err) {
      return next(err);
    }
  }


  public async getThreads(req: Request, res: Response) {
    try {
      const ticketId = req.params.id
      const ticketData = await ticketDataServiceProvider.getTicketById(ticketId);

      const { skip, limit, sort } = req.params;
      const query = {
        ticket_id: { $eq: ticketId }
      };

      const [threadsData, count] = await Promise.all([
        threadsDataServiceProvider.getAll({
          query, skip, limit, sort
        }),
        threadsDataServiceProvider.countAll({
          query
        })
      ])

      const response = paginationHelper.getPaginationResponse({
        page: req.query.page || 1,
        count,
        limit,
        skip,
        data: [ticketData, threadsData],
        message: "Threads fetched successfully",
        searchString: req.query.search_string,
      });

      return res.status(200).json(response);
    }
    catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message || "Something went wrong"
      })
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {

      const ticketId = req.params.id
      if (!ticketId.length) {
        return res.status(400).json({
          success: false,
          message: "Ticket not found",
          data: [],
        });
      }

      await ticketDataServiceProvider.delete(ticketId)

      return res.status(200).json({
        success: true,
        message: "Ticket deleted successfully",
      });
    }
    catch (error) {
      return next(error);
    }
  }

  public async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketId = req.params.id;
      const ticketStatus = req.body

      const responseData = await ticketDataServiceProvider.updateTicketStatus(ticketId, ticketStatus)
      return res.status(200).json({
        success: true,
        message: "Ticket status updated successfully",
      });
    }
    catch (error) {
      return next(error);
    }
  }
  public async getAgentTickets(req: Request, res: Response, next: NextFunction) {
    try {

      const { skip, limit, sort } = req.parsedFilterParams || {};
      let { query = {} } = req.parsedFilterParams || {};

      const id = req.params.id
      const userData = await userDataServiceProvider.getEmail(id)
      const email = userData.email

      query.assigned_to = email;
      query = filterHelper.tickets(query, req.query)

      const [tickets, count] = await Promise.all([
        ticketDataServiceProvider.getAll({
          query, skip, limit, sort
        }),
        ticketDataServiceProvider.countAll({ query })
      ])

      if (!tickets.length) {
        return res.status(400).json({
          success: false,
          message: "No tickets found",
          data: [],
        });
      }

      const response = paginationHelper.getPaginationResponse({
        page: req.query.page || 1,
        count,
        limit,
        skip,
        data: tickets,
        message: "Tickets fetched successfully",
        searchString: req.query.search_string,
      });

      return res.status(200).json(response);
    }
    catch (err) {
      return next(err)
    }
  }


  public async ticketsStatistics(req: Request, res: Response, next: NextFunction) {
    try {

      const count = await ticketDataServiceProvider.count()
      return res.status(200).json({
        success: true,
        message: "Statistics fetched successfully",
        open_tickets: count.open_tickets,
        closed_tickets: count.closed_tickets,
        unassigned_tickets: count.unassigned_tickets,
        assigned_to_me: count.assigned_to_me,
        assigned_to_others: count.assigned_to_others,
        total_tickets:count.total_tickets

      });
    }
    catch (error) {
      return next(error);
    }
  }
  public async updateProof(req: Request, res: Response, next: NextFunction) {
    try {
      const fileName = `${uuidv4()}_${req.body.file}`;
      if (!fileName) {
        return res.status(400).json({
          success: "false",
          message: "No file provided"
        });
      }
      const accessToken = req.headers.authorization;
      const userDetails = jwt.decode(accessToken);
      const userType = userDetails.user_type
      await ticketDataServiceProvider.saveProof(req.params.id, fileName, userType)
      const filePath = "Ticket-Proofs";
      const uploadUrl = await s3DataServiceProvider.getPreSignedUrl(fileName, 'put', filePath)

      let data = {
        "upload_url": uploadUrl,
      }
      return res.status(200).json({
        success: true,
        message: "Successfully generated pre-signed url",
        data,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: "false",
        message: "Internal server error"
      });
    }
  }

  public async downloadProof(req: Request, res: Response, next: NextFunction) {
    try {

      const ticketData = await ticketDataServiceProvider.getTicketById(req.params.id)
      if (!ticketData) {
        return res.status(400).json({
          success: "false",
          message: "Ticket Not Found"
        });

      }
      const filePath = "Ticket-Proofs"
      const downloadUrls = [];

      // Loop through each proof file path in the ticketData.proofs array
      for (const proof of ticketData.proofs) {
        const fileName = proof.file_path;
        // Generate the download URL for each proof file and add it to the downloadUrls array
        const downloadUrl = await s3DataServiceProvider.getPreSignedUrl(fileName, 'get', filePath)
        downloadUrls.push(downloadUrl);
      }

      return res.status(200).json({
        success: true,
        message: "Successfully generated pre-signed URLs",
        data: downloadUrls,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        sucess: "fasle",
        message: "Internal server error"
      });
    }
  }


  public async deleteProof(req: Request, res: Response, next: NextFunction) {
    try {

      const ticketData = await ticketDataServiceProvider.getTicketById(req.params.id)
      if (!ticketData) {
        return res.status(400).json({
          success: "false",
          message: "Ticket Not Found"
        });
      }
      const proofId = req.body.id

      await ticketDataServiceProvider.deleteProof(req.params.id, proofId)
      return res.status(200).json({
        success: true,
        message: "Successfully deleted",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        sucess: "fasle",
        message: "Internal server error"
      });
    }
  }



  public async downloadProofInThreads(req: Request, res: Response, next: NextFunction) {
    try {

      const ticketData = await threadsDataServiceProvider.getTicketById(req.params.id)
      if (!ticketData) {
        return res.status(400).json({
          success: "false",
          message: "Ticket Not Found"
        });

      }
      const filePath = "Ticket-Proofs"
      const downloadUrls = [];

      // Loop through each proof file path in the ticketData.proofs array
      for (const proof of ticketData.proofs) {
        const fileName = proof.file_path;
        // Generate the download URL for each proof file and add it to the downloadUrls array
        const downloadUrl = await s3DataServiceProvider.getPreSignedUrl(fileName, 'get', filePath)
        downloadUrls.push(downloadUrl);
      }

      return res.status(200).json({
        success: true,
        message: "Successfully generated pre-signed URLs",
        data: downloadUrls,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        sucess: "fasle",
        message: "Internal server error"
      });
    }
  }

  public async updateProofInThreads(req: Request, res: Response, next: NextFunction) {
    try {
      const fileName = `${uuidv4()}_${req.body.file}`;
      if (!fileName) {
        return res.status(400).json({
          success: "false",
          message: "No file provided"
        });
      }
      const accessToken = req.headers.authorization;
      const userDetails = jwt.decode(accessToken);
      const userType = userDetails.user_type
      await threadsDataServiceProvider.saveProof(req.params.id, fileName, userType)
      const filePath = "Ticket-Proofs";
      const uploadUrl = await s3DataServiceProvider.getPreSignedUrl(fileName, 'put', filePath)

      let data = {
        "upload_url": uploadUrl,
      }
      return res.status(200).json({
        success: true,
        message: "Successfully generated pre-signed url",
        data,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: "false",
        message: "Internal server error"
      });
    }
  }


}