import { TicketModel } from "../model/ticket";


export class TicketDataServiceProvider {


  public async saveTicket(queryData) {
    return await TicketModel.create(queryData)
  }
  async saveProof(userId, fileName, userType) {

    return await TicketModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { proofs: { file_path: fileName, uploaded_by: userType } } })
  }

  async addProof(ticketId, fileName) {

    const result = await TicketModel.findOneAndUpdate(
      { ticket_id: ticketId },
      { $push: { proofs: { file_path: fileName } } },
      { new: true }
    );
    return result.proofs

  }

  async deleteProof(ticket_id, proof_id) {
    return await TicketModel.updateOne(
      { _id: ticket_id },
      { $pull: { proofs: { _id: proof_id } } })
  }
  async findTicket(ticketId) {
    return await TicketModel.findOne({ ticket_id: ticketId })
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
  async count() {
    const unassigned_tickets = await TicketModel.countDocuments({ assigned_to: { $exists: false } })
    const assigned_to_me = await TicketModel.countDocuments({ assigned_to: "admin@gmail.com" })
    const assigned_to_others = await TicketModel.countDocuments({$and: [{ assigned_to: { $ne: null } }, { assigned_to: { $ne: 'admin@gmail.com' } }],});
    const open_tickets = await TicketModel.countDocuments({ query_status: { $eq: "OPEN" } })
    const closed_tickets = await TicketModel.countDocuments({ query_status: { $eq: "CLOSE" } })
    const total_tickets = await TicketModel.countDocuments({query_status:{$ne:"ARCHIVE"}})

    return {
      unassigned_tickets,
      assigned_to_me,
      assigned_to_others,
      open_tickets,
      closed_tickets,
      total_tickets
    }
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

  async delete(id) {
    return await TicketModel.updateOne({ _id: id }, { $set: { status: "ARCHIVE" } });

  }

  async replyTicket(ticketId,replyData) {
    return await TicketModel.updateOne({ _id: ticketId }, { $set: { reply: replyData } })
  }


}