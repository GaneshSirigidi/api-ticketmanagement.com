import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";
import dataFormatConstants from "../../../../constants/dataFormatConstants";

export const addClientSchema = Joi.object().keys({
    full_name: Joi.string().required().regex(dataFormatConstants.NAME_REGEX).error(errors => stringErrorHandler(errors, 'full_name')),
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => stringErrorHandler(errors, 'Email')),
    password: Joi.string().required().regex(dataFormatConstants.PASSWORD_REGEX).error(errors => stringErrorHandler(errors, 'Password')),
    user_type: Joi.string().required().valid('CLIENT', 'ADMIN', 'AGENT').error(errors => stringErrorHandler(errors, 'user_type')),
    

})

