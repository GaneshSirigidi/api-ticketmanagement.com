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
exports.UserController = void 0;
const userDataServiceProvider_1 = require("../services/userDataServiceProvider");
const authHelper_1 = require("../helpers/authHelper");
const userDataServiceProvider = new userDataServiceProvider_1.UserDataServiceProvider();
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signUpData = req.body;
                const userData = yield userDataServiceProvider.saveUser(signUpData);
                return res.status(200).json({
                    success: true,
                    message: "User Created successfully",
                    data: userData,
                });
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong"
                });
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const returnUserData = yield userDataServiceProvider.login(email, password);
                const { token, refreshToken } = yield (0, authHelper_1.getUserAuthTokens)(returnUserData);
                const respData = {
                    success: true,
                    user_details: returnUserData,
                    access_token: token,
                    refresh_token: refreshToken,
                    message: "User login success",
                };
                return res.status(200).json(respData);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.UserController = UserController;
