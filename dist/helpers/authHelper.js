"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAuthTokens = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserAuthTokens = function (userData) {
    let user = {
        'id': userData._id,
        'email': userData.email,
        'user_type': userData.user_type,
    };
    let tokenSecret;
    let refreshTokenSecret;
    tokenSecret = process.env.JWT_SECRET + userData.password;
    refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET + userData.password;
    const token = jsonwebtoken_1.default.sign(user, tokenSecret, {
        expiresIn: 604800
    });
    const refreshToken = jsonwebtoken_1.default.sign(user, refreshTokenSecret, {
        expiresIn: 604800
    });
    return {
        token,
        refreshToken
    };
};
exports.getUserAuthTokens = getUserAuthTokens;
