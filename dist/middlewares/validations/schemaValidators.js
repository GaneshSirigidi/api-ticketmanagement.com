"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaValidator = void 0;
const schemas_1 = __importDefault(require("./schemas"));
class SchemaValidator {
    constructor(useJoiError = false) {
        this._supportedMethods = ["post", "put", "get", "delete", "patch"];
        this._validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };
        this.useJoiError = useJoiError;
    }
    getSchema(route, method, allSchemas) {
        let _schema = allSchemas[route];
        if (_schema.multi) {
            _schema = _schema[method];
        }
        if (_schema && _schema.stripUnknown) {
            this._validationOptions.stripUnknown = _schema.stripUnknown;
        }
        return _schema;
    }
    validate() {
        return (req, res, next) => {
            const route = req.route.path;
            const method = req.method.toLowerCase();
            if (!this._supportedMethods.includes(method) ||
                !schemas_1.default ||
                !(schemas_1.default && schemas_1.default[route])) {
                return next();
            }
            const schema = this.getSchema(route, method, schemas_1.default);
            let data = req.body;
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
            }
            else {
                req.body = value;
            }
            return next();
        };
    }
}
exports.SchemaValidator = SchemaValidator;
