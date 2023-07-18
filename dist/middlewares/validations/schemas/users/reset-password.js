"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelper_1 = require("../../../../helpers/joiHelper");
const dataFormatConstants_1 = __importDefault(require("../../../../constants/dataFormatConstants"));
exports.resetPasswordSchema = joi_1.default.object().keys({
    token: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'token')),
    password: joi_1.default.string().required().regex(dataFormatConstants_1.default.PASSWORD_REGEX).error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'Password')),
});
