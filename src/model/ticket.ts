import { Schema, model } from 'mongoose'

const ticketSchema = new Schema({
  name: {
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
  response:
  {
    type: String
  },
  query_status: {
    type: String
  },
  requirement_brief: {
    type: String
  }
}, {
  timestamps: {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  },
})

export const TicketModel = model('Ticket', ticketSchema, 'tickets')