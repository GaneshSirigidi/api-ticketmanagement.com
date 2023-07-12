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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const userDataServiceProvider_1 = require("../services/userDataServiceProvider");
const userDataServiceProvider = new userDataServiceProvider_1.UserDataServiceProvider();
passport_1.default.use('signin', new passport_local_1.default({
    usernameField: 'email',
    passwordField: 'password',
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield userDataServiceProvider.signin(username, password);
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        done(error);
    }
})));
exports.default = passport_1.default;
