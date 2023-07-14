import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";

export const listTicketSchema = Joi.object().keys({
    requester: Joi.string().error(stringErrorHandler),
    email: Joi.string().email({ tlds: { allow: false } }).error(stringErrorHandler),
    priority: Joi.string().valid('HIGH', 'MEDIUM', 'LOW').error(stringErrorHandler),
    query_status: Joi.string().valid('OPEN', 'CLOSE').error(stringErrorHandler),
    subject: Joi.string().error(stringErrorHandler),
    requirement_brief:Joi.string().error(stringErrorHandler),

})