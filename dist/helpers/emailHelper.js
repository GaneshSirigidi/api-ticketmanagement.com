"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareForgotPasswordEmailData = exports.prepareTicketdetailsData = void 0;
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
const baseUrl = process.env.APP_URL;
const prepareForgotPasswordEmailData = (email, token, subject = "Forgot Password") => {
    const url = baseUrl + `/forgot-password/verify-email?token=${token}`;
    const emailData = {
        email: email,
        subject,
    };
    const emailContent = {
        resetURL: url,
    };
    return { emailData, emailContent };
};
exports.prepareForgotPasswordEmailData = prepareForgotPasswordEmailData;
