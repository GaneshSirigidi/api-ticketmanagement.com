import { addProofSchema } from "./tickets/addProof";
import { addTicketSchema, updateTicketSchema } from "./tickets/addTicket";
import { listTicketSchema } from "./tickets/listTicket";
import { replyTicketSchema } from "./tickets/replyTicket";
import { updateProofSchema } from "./tickets/updateProof";
import { updateTicketStatusSchema } from "./tickets/updateStatus";
import { forgotPasswordRequestSchema } from "./users/forgot-password-request";
import { listUsersSchema } from "./users/listUsers";
import { resetPasswordSchema } from "./users/reset-password";
import { signInSchema } from "./users/signin";
import { agentSignUpSchema, signUpSchema, updateProfileSchema } from "./users/singup";

export default {
    //User

    '/user/tickets':
    {
        multi: true,
        post: addTicketSchema,
        get: listTicketSchema,
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

    '/profile':
    {
        multi: true,
        patch: updateProfileSchema
    },

    '/user/tickets/:id':
    {
        multi: true,
        patch: updateTicketSchema
    },

    '/user/forgot-password':
    {
        multi: true,
        patch: forgotPasswordRequestSchema
    },
    '/user/reset-password':
    {
        multi: true,
        patch: resetPasswordSchema
    },


    //Agent

    '/agent/signin':
    {
        multi: true,
        post: signInSchema
    },



    '/agent/tickets/:id/reply':
    {
        multi: true,
        post: replyTicketSchema
    },

    '/agent/tickets':
    {
        multi: true,
        get: listTicketSchema,
    },

    '/agent/tickets/:id/main-reply': {
        multi: true,
        post: replyTicketSchema,
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
        post: agentSignUpSchema
    },

    '/admin/agents': {
        multi: true,
        post: listUsersSchema
    },

    '/admin/users': {
        multi: true,
        post: listUsersSchema
    },



    '/admin/tickets/:id/reply':
    {
        multi: true,
        post: replyTicketSchema
    },

    '/admin/tickets/:id':
    {
        multi: true,
        patch: updateTicketStatusSchema
    },

    '/admin/tickets':
    {
        multi: true,
        get: listTicketSchema,
    },

    '/admin/agent/:id/tickets':
    {
        multi: true,
        get: listTicketSchema,
    },

    '/admin/tickets/:id/main-reply': {
        multi: true,
        post: replyTicketSchema,
    },


    '/user/ticket/proof':
    {
        multi: true,
        post: addProofSchema,
    },
    '/user/ticket/:id/proof':
    {
        multi: true,
        post: updateProofSchema
    },


}