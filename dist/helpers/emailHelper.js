"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTicketdetailsData = void 0;
const prepareTicketdetailsData = (ticketData) => {
    const name = ticketData.requester;
    const emailData = {
        email: ticketData.email,
        subject: ticketData.subject,
        name
    };
    const emailContent = Object.assign({ name }, ticketData);
    return { emailData, emailContent };
};
exports.prepareTicketdetailsData = prepareTicketdetailsData;
