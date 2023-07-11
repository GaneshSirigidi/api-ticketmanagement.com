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

    phone_number: {
        type:String
    },

    user_type: {
        type: String,
        enum: ['USER', 'ADMIN', 'AGENT'],
        default:'USER'
    }
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey: false
})

export const UserModel = model('User', userSchema, 'users')