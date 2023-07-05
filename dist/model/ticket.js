"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
const mongoose_1 = require("mongoose");
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
    }
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
});
exports.TicketModel = (0, mongoose_1.model)('Ticket', ticketSchema, 'tickets');
