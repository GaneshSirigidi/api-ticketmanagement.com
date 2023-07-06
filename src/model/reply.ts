import { Schema, model } from 'mongoose'

const replySchema = new Schema({
    query_id: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    reply: {
        type: String,
    }
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
})

export const TicketModel = model('Reply', replySchema, 'reply')