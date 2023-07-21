import { ThreadModel } from "../model/thread";

export class ThreadsDataServiceProvider {

  async replyTicket(replyData) {
    return await ThreadModel.create(replyData)
  }

  async replyTicketWithProof(replyData) {
    const threadReply = await ThreadModel.create(replyData);
    return threadReply;
  }


  async getAll({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {
    if (lean) {
      return ThreadModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection).lean()
    }
    return ThreadModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection)
  }

  async countAll({ query = {} }) {
    return ThreadModel.countDocuments(query)
  }
}