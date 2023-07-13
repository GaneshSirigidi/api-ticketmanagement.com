import { ThreadModel } from "../model/thread";

export class ThreadsDataServiceProvider{
    
     async replyTickets(replyData) {
        return await ThreadModel.create(replyData)
    }
    
    async getAll({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {
        if (lean) {
          return ThreadModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select('-request_id').lean()
        }
        return ThreadModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select('-request_id')
    }
    
    async countAll({ query = {} }) {
        return ThreadModel.countDocuments(query)
      }
}