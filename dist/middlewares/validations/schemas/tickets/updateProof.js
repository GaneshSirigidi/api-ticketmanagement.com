"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProofSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelper_1 = require("../../../../helpers/joiHelper");
exports.updateProofSchema = joi_1.default.object().keys({
    file: joi_1.default.string().required().error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'file')),
});
