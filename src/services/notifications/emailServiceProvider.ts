import ejs from "ejs";
import dotenv from 'dotenv';
dotenv.config();

import { SendInBlueAPIDataServiceProvider } from "../notifications/sendInBlueApiService";
import ticketDetails from "../../views/emailTemplates/sendTicketdetails";


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
      const toEmails = [ emailRecipient ];

      var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: toEmails,
        subject: emailSubject,
        html: emailBody,
      };

      await sendInBlueAPIDataServiceProvider.sendEmail(mailOptions);
    } catch (error) {
      // TODO:: Error Log
      console.log(error);
    }
  }

  async sendAdminEmail(emailData: any, emailContent: any,emailTemplate:any) {
    try {
      const adminEmail = "mfather913@gmail.com"; // Replace with the admin's email address
      const emailSubject ="TMS Ticket";
  
      const emailBody = ejs.render(emailTemplate, { ticketData: emailContent._doc });
    
      var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: adminEmail,
        subject: emailSubject,
        html: emailBody,
      };
    
      await sendInBlueAPIDataServiceProvider.sendEmail(mailOptions);
    } catch (error) {
      // TODO: Error Log
      console.log(error);
    }
  }

  async sendTicketDetailsEmail(emailData: any, emailContent: any) {
    await this.sendAdminEmail(emailData, emailContent,ticketDetails);
  }
  
}

export default new EmailServiceProvider();
