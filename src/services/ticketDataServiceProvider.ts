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

    if (lean) {
      return TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection).lean()
    }
    return TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection)
  }

  async countAll({ query = {} }) {
    return TicketModel.countDocuments(query)
  }

  async getOne(id) {
    return await TicketModel.findById(id)
  }

  async assignTicketById(id, data) {
    return await TicketModel.updateOne({ _id: id }, { $set: data });
  }

  async getAllUserTickets({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {

    if (lean) {
      return TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select('-assigned_to').lean()
    }
    return TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select('-assigned_to')
  }

  async ticketExists(id) {
    return await TicketModel.findOne({ _id: id })
  }

  async updateTicketStatus(ticket,ticketStatus) {
    return await TicketModel.updateOne({ _id: ticket.id }, { query_status: ticketStatus });
  }

  async updateTicket(id, body) {
    return await TicketModel.updateOne({ _id: id },
      { $set: body })
  }

  
}