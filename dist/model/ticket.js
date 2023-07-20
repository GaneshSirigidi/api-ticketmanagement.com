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
    priority: {
        type: String,
        enum: ["HIGH", "MEDIUM", "LOW"]
    },
    query_status: {
        type: String,
        enum: ["OPEN", "CLOSED"],
        default: "OPEN",
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE",
    },
    requirement_brief: {
        type: String
    },
    proofs: [
        {
            file_path: { type: String },
            uploaded_at: { type: Date, default: Date.now }
        }
    ],
    subject: {
        type: String
    },
    assigned_to: {
        type: String
    },
    assigned_count: {
        type: Number
    },
    unassigned_count: {
        type: Number
    }
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey: false
});
exports.TicketModel = (0, mongoose_1.model)('Ticket', ticketSchema, 'tickets');
