"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendInBlueApiService_1 = require("../notifications/sendInBlueApiService");
const sendTicketdetails_1 = __importDefault(require("../../views/emailTemplates/sendTicketdetails"));
const sendInBlueAPIDataServiceProvider = new sendInBlueApiService_1.SendInBlueAPIDataServiceProvider();
class EmailServiceProvider {
    constructor() {
        this.sendEmail = this.sendEmail.bind(this);
        this.sendAdminEmail = this.sendAdminEmail.bind(this);
    }
    sendEmail(emailData, emailContent, emailTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailRecipient = emailData.email;
                const emailSubject = emailData.subject;
                const emailBody = ejs_1.default.render(emailTemplate, emailContent);
                const toEmails = [emailRecipient];
                var mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: toEmails,
                    subject: emailSubject,
                    html: emailBody,
                };
                yield sendInBlueAPIDataServiceProvider.sendEmail(mailOptions);
            }
            catch (error) {
                // TODO:: Error Log
                console.log(error);
            }
        });
    }
    sendAdminEmail(emailData, emailContent, emailTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminEmail = "mfather913@gmail.com"; // Replace with the admin's email address
                const emailSubject = "TMS Ticket";
                const emailBody = ejs_1.default.render(emailTemplate, { ticketData: emailContent._doc });
                var mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: adminEmail,
                    subject: emailSubject,
                    html: emailBody,
                };
                yield sendInBlueAPIDataServiceProvider.sendEmail(mailOptions);
            }
            catch (error) {
                // TODO: Error Log
                console.log(error);
            }
        });
    }
    sendTicketDetailsEmail(emailData, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAdminEmail(emailData, emailContent, sendTicketdetails_1.default);
        });
    }
}
exports.default = new EmailServiceProvider();
