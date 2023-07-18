
// import { CustomError } from '../../interfaces/customError'
import dotenv from 'dotenv';
dotenv.config();


const SibApiV3Sdk = require("sib-api-v3-typescript")

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
apiInstance.setApiKey(SibApiV3Sdk.AccountApiApiKeys.apiKey, process.env.SEND_IN_BLUE_SERVICE_KEY);

export class SendInBlueAPIDataServiceProvider {

  constructor() {
  }

  public async sendEmail(options) {
    try {
      const sender = {
        email: process.env.SENDER_EMAIL,
        name: process.env.SENDER_NAME,
      }

      const receivers  = [{ email: options.to }]
     
      const response=await apiInstance.sendTransacEmail({
        sender,
        to: receivers,
        subject: options.subject,
        htmlContent: options.html,
      })
   
    }
    catch (err) {
      console.log(err)
    }
  }

}
