import { ThreadModel } from "../model/thread";

export class ThreadsDataServiceProvider {

  async replyTicket(replyData) {
    return await ThreadModel.create(replyData)
  }

  async replyTicketWithProof(fileName, user, ticket_id, body) {

    const newReply = {
      file_path: fileName,
      uploaded_by: user.user_type,
    };

    const threadReply = await ThreadModel.create({
      ticket_id: ticket_id,
      reporter_by: user.full_name,
      reporter_type: user.user_type,
      message: body.message,
      proofs: [newReply],
    });
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