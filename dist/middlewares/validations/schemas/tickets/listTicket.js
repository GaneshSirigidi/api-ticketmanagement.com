"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTicketSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelper_1 = require("../../../../helpers/joiHelper");
exports.listTicketSchema = joi_1.default.object().keys({
    requester: joi_1.default.string().error(joiHelper_1.stringErrorHandler),
    email: joi_1.default.string().email({ tlds: { allow: false } }).error(joiHelper_1.stringErrorHandler),
    priority: joi_1.default.string().valid('HIGH', 'MEDIUM', 'LOW').error(joiHelper_1.stringErrorHandler),
    query_status: joi_1.default.string().valid('OPEN', 'CLOSE').error(joiHelper_1.stringErrorHandler),
    subject: joi_1.default.string().error(joiHelper_1.stringErrorHandler),
    requirement_brief: joi_1.default.string().error(joiHelper_1.stringErrorHandler),
});
