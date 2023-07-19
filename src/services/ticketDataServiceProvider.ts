import { TicketModel } from "../model/ticket";


export class TicketDataServiceProvider {


  public async saveTicket(queryData) {
    return await TicketModel.create(queryData)
  }
  async saveProof(userId, fileName) {
    return await TicketModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { proofs: { file_path: fileName } } })
  }

  public async getTicketById(id) {
    return await TicketModel.findById({ _id: id });
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

  async ticketExists(id) {
    return await TicketModel.findOne({ _id: id })
  }

  async updateTicketStatus(ticketId, ticketStatus) {
    return await TicketModel.updateOne({ _id: ticketId }, { $set: ticketStatus });
  }

  async updateTicket(id, body) {
    return await TicketModel.updateOne({ _id: id },
      { $set: body })
  }

  async delete(id, body) {
    return await TicketModel.updateOne({ _id: id }, { $set: body })
  }


}