import { TicketModel } from "../model/ticket";
import { ThreadModel } from "../model/thread"


export class TicketDataServiceProvider {


  public async saveTicket(queryData) {
    return await TicketModel.create(queryData)
  }

  public async getTicketByTicketId(id) {
    return await TicketModel.findOne({ _id: id });
  }

  async getAll({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {

    if (query && query['email'].$eq === undefined) {
      delete query['email'];
    }

    if (lean) {
      return TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection).lean()
    }
    return TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection)
  }

  async countAll({ query = {} }) {
    // if (query && query['email'].$eq===undefined) {
    //   delete query['email'] ; // Reset query to empty object
    // }
    return TicketModel.countDocuments(query)
  }

  async getOne(id) {
    return await TicketModel.findOne({ _id: id })
  }

  async assignTicketById(id, data) {
    return await TicketModel.updateOne({ _id: id }, { $set: data });
  }

  async ticketExists(id) {
    return await TicketModel.findOne({ _id: id })
  }
  async updateTicketStatus(ticket,ticketStatus) {
    // const status = ticket.query_status;
    // if (status === "OPEN") {
    //   ticket.query_status = "CLOSED";
    // }
    return await TicketModel.updateOne({ _id: ticket.id }, { query_status: ticketStatus });
  }
  async updateTicket(id, body) {
    return await TicketModel.updateOne({ _id: id },
      { $set: body })
  }
}