import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import Schemas from './schemas'

export class SchemaValidator {
    public useJoiError: boolean;
    private _supportedMethods = ["post", "put", "get", "delete", "patch"];
    private _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    constructor(useJoiError = false) {
        this.useJoiError = useJoiError;
    }

    private getSchema(
        route: string,
        method: string,
        allSchemas: object | any
    ): object | any {
        let _schema: object | any = allSchemas[route];

        if (_schema.multi) {
            _schema = _schema[method];
        }

        if (_schema && _schema.stripUnknown) {
            this._validationOptions.stripUnknown = _schema.stripUnknown;
        }

        return _schema;
    }

    validate() {
        return (req: Request, res: Response, next: NextFunction) => {
            const route: string = req.route.path;
            const method: string = req.method.toLowerCase();

            if (
                !this._supportedMethods.includes(method) ||
                !Schemas ||
                !(Schemas && Schemas[route])
            ) {
                return next();
            }

            const schema = this.getSchema(route, method, Schemas);

            let data: object | any = req.body;
            if (method === "get") {
                data = Object.assign({}, req.query, req.params);
            }

            if (method === "patch" || method === "delete" || method === "post" || method === "put") {
                data = Object.assign({}, req.body, req.params);
            }

            if (!schema) {
                return next();
            }

            const { error, value } = schema.validate(data, this._validationOptions);

            if (error) {
                const JoiError = {
                    success: false,
                    errors: {
                        original: error._object,
                        details: error.details.map(({ message, type, path, context }) => ({
                            key: path[0] || context.key,
                            message: message.replace(/['"]/g, ""),
                            type,
                            path: (path && path.join(".")) || context.key
                        }))
                    }
                };

                const CustomError = {
                    status: "failed",
                    error: "Invalid request data. Please review the request and try again."
                };

                return res
                    .status(422)
                    .json(this.useJoiError ? JoiError : CustomError);
            }

            if (method === "get") {
                req.query = value;
            } else {
                req.body = value;
            }

            return next();
        };
    }
}
