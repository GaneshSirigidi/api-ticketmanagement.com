
import { Request, Response, NextFunction } from "express";

import { TicketDataServiceProvider } from '../services/ticketDataServiceProvider'
import paginationHelper from "../helpers/paginationHelper";
import {stringGen}  from "../helpers/stringGen";

const ticketDataServiceProvider = new TicketDataServiceProvider();

export class TicketController {

  public async addTicket(req: Request, res: Response,next:NextFunction) {
    try {

      const ticketData = req.body;
      const ticketId = await stringGen();
      ticketData.ticket_id = ticketId;
      // ticketData.threads = [];
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

  public async listTickets(req: Request, res: Response,next:NextFunction) {
    try {
      const email = req.query.email;

      const { skip, limit, sort } = req.params;
      const query = {
        email: { $eq: email }
      };

      const [tickets, count] = await Promise.all([
        ticketDataServiceProvider.getAll({
          query, skip, limit, sort
        }),
        ticketDataServiceProvider.countAll({
          query
        })
      ])

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


  public async replyTicket(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const ticket = await ticketDataServiceProvider.getTicketById(id);

      if (!ticket) {
        return res.status(400).json({
          success: false,
          message: "Ticket not found",
        });
      }
      const replyData = {
        reporter_by: req.user.name,
        request_id: req.body.request_id,
        reporter_type: req.user.user_type,
        message: req.body.message
      };

      const updatedTicket = await ticketDataServiceProvider.replyTickets(replyData);

      return res.status(200).json({
        success: true,
        message: "Reply posted successfully",
        data: updatedTicket,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  public async getThreads(req: Request, res: Response) {
    try {
      const id = req.query.id

      const { skip, limit, sort } = req.params;
      const query = {
        email: { $eq: id }
      };

      const [tickets, count] = await Promise.all([
        ticketDataServiceProvider.getThreads({
          query, skip, limit, sort
        }),
        ticketDataServiceProvider.countAll({
          query
        })
      ])

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
      return res.status(500).json({
        success: false,
        message: "Something went wrong"
      })
    }
  }




}