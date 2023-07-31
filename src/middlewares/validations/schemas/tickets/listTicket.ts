import Joi from "joi";
import { numberErrorHandler, stringErrorHandler } from "../../../../helpers/joiHelper";

const listSchema = {
    page: Joi.number().min(1).error(numberErrorHandler),
    limit: Joi.number().min(1).max(100).error(numberErrorHandler),
    order_by: Joi.string().valid('created_at', 'updated_at', '_id').error(stringErrorHandler).default('updated_at'),
    order_type: Joi.string().valid('asc', 'desc').error(stringErrorHandler).default('desc'),
    query_status: Joi.string().valid('CLOSE', 'OPEN').error(errors => stringErrorHandler(errors, 'query_status')),
    search_string: Joi.string(),
    assign_to: Joi.string()
}
export const listTicketSchema: Joi.ObjectSchema = Joi.object().keys({
    ...listSchema,
})