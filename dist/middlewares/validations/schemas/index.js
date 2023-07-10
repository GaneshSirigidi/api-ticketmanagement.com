"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTicket_1 = require("./tickets/addTicket");
exports.default = {
    '/tickets': {
        multi: true,
        post: addTicket_1.addTicketSchema
    }
};
