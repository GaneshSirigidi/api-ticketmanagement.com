"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayErrorHandler = exports.numberErrorHandler = exports.stringErrorHandler = void 0;
const stringErrorHandler = (errors, label, message, refKey) => {
    errors.forEach((err) => {
        console.log("err.code", err.code);
        switch (err.code) {
            case 'string.empty':
                err.message = `${label} is Required!`;
                break;
            case 'any.required':
                err.message = `${label} is Required!`;
                break;
            case 'any.only':
                err.message = `${label} must be one of [${err.local.valids}]`;
                break;
            case 'string.base':
                err.message = `Invalid ${label}`;
                break;
            case 'string.email':
                err.message = `Invalid ${label}`;
                break;
            case 'string.pattern.base':
                err.message = `Invalid ${label}`;
                break;
            case 'string.domain':
                err.message = `${label} must contain a valid domain name`;
                break;
            case 'string.min':
                err.message = `${label} length must be at least ${err.context.limit} characters long`;
                break;
            case 'string.max':
                err.message = `${label} length should be less than or equal to ${err.context.limit}`;
                break;
            case 'string.uri':
                err.message = `${label} must be a valid url`;
                break;
            case 'string.regex.base':
                err.message = `Invalid ${label}`;
                err.type = 'string.InvalidFormat';
                break;
            case 'date.isoDate':
                err.message = `Invalid date format of ${label}`;
                break;
            case 'any.allowOnly':
                err.message = `${label} is not valid`;
                break;
            case 'any.invalid':
                err.message = `${label} is not valid`;
                if (message) {
                    err.message = message;
                }
                if (err.path == 'new_password' && refKey == 'current_password') {
                    err.message = 'New Password and Current Password should not same';
                }
                break;
            default:
                break;
        }
    });
    return errors;
};
exports.stringErrorHandler = stringErrorHandler;
const numberErrorHandler = (errors, label) => {
    errors.forEach((err) => {
        switch (err.code) {
            case 'string.empty':
                err.message = `${label} is Required!`;
                break;
            case 'any.required':
                err.message = `${label} is Required!`;
                break;
            case 'number.base':
                err.message = `${label} should be a valid Number.`;
                break;
            case 'number.integer':
                err.message = `${label} should be a valid Integer.`;
                break;
            case 'number.infinity':
                err.message = `.${label} should be a finite Number.`;
                break;
            case 'number.greater':
                err.message = `${label} should be greater than ${err.context.limit}`;
                break;
            case 'number.less':
                err.message = `${label} should be less than ${err.context.limit}`;
                break;
            case 'number.max':
                err.message = `${label} should be less than or equal to ${err.context.limit}`;
                break;
            case 'number.min':
                err.message = `${label} should be greater than or equal to ${err.context.limit}`;
                break;
            case 'number.multiple':
                err.message = `${label} should be multiple of ${err.context.multiple}`;
                break;
            case 'number.precision':
                err.message = `${label} should have ${err.context.limit} precision.`;
                break;
            case 'number.negative':
                err.message = `${label} should be a Negative Number.`;
                break;
            case 'number.positive':
                err.message = `${label} should be a Positive Number.`;
                break;
            case 'number.port':
                err.message = `${err.path} should be a port number.`;
                break;
            case 'number.unsafe':
                err.message = `${label} is not within the safe range of JavaScript numbers.`;
                break;
            default:
                break;
        }
    });
    return errors;
};
exports.numberErrorHandler = numberErrorHandler;
const arrayErrorHandler = (errors, label, required = false) => {
    errors.forEach((err) => {
        switch (err.code) {
            case 'any.empty':
                err.message = `${label}  are Required!`;
                break;
            case 'any.required':
                err.message = `${label} are Required!`;
                break;
            case 'any.only':
                err.message = `${label} must be one of [${err.local.valids}]`;
                break;
            case 'array.min':
                if (required) {
                    err.message = `${label} is Required!`;
                }
                else {
                    err.message = `${label} are not Empty!`;
                }
                break;
            case 'string.regex.base':
                err.message = `Invalid ${label}`;
                err.type = 'string.InvalidFormat';
                break;
            default:
                err.message = `Invalid  ${label}!`;
                break;
        }
    });
    return errors;
};
exports.arrayErrorHandler = arrayErrorHandler;
