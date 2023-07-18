import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";

export const forgotPasswordRequestSchema = Joi.object().keys({

    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => stringErrorHandler(errors, 'Email')),

})
