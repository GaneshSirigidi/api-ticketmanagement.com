import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";
import dataFormatConstants from "../../../../constants/dataFormatConstants";

export const resetPasswordSchema = Joi.object().keys({
    token: Joi.string().required().error(errors => stringErrorHandler(errors, 'token')),
    password: Joi.string().required().regex(dataFormatConstants.PASSWORD_REGEX).error(errors => stringErrorHandler(errors, 'Password')),
})