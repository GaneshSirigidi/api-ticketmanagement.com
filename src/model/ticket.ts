
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

  priority:
  {
    type: String,
    enum: ["HIGH", "MEDIUM", "LOW"]
  },

  query_status: {
    type: String,
    enum: ["OPEN", "CLOSED"],
    default: "OPEN",
  },

  requirement_brief: {
    type: String
  },

  subject:
  {
    type: String
  },
  
  assigned_to: {
    type:String
  },

  assigned_count: {
    type:Number
  },

  unassigned_count: {
    type:Number
  }

}, {
  timestamps: {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  },
  versionKey: false
})

export const TicketModel = model('Ticket', ticketSchema, 'tickets')