
import { Request, Response, NextFunction } from "express";

import { TicketDataServiceProvider } from '../services/ticketDataServiceProvider'
import paginationHelper from "../helpers/paginationHelper";

const ticketDataServiceProvider = new TicketDataServiceProvider()

export class TicketController {

  public async addTicket(req: Request, res: Response) {
    try {

      const ticketData = req.body
      ticketData.threads = [];
      const queryData = await ticketDataServiceProvider.saveTicket(ticketData)

      return res.status(200).json({
        success: true,
        message: "Token Created successfully",
        data: queryData,
      });
    }
    catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong"
      })
    }
  }

  public async listTickets(req: Request, res: Response) {
    try {
      const email = req.query.email

      const { skip, limit, sort } = req.params
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
      return res.status(500).json({
        success: false,
        message: "Something went wrong"
      })
    }
  }


  public async replyTicket(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { message } = req.body;
      const user = req.user
      const name=user.name
      const ticket = await ticketDataServiceProvider.getTicketById(id);

      if (!ticket) {
        return res.status(400).json({
          success: false,
          message: "Ticket not found",
        });
      }

      const thread = {
        name,
        message,
        timestamp: new Date(),
      };

      ticket.threads.push(thread); // Add the new thread to the ticket

      const updatedTicket = await ticketDataServiceProvider.saveTicket(ticket);

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


}