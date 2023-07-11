
import { Schema, model } from 'mongoose'

const ticketSchema = new Schema({

  ticket_id: {
    type: String
  },

  requester: {
    type: String,
  },

  email: {
    type: String,
    lowercase: true
  },

  company_name:
  {
    type: String
  },

  priority:
  {
    type: String,
    enum: ["HIGH", "MEDIUM", "LOW"]
  },

  query_status: {
    type: String,
    enum: ["OPEN", "CLOSE"],
    default: "OPEN",
  },

  requirement_brief: {
    type: String
  },

  subject:
  {
    type: String
  }

}, {
  timestamps: {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  },
  versionKey: false
})

export const TicketModel = model('Ticket', ticketSchema, 'tickets')