import { addTicketSchema } from "./tickets/addTicket";
import { listTicketSchema } from "./tickets/listTicket";
import { replyTicketSchema } from "./tickets/replyTicket";
import { signInSchema } from "./users/signin";
import { signUpSchema, updateProfileSchema } from "./users/singup";

export default {
    //User

    '/user/tickets':
    {
        multi: true,
        post: addTicketSchema,
        get: listTicketSchema
    },

    '/user/signup':
    {
        multi: true,
        post: signUpSchema
    },

    '/user/signin':
    {
        multi: true,
        post: signInSchema
    },

    '/user/profile':
    {
        multi: true,
        patch: updateProfileSchema
    },


    //Agent

    '/agent/signin':
    {
        multi: true,
        post: signInSchema
    },

    '/agent/profile':
    {
        multi: true,
        patch: updateProfileSchema
    },

    '/agent/tickets/:id/reply':
    {
        multi: true,
        post: replyTicketSchema
    },

    //Admin
    '/admin/signup':
    {
        multi: true,
        post: signUpSchema
    },

    '/admin/signin':
    {
        multi: true,
        post: signInSchema
    },

    '/admin/agent': {
        multi: true,
        post: signUpSchema
    },

    '/admin/profile':
    {
        multi: true,
        patch: updateProfileSchema
    },

    '/admin/tickets/:id/reply':
    {
        multi: true,
        post: replyTicketSchema
    }
}