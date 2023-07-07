import { Schema, model } from 'mongoose'

const threadSchema = new Schema({
  name: {
    type: String,
  },
  message: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

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

  query_status: {
    type: String
  },

  requirement_brief: {
    type: String
  },

  threads: [threadSchema],

}, {
  timestamps: {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  },
  versionKey: false
})

export const TicketModel = model('Ticket', ticketSchema, 'tickets')