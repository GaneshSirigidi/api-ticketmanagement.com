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
const sendTicketdetailsToAdmin_1 = __importDefault(require("../../views/emailTemplates/sendTicketdetailsToAdmin"));
const forgotPasswordTemplate_1 = __importDefault(require("../../views/emailTemplates/forgotPasswordTemplate"));
const sendTicketdetailsToAgent_1 = __importDefault(require("../../views/emailTemplates/sendTicketdetailsToAgent"));
const sendTicketdetailsToUser_1 = __importDefault(require("../../views/emailTemplates/sendTicketdetailsToUser"));
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
                const emailSubject = "TMS Ticket";
                const emailBody = ejs_1.default.render(emailTemplate, emailContent);
                var mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: emailRecipient,
                    subject: emailSubject,
                    html: emailBody,
                };
                yield sendInBlueAPIDataServiceProvider.sendEmail(mailOptions);
            }
            catch (error) {
                // TODO:: Error Log
                throw error;
            }
        });
    }
    sendAdminEmail(emailData, emailContent, emailTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminEmail = "mfather913@gmail.com";
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
                console.log(error);
            }
        });
    }
    sendTicketDetailsEmail(emailData, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendAdminEmail(emailData, emailContent, sendTicketdetailsToAdmin_1.default);
        });
    }
    sendTicketDetailsEmailToUser(emailData, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendEmail(emailData, emailContent, sendTicketdetailsToUser_1.default);
        });
    }
    sendTicketDetailsToAgentEmail(emailData, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendEmail(emailData, emailContent, sendTicketdetailsToAgent_1.default);
        });
    }
    sendForgotPasswordDetailsEmail(emailData, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sendEmail(emailData, emailContent, forgotPasswordTemplate_1.default);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new EmailServiceProvider();
