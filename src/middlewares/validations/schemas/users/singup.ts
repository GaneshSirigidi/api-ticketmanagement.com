import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";
import dataFormatConstants from "../../../../constants/dataFormatConstants";

export const signUpSchema = Joi.object().keys({
    full_name: Joi.string().required().regex(dataFormatConstants.NAME_REGEX).error(errors => stringErrorHandler(errors, 'full_name')),
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => stringErrorHandler(errors, 'Email')),
    password: Joi.string().required().regex(dataFormatConstants.PASSWORD_REGEX).error(errors => stringErrorHandler(errors, 'Password')),
    user_type: Joi.string().valid('USER', 'ADMIN', 'AGENT').error(errors => stringErrorHandler(errors, 'user_type')),
    phone_number: Joi.string().regex(/^(\+91)?[6789]{1}\d{9}$/).required().error(errors => stringErrorHandler(errors, "Phone Number"))

})

export const updateProfileSchema = Joi.object().keys({
    full_name: Joi.string().required().regex(dataFormatConstants.NAME_REGEX).error(errors => stringErrorHandler(errors, 'full_name')),
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => stringErrorHandler(errors, 'Email')),
    phone_number: Joi.string().regex(/^(\+91)?[6789]{1}\d{9}$/).required().error(errors => stringErrorHandler(errors, "Phone Number"))
})

export const agentSignUpSchema = Joi.object().keys({
    full_name: Joi.string().required().regex(dataFormatConstants.NAME_REGEX).error(errors => stringErrorHandler(errors, 'full_name')),
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => stringErrorHandler(errors, 'Email')),
    password: Joi.string().required().regex(dataFormatConstants.PASSWORD_REGEX).error(errors => stringErrorHandler(errors, 'Password')),
    user_type: Joi.string().required().valid('USER', 'ADMIN', 'AGENT').error(errors => stringErrorHandler(errors, 'user_type')),
    phone_number: Joi.string().regex(/^(\+91)?[6789]{1}\d{9}$/).required().error(errors => stringErrorHandler(errors, "Phone Number"))

})

