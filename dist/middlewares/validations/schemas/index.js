"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTicket_1 = require("./tickets/addTicket");
const listTicket_1 = require("./tickets/listTicket");
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
    //Agent
    '/agent/signin': {
        multi: true,
        post: signin_1.signInSchema
    },
    '/agent/profile': {
        multi: true,
        patch: singup_1.updateProfileSchema
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
        post: singup_1.signUpSchema
    },
    '/admin/profile': {
        multi: true,
        patch: singup_1.updateProfileSchema
    },
};
