import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";

export const addTicketSchema = Joi.object().keys({
    author: Joi.string().required().error(errors => stringErrorHandler(errors, 'author')),
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => stringErrorHandler(errors, 'email')),
    priority: Joi.string().valid('HIGH', 'MEDIUM', 'LOW').required().error(errors => stringErrorHandler(errors, 'priority')),
    company_name: Joi.string().required().error(errors => stringErrorHandler(errors, 'company_name')),
    query_status: Joi.string().valid('OPEN', 'CLOSE').required().error(errors => stringErrorHandler(errors, 'query_status')),
    subject: Joi.string().required().error(errors => stringErrorHandler(errors, 'subject')),


})