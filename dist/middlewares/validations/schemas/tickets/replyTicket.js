"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyTicketSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelper_1 = require("../../../../helpers/joiHelper");
exports.replyTicketSchema = joi_1.default.object().keys({
    message: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Message')),
});
