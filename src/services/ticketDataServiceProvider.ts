import { TicketModel } from "../model/ticket";
import { ThreadModel } from "../model/thread"


export class TicketDataServiceProvider {

  public async saveTicket(queryData) {
    return await TicketModel.create(queryData)
  }
  public async replyTickets(replyData) {
    return await ThreadModel.create(replyData)

  }
  public async getTicketById(id) {
    return await TicketModel.findById({ _id: id });
  }

  async getAll({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {

    if (query && query['email'].$eq===undefined) {
      query = {}  ; // Reset query to empty object
    }
    if (lean) {
      return TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection).lean()
    }
    return TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection)
  }


  async getThreads({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {
    if (lean) {
      return ThreadModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select('-request_id').lean()
    }
    return ThreadModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select('-request_id')
  }


  async countAll({ query = {} }) {
    if (query && query['email'].$eq===undefined) {
      query = {}  ; // Reset query to empty object
    }
    return TicketModel.countDocuments(query)
  }

  async getOne(ticketId) {
    return await TicketModel.findOne({ticket_id:ticketId})
  }

  async assignTicketById(ticketId, data) {
    return await TicketModel.updateOne({ ticket_id: ticketId }, { $set: data });
  }

  async ticketExists(ticketId) {
    return await TicketModel.findOne({ticket_id:ticketId})
  }
}