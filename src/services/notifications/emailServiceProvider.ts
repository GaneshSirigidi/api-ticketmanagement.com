import ejs from "ejs";
import dotenv from 'dotenv';
dotenv.config();

import { SendInBlueAPIDataServiceProvider } from "../notifications/sendInBlueApiService";
import ticketDetails from "../../views/emailTemplates/sendTicketdetails";
import forgotPasswordTemplate from "../../views/emailTemplates/forgotPasswordTemplate";


const sendInBlueAPIDataServiceProvider = new SendInBlueAPIDataServiceProvider();

class EmailServiceProvider {
  constructor() {
    this.sendEmail = this.sendEmail.bind(this);
    this.sendAdminEmail = this.sendAdminEmail.bind(this);
  }

  async sendEmail(emailData: any, emailContent: any, emailTemplate: any) {
    try {

      const emailRecipient = emailData.email;
      const emailSubject = emailData.subject;
      const emailBody = ejs.render(emailTemplate, emailContent);

      var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: emailRecipient,
        subject: emailSubject,
        html: emailBody,
      };
      await sendInBlueAPIDataServiceProvider.sendEmail(mailOptions);
    } catch (error) {
      // TODO:: Error Log
      throw error
    }
  }

  async sendAdminEmail(emailData: any, emailContent: any, emailTemplate: any) {
    try {
      const adminEmail = "mfather913@gmail.com";
      const emailSubject = "TMS Ticket";

      const emailBody = ejs.render(emailTemplate, { ticketData: emailContent._doc });

      var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: adminEmail,
        subject: emailSubject,
        html: emailBody,
      };

      await sendInBlueAPIDataServiceProvider.sendEmail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }

  async sendTicketDetailsEmail(emailData: any, emailContent: any) {
    await this.sendAdminEmail(emailData, emailContent, ticketDetails);
  }
  async sendForgotPasswordDetailsEmail(emailData: any, emailContent: any) {
    try {
      await this.sendEmail(emailData, emailContent, forgotPasswordTemplate);
    }
    catch (err) {
      throw err
    }
  }

}

export default new EmailServiceProvider();
