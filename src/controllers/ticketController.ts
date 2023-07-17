
import { Request, Response, NextFunction } from "express";
import { TicketDataServiceProvider } from '../services/ticketDataServiceProvider'
import paginationHelper from "../helpers/paginationHelper";
import { stringGen } from "../helpers/stringGen";
import { UserDataServiceProvider } from "../services/userDataServiceProvider";
import { ThreadsDataServiceProvider } from "../services/threadsDataServiceProvider";
import roleBasedFilterHelper from "../helpers/roleBasedFilterHelper";
import filterHelper from "../helpers/filterHelper";

const threadsDataServiceProvider = new ThreadsDataServiceProvider()
const userDataServiceProvider = new UserDataServiceProvider()
const ticketDataServiceProvider = new TicketDataServiceProvider();

export class TicketController {

  public async addTicket(req: Request, res: Response, next: NextFunction) {
    try {

      const ticketData = req.body;
      const ticketId = await stringGen();
      ticketData.ticket_id = ticketId;
      const queryData = await ticketDataServiceProvider.saveTicket(ticketData);

      return res.status(200).json({
        success: true,
        message: "Ticket Created successfully",
        data: queryData,
      });
    }
    catch (err) {
      return next(err)
    }
  }
  public async updateTicket(req: Request, res: Response, next: NextFunction) {
    try {

      const id = req.params.id
      await ticketDataServiceProvider.updateTicket(id, req.body);

      return res.status(200).json({
        success: true,
        message: "Ticket Updated successfully"
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
      query = roleBasedFilterHelper.tickets(query, req.user);
      
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

  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {

      const id = req.params.id;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "No ticket Id",
          data: [],
        });
      }

      const ticketData = await ticketDataServiceProvider.getOne(id);

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

      const assignData = req.body;
      const emailExists = await userDataServiceProvider.emailExists(assignData.assigned_to)
      if (!emailExists) {
        return res.status(400).json({
          success: false,
          message: "Agent not found",
          data: [],
        });
      }

      const id = req.params.id
      const ticektExists = await ticketDataServiceProvider.ticketExists(id)
      if (!ticektExists) {
        return res.status(400).json({
          success: false,
          message: "Ticket not found",
          data: [],
        });
      }

      await ticketDataServiceProvider.assignTicketById(id, assignData);

      return res.status(200).json({
        success: true,
        message: `Ticket assigned to ${assignData.assigned_to}`,
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


//TODO
  public async ticketsStatistics(req:Request,res:Response) {
    try {
      
      const totalTickets = await ticketDataServiceProvider.countAll({})
      return totalTickets;
    }
    catch (error) {
      
    }
  }



}