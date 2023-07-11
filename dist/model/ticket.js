"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
const mongoose_1 = require("mongoose");
const ticketSchema = new mongoose_1.Schema({
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
    // company_name:
    // {
    //   type: String
    // },
    priority: {
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
    subject: {
        type: String
    },
    assigned_to: {
        type: String
    }
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey: false
});
exports.TicketModel = (0, mongoose_1.model)('Ticket', ticketSchema, 'tickets');
