"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(status, message, errorCode, errors) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
        this.errors = errors;
    }
    setStatusCode(statusCode) {
        this.status = statusCode;
    }
    setErrorCode(errorCode) {
        this.errorCode = errorCode;
    }
    setMessage(message) {
        this.message = message;
    }
}
exports.CustomError = CustomError;
