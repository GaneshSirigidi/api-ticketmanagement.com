import { TicketModel } from "../model/ticket";
import { ThreadModel } from "../model/thread"


export class TicketDataServiceProvider {

  public async saveTicket(queryData) {
    return await TicketModel.create(queryData)
  }

  public async getTicketByTicketId(id) {
    return await TicketModel.findOne({ ticket_id: id }).select('-assigned_to');
  }

  async getAll({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false}) {
 
    if (query && query['email'].$eq===undefined) {
      delete query['email']  ; 
    }
    
    if (lean) {
      return TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection).lean()
    }
    return TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection)
  }

  async countAll({ query = {}}) {
    // if (query && query['email'].$eq===undefined) {
    //   delete query['email'] ; // Reset query to empty object
    // }
    return TicketModel.countDocuments(query)
  }

  async getOne(ticketId) {
    return await TicketModel.findOne({ ticket_id: ticketId })
  }

  async assignTicketById(ticketId, data) {
    return await TicketModel.updateOne({ ticket_id: ticketId }, { $set: data });
  }

  async ticketExists(ticketId) {
    return await TicketModel.findOne({ ticket_id: ticketId })
  }
  async updateTicketStatus(ticket,ticketStatus) {
    // let status = ticket.query_status;
    // console.log(status)
    // console.log(ticketStatus)
    // if (status === "OPEN") {
    //     ticket.query_status = ticketStatus;   
    // }
    return await TicketModel.updateOne({ _id: ticket.id }, { query_status: ticketStatus });
  }


}