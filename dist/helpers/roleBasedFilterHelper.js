"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userConstants_1 = require("../constants/userConstants");
const filterHelper_1 = __importDefault(require("./filterHelper"));
class RoleBasedFilterHelper {
    tickets(query, user) {
        if (user.user_type === userConstants_1.ADMIN) {
            query = filterHelper_1.default.tickets(query, user);
        }
        else if (user.user_type === userConstants_1.AGENT) {
            query.assigned_to = user.email;
        }
        else if (user.user_type === userConstants_1.USER) {
            query.email = user.email;
        }
        return query;
    }
}
exports.default = new RoleBasedFilterHelper();
