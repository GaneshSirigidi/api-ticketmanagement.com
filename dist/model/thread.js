"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadModel = void 0;
const mongoose_1 = require("mongoose");
const threadSchema = new mongoose_1.Schema({
    reporter_by: {
        type: String
    },
    ticket_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    reporter_type: {
        type: String
    },
    message: {
        type: String
    },
    ticket_status: {
        type: String
    }
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey: false
});
exports.ThreadModel = (0, mongoose_1.model)('Thread', threadSchema, 'threads');
