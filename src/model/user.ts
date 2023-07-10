import { Schema, model } from "mongoose";


const userSchema = new Schema({

    full_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    user_type: {
        type: String,
        enum: ['CLIENT', 'ADMIN', 'AGENT']
    }
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey: false
})

export const UserModel = model('User', userSchema, 'users')