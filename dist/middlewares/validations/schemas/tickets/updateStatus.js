"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicketStatusSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelper_1 = require("../../../../helpers/joiHelper");
exports.updateTicketStatusSchema = joi_1.default.object().keys({
    // id:Joi.string(),
    query_status: joi_1.default.string().valid('OPEN', 'CLOSE').required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'QueryStatus')),
});
