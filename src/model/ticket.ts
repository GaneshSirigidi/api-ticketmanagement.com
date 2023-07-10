import { Schema, model } from 'mongoose'



const ticketSchema = new Schema({

  author: {
    type: String,
  },

  email: {
    type: String,
    lowercase: true
  },

  phone: {
    type: String,
  },
  company_name:
  {
    type: String
  },
  query_status: {
    type: String,
    enum: ["OPEN", "CLOSE"],
    default: "OPEN",
  },

  requirement_brief: {
    type: String
  },

}, {
  timestamps: {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  },
  versionKey: false
})

export const TicketModel = model('Ticket', ticketSchema, 'tickets')