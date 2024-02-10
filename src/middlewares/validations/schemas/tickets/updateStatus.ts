import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";

export const updateTicketStatusSchema = Joi.object().keys({
    // id:Joi.string(),
    query_status: Joi.string().valid('OPEN','CLOSE').required().error(errors => stringErrorHandler(errors, 'QueryStatus')), 

})