"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
const mongoose_1 = require("mongoose");
const threadSchema = new mongoose_1.Schema({
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
const ticketSchema = new mongoose_1.Schema({
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
    company_name: {
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
});
exports.TicketModel = (0, mongoose_1.model)('Ticket', ticketSchema, 'tickets');
