import { Request, Response, NextFunction, query } from "express";

// data service provider
import { UserDataServiceProvider } from "../services/userDataServiceProvider";


const userDataServiceProvider = new UserDataServiceProvider();

// import { CustomError } from "../interfaces/customError";

export class CustomValidationMiddleware {

  public parseSkipAndLimitAndSortParams(
    request: Request,
    res: Response,
    next: NextFunction
  ) {
    let { page = 1, limit = 10 } = request.query;
    const {
      order_by: orderBy,
      order_type: orderType,
      get_all: getAll,
    } = request.query;

    let skip = 0;
    const sort = {};

    if (getAll) {
      limit = null;
      skip = null;
    } else if (page && limit) {
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

  public async checkEmailExists(req: Request, res: Response, next: NextFunction) {

    try {
      const existedEmail = await userDataServiceProvider.emailExists(req.body.email);
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
  }


}
