import Joi from "joi";
import { stringErrorHandler } from "../../../../helpers/joiHelper";

export const updateProofSchema = Joi.object().keys({
    file: Joi.string().required().error(errors => stringErrorHandler(errors, 'file')),

})