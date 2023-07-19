import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";

export const addTicketSchema = Joi.object().keys({
    requester: Joi.string().required().error(errors => stringErrorHandler(errors, 'Requester')),
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => stringErrorHandler(errors, 'Email')),
    priority: Joi.string().valid('HIGH', 'MEDIUM', 'LOW').required().error(errors => stringErrorHandler(errors, 'Priority')),
    query_status: Joi.string().valid('OPEN', 'CLOSE').error(errors => stringErrorHandler(errors, 'Query status')),
    subject: Joi.string().required().error(errors => stringErrorHandler(errors, 'Subject')),
    requirement_brief:Joi.string().required().error(errors => stringErrorHandler(errors, 'Requirement Brief')),

})

export const updateTicketSchema = Joi.object().keys({
    id:Joi.string(),
    requester: Joi.string().required().error(errors => stringErrorHandler(errors, 'Requester')),
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => stringErrorHandler(errors, 'Email')),
    priority: Joi.string().valid('HIGH', 'MEDIUM', 'LOW').required().error(errors => stringErrorHandler(errors, 'Priority')),
    subject: Joi.string().required().error(errors => stringErrorHandler(errors, 'Subject')),
    requirement_brief:Joi.string().required().error(errors => stringErrorHandler(errors, 'Requirement Brief')),

})