"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelper_1 = require("../../../../helpers/joiHelper");
const listSchema = {
    page: joi_1.default.number().min(1).error(joiHelper_1.numberErrorHandler),
    limit: joi_1.default.number().min(1).max(100).error(joiHelper_1.numberErrorHandler),
    order_by: joi_1.default.string().valid('created_at', 'updated_at', '_id').error(joiHelper_1.stringErrorHandler).default('updated_at'),
    order_type: joi_1.default.string().valid('asc', 'desc').error(joiHelper_1.stringErrorHandler).default('desc'),
    query_status: joi_1.default.string().valid('CLOSE', 'OPEN').error(errors => (0, joiHelper_1.stringErrorHandler)(errors, 'query_status')),
    search_string: joi_1.default.string(),
};
exports.listUsersSchema = joi_1.default.object().keys(Object.assign({}, listSchema));
