"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const US_ZIP_REGEX = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
const ZIP_REGEX = /(^\d{5,6}$)|(^\d{5}-\d{4}$)/;
const US_PHONE_NUMBER_REGEX = /^\(?\d{3}\)?-? *\d{3}-? *-?\d{4}$/;
// const INDIA_PHONE_NUMBER_REGEX = /^[0123456789]\d{9,10}$/
const INDIA_PHONE_NUMBER_REGEX = /^$|^[6-9]{1}[0-9]{9}$/;
const CITY_REGEX = /^[a-zA-Z- ]*$/;
const NPI_REGEX = /^\d{10}$/;
const FAX_REGEX = /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/;
const NAME_REGEX = /^[A-Za-z\s\W]+$/;
const POSTAL_CODE = /^\d{6}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.default = {
    US_ZIP_REGEX,
    ZIP_REGEX,
    US_PHONE_NUMBER_REGEX,
    CITY_REGEX,
    NPI_REGEX,
    NAME_REGEX,
    FAX_REGEX,
    POSTAL_CODE,
    INDIA_PHONE_NUMBER_REGEX,
    PASSWORD_REGEX,
    EMAIL_REGEX
};
