"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationMiddleware = void 0;
// data service provider
const userDataServiceProvider_1 = require("../services/userDataServiceProvider");
const userDataServiceProvider = new userDataServiceProvider_1.UserDataServiceProvider();
// import { CustomError } from "../interfaces/customError";
class CustomValidationMiddleware {
    parseSkipAndLimitAndSortParams(request, res, next) {
        let { page = 1, limit = 10 } = request.query;
        const { order_by: orderBy, order_type: orderType, get_all: getAll, } = request.query;
        let skip = 0;
        const sort = {};
        if (getAll) {
            limit = null;
            skip = null;
        }
        else if (page && limit) {
            skip = (page - 1) * limit;
        }
        if (orderBy) {
            sort[`${orderBy}`] = orderType === "desc" ? -1 : 1;
        }
        limit = parseInt(limit, 0);
        request.parsedFilterParams = {
            skip,
            limit,
            query: {},
            sort,
            projection: {},
        };
        return next();
    }
    checkEmailExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existedEmail = yield userDataServiceProvider.emailExists(req.body.email);
                if (existedEmail) {
                    return res.status(422).json({
                        success: false,
                        message: "Email Already Existed",
                        statusCode: 422
                    });
                }
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CustomValidationMiddleware = CustomValidationMiddleware;
