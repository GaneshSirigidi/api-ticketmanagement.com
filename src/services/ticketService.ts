import { TicketModel} from "../model/ticket";


export class TicketDataServiceProvider{


    public async saveTicket(queryData) {
        return await TicketModel.create(queryData)
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
}