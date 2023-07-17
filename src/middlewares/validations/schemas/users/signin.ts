import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";

export const signInSchema = Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => stringErrorHandler(errors, 'email')),
    password: Joi.string().required().error(errors => stringErrorHandler(errors, 'Password')),
    
})