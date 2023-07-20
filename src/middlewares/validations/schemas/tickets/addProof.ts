import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";

export const addProofSchema = Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => stringErrorHandler(errors, 'Email')),
    file: Joi.string().required().error(errors => stringErrorHandler(errors, 'file')),

})