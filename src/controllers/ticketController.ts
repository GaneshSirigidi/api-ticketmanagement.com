
import { Request, Response, NextFunction } from "express";

import { TicketDataServiceProvider } from '../services/ticketService'
import paginationHelper from "../helpers/paginationHelper";

const ticketDataServiceProvider = new TicketDataServiceProvider()

export class TicketController {

  public async addTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketData = req.body
      const queryData = await ticketDataServiceProvider.saveTicket(ticketData)

      return res.status(200).json({
        success: true,
        message: "Token Created successfully",
        data: queryData,
      });
    }
    catch (err) {

      return next(err)
    }
  }

  public async listTickets(req: Request, res: Response, next: NextFunction) {
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

      return next(err)
    }
  }
  public async replyTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      console.log("id", id)
      const ticketData = req.body
      const queryData = await ticketDataServiceProvider.replyTicket(ticketData, id)

      return res.status(200).json({
        success: true,
        message: "reply Posted successfully",
        data: queryData,
      });
    }
    catch (err) {

      return next(err)
    }
  }

}