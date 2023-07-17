import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";

export const replyTicketSchema = Joi.object().keys({
    message: Joi.string().required().error(errors => stringErrorHandler(errors, 'Message')), 

})