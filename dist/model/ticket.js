"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
const mongoose_1 = require("mongoose");
const ticketSchema = new mongoose_1.Schema({
    ticket_id: {
        type: String,
        default: null
    },
    requester: {
        type: String,
        default: null
    },
    email: {
        type: String,
        lowercase: true,
        default: null
    },
    priority: {
        type: String,
        enum: ["HIGH", "MEDIUM", "LOW"],
    },
    query_status: {
        type: String,
        enum: ["OPEN", "CLOSE"],
        default: "OPEN",
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "ARCHIVE"],
        default: "ACTIVE",
    },
    requirement_brief: {
        type: String,
        default: null
    },
    file: {
        type: String,
        default: null
    },
    proofs: [
        {
            file_path: { type: String },
            uploaded_at: { type: Date, default: Date.now },
            uploaded_by: { type: String }
        }
    ],
    subject: {
        type: String,
        default: null
    },
    assigned_to: {
        type: String,
        default: null
    },
    assigned_count: {
        type: Number,
        default: null
    },
    unassigned_count: {
        type: Number,
        default: null
    },
    reply: {
        reporter_by: {
            type: String,
            default: null
        },
        reporter_type: {
            type: String,
            default: null
        },
        message: {
            type: String,
            default: null
        }
    }
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey: false
});
exports.TicketModel = (0, mongoose_1.model)('Ticket', ticketSchema, 'tickets');
