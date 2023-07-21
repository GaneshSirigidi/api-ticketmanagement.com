"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    full_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone_number: {
        type: String
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'ARCHIVE'],
        default: "ACTIVE",
    },
    user_type: {
        type: String,
        enum: ['USER', 'ADMIN', 'AGENT'],
        default: 'USER'
    },
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey: false
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema, 'users');
