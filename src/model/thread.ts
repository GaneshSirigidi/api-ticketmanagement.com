import { Schema, SchemaType, model } from "mongoose";


const threadSchema = new Schema({

    reporter_by: {
        type: String
    },
    ticket_id: {
        type: Schema.Types.ObjectId,
        ref: "Ticket"
    },
    reporter_type: {
        type: String
    },
    message:
    {
        type: String
    },
    ticket_status: {
        type:String
    }

}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey: false
})

export const ThreadModel = model('Thread', threadSchema, 'threads')