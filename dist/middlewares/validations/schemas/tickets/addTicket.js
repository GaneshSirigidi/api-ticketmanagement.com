"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTicketSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelper_1 = require("../../../../helpers/joiHelper");
exports.addTicketSchema = joi_1.default.object().keys({
    author: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'author')),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'email')),
    priority: joi_1.default.string().valid('HIGH', 'MEDIUM', 'LOW').required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'priority')),
    company_name: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'company_name')),
    query_status: joi_1.default.string().valid('OPEN', 'CLOSE').required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'query_status')),
    subject: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'subject')),
});
