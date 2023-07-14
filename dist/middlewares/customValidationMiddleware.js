"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationMiddleware = void 0;
// data service provider
// import { UserDataServiceProvider } from "../services/userDataServiceProvider";
// const userDataServiceProvider = new UserDataServiceProvider();
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
}
exports.CustomValidationMiddleware = CustomValidationMiddleware;
