import { addTicketSchema } from "./tickets/addTicket";

export default {
    '/tickets':
    {
        multi: true,
        post: addTicketSchema
    }
}