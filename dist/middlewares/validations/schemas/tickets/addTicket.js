"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicketSchema = exports.addTicketSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelper_1 = require("../../../../helpers/joiHelper");
exports.addTicketSchema = joi_1.default.object().keys({
    requester: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Requester')),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Email')),
    priority: joi_1.default.string().valid('HIGH', 'MEDIUM', 'LOW').required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Priority')),
    query_status: joi_1.default.string().valid('OPEN', 'CLOSE').error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Query status')),
    subject: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Subject')),
    requirement_brief: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Requirement Brief')),
    file: joi_1.default.string().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Requirement Brief')),
    proofs: joi_1.default.string().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'proof'))
});
exports.updateTicketSchema = joi_1.default.object().keys({
    id: joi_1.default.string(),
    requester: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Requester')),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Email')),
    priority: joi_1.default.string().valid('HIGH', 'MEDIUM', 'LOW').required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Priority')),
    subject: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Subject')),
    requirement_brief: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Requirement Brief')),
});
