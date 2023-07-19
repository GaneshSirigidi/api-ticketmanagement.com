"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTicket_1 = require("./tickets/addTicket");
const listTicket_1 = require("./tickets/listTicket");
const replyTicket_1 = require("./tickets/replyTicket");
const updateStatus_1 = require("./tickets/updateStatus");
const forgot_password_request_1 = require("./users/forgot-password-request");
const reset_password_1 = require("./users/reset-password");
const signin_1 = require("./users/signin");
const singup_1 = require("./users/singup");
exports.default = {
    //User
    '/user/tickets': {
        multi: true,
        post: addTicket_1.addTicketSchema,
        get: listTicket_1.listTicketSchema
    },
    '/user/signup': {
        multi: true,
        post: singup_1.signUpSchema
    },
    '/user/signin': {
        multi: true,
        post: signin_1.signInSchema
    },
    '/user/profile': {
        multi: true,
        patch: singup_1.updateProfileSchema
    },
    '/user/tickets/:id': {
        multi: true,
        patch: addTicket_1.updateTicketSchema
    },
    '/user/forgot-password': {
        multi: true,
        patch: forgot_password_request_1.forgotPasswordRequestSchema
    },
    '/user/reset-password': {
        multi: true,
        patch: reset_password_1.resetPasswordSchema
    },
    //Agent
    '/agent/signin': {
        multi: true,
        post: signin_1.signInSchema
    },
    '/agent/profile': {
        multi: true,
        patch: singup_1.updateProfileSchema
    },
    '/agent/tickets/:id/reply': {
        multi: true,
        post: replyTicket_1.replyTicketSchema
    },
    //Admin
    '/admin/signup': {
        multi: true,
        post: singup_1.signUpSchema
    },
    '/admin/signin': {
        multi: true,
        post: signin_1.signInSchema
    },
    '/admin/agent': {
        multi: true,
        post: singup_1.agentSignUpSchema
    },
    '/admin/profile': {
        multi: true,
        patch: singup_1.updateProfileSchema
    },
    '/admin/tickets/:id/reply': {
        multi: true,
        post: replyTicket_1.replyTicketSchema
    },
    '/admin/tickets/:id': {
        multi: true,
        patch: updateStatus_1.updateTicketStatusSchema
    }
};
