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
exports.AuthMiddleware = void 0;
const userDataServiceProvider_1 = require("../services/userDataServiceProvider");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userDataServiceProvider = new userDataServiceProvider_1.UserDataServiceProvider();
class AuthMiddleware {
    validateAccessTokenForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = req.headers.authorization;
                if (!accessToken) {
                    const respData = {
                        success: false,
                        message: "No Authorization Token",
                    };
                    return res.status(403).json(respData);
                }
                // Decode JWT received via Header
                const userDetails = jsonwebtoken_1.default.decode(accessToken);
                // Fetch User From DB
                const user = yield userDataServiceProvider.userById(userDetails.id);
                if (userDetails.user_type !== 'USER') {
                    const respData = {
                        success: false,
                        message: "Invalid user type",
                    };
                    return res.status(403).json(respData);
                }
                const tokenSecret = process.env.JWT_SECRET;
                try {
                    // Verify JWT
                    jsonwebtoken_1.default.verify(accessToken, tokenSecret);
                    // Add User to the Request Payload
                    req.user = user;
                    next();
                }
                catch (error) {
                    let respData = {
                        success: false,
                        message: error.message,
                        error: error,
                    };
                    return res.status(401).json(respData);
                }
            }
            catch (error) {
                let respData = {
                    success: false,
                    message: "Invalid Access Token",
                };
                return res.status(401).json(respData);
            }
        });
    }
    validateAccessTokenForAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = req.headers.authorization;
                if (!accessToken) {
                    const respData = {
                        success: false,
                        message: "No Authorization Token",
                    };
                    return res.status(403).json(respData);
                }
                // Decode JWT received via Header
                const userDetails = jsonwebtoken_1.default.decode(accessToken);
                // Fetch User From DB
                const user = yield userDataServiceProvider.userById(userDetails.id);
                if (userDetails.user_type !== 'ADMIN') {
                    const respData = {
                        success: false,
                        message: "Invalid user type",
                    };
                    return res.status(403).json(respData);
                }
                const tokenSecret = process.env.JWT_SECRET;
                try {
                    // Verify JWT
                    jsonwebtoken_1.default.verify(accessToken, tokenSecret);
                    // Add User to the Request Payload
                    req.user = user;
                    next();
                }
                catch (error) {
                    let respData = {
                        success: false,
                        message: error.message,
                        error: error,
                    };
                    return res.status(401).json(respData);
                }
            }
            catch (error) {
                let respData = {
                    success: false,
                    message: "Invalid Access Token",
                };
                return res.status(401).json(respData);
            }
        });
    }
    validateAccessTokenForAgent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = req.headers.authorization;
                if (!accessToken) {
                    const respData = {
                        success: false,
                        message: "No Authorization Token",
                    };
                    return res.status(403).json(respData);
                }
                // Decode JWT received via Header
                const userDetails = jsonwebtoken_1.default.decode(accessToken);
                // Fetch User From DB
                const user = yield userDataServiceProvider.userById(userDetails.id);
                if (userDetails.user_type !== 'AGENT') {
                    const respData = {
                        success: false,
                        message: "Invalid user type",
                    };
                    return res.status(403).json(respData);
                }
                const tokenSecret = process.env.JWT_SECRET;
                try {
                    // Verify JWT
                    jsonwebtoken_1.default.verify(accessToken, tokenSecret);
                    // Add User to the Request Payload
                    req.user = user;
                    next();
                }
                catch (error) {
                    let respData = {
                        success: false,
                        message: error.message,
                        error: error,
                    };
                    return res.status(401).json(respData);
                }
            }
            catch (error) {
                let respData = {
                    success: false,
                    message: "Invalid Access Token",
                };
                return res.status(401).json(respData);
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
