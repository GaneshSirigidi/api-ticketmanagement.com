"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentSignUpSchema = exports.updateProfileSchema = exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelper_1 = require("../../../../helpers/joiHelper");
const dataFormatConstants_1 = __importDefault(require("../../../../constants/dataFormatConstants"));
exports.signUpSchema = joi_1.default.object().keys({
    full_name: joi_1.default.string().required().regex(dataFormatConstants_1.default.NAME_REGEX).error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Full Name')),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Email')),
    status: joi_1.default.string().valid('ACTIVE', 'INACTIVE').error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'status')),
    password: joi_1.default.string().required().regex(dataFormatConstants_1.default.PASSWORD_REGEX).error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Password')),
    user_type: joi_1.default.string().valid('USER', 'ADMIN', 'AGENT').error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'user_type')),
    phone_number: joi_1.default.string().regex(/^(\+91)?[6789]{1}\d{9}$/).required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, "Phone Number"))
});
exports.updateProfileSchema = joi_1.default.object().keys({
    full_name: joi_1.default.string().required().regex(dataFormatConstants_1.default.NAME_REGEX).error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'full_name')),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Email')),
    phone_number: joi_1.default.string().regex(/^(\+91)?[6789]{1}\d{9}$/).required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, "Phone Number"))
});
exports.agentSignUpSchema = joi_1.default.object().keys({
    full_name: joi_1.default.string().required().regex(dataFormatConstants_1.default.NAME_REGEX).error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'full_name')),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Email')),
    password: joi_1.default.string().required().regex(dataFormatConstants_1.default.PASSWORD_REGEX).error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Password')),
    user_type: joi_1.default.string().required().valid('USER', 'ADMIN', 'AGENT').error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'user_type')),
    phone_number: joi_1.default.string().regex(/^(\+91)?[6789]{1}\d{9}$/).required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, "Phone Number"))
});
