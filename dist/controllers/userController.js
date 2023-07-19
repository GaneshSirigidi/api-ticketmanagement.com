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
exports.UserController = void 0;
const userDataServiceProvider_1 = require("../services/userDataServiceProvider");
const authHelper_1 = require("../helpers/authHelper");
const paginationHelper_1 = __importDefault(require("../helpers/paginationHelper"));
const ticketDataServiceProvider_1 = require("../services/ticketDataServiceProvider");
const s3DataServiceProvider_1 = require("../services/s3DataServiceProvider");
const uuid_1 = require("uuid");
const emailServiceProvider_1 = __importDefault(require("../services/notifications/emailServiceProvider"));
const emailHelper_1 = require("../helpers/emailHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDataServiceProvider = new userDataServiceProvider_1.UserDataServiceProvider();
const ticketDataServiceProvider = new ticketDataServiceProvider_1.TicketDataServiceProvider();
const s3DataServiceProvider = new s3DataServiceProvider_1.S3DataServiceProvider();
class UserController {
    signUp(req, res, next) {
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
                return next(err);
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const returnUserData = JSON.parse(JSON.stringify(req.user));
                ;
                delete returnUserData.password;
                const { token, refreshToken } = yield (0, authHelper_1.getUserAuthTokens)(req.user);
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
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userDetails = yield userDataServiceProvider.userById(req.user._id);
                const profile = {
                    full_name: userDetails.full_name,
                    email: userDetails.email,
                    phone_number: userDetails.phone_number,
                    user_type: userDetails.user_type
                };
                return res.status(200).json({
                    success: true,
                    message: " Profile fetched successfully",
                    data: profile,
                });
            }
            catch (error) {
                let respData = {
                    success: false,
                    message: error.message,
                };
                return res.status(error.statusCode || 500).json(respData);
            }
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let profile = req.body;
                yield userDataServiceProvider.updateUserById(req.user._id, profile);
                return res.status(200).json({
                    success: true,
                    message: "Profile updated successfully",
                });
            }
            catch (error) {
                let respData = {
                    success: false,
                    message: error.message,
                };
                return res.status(error.statusCode || 500).json(respData);
            }
        });
    }
    addAgent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqData = req.body;
                const existedEmail = yield userDataServiceProvider.emailExists(reqData.email);
                if (existedEmail) {
                    return res.status(422).json({
                        success: false,
                        message: "Email Alread Exists"
                    });
                }
                const agentData = yield userDataServiceProvider.saveAgent(reqData);
                return res.status(200).json({
                    success: true,
                    message: "Agent added successfully",
                    data: agentData,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                yield userDataServiceProvider.delete(userId);
                return res.status(200).json({
                    success: true,
                    message: "User deleted successfully",
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    listUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { skip, limit, sort } = req.parsedFilterParams || {};
                const query = {
                    user_type: { $eq: 'USER' },
                    status: { $ne: 'INACTIVE' }
                };
                const [users, count] = yield Promise.all([
                    userDataServiceProvider.getAll({
                        query, skip, limit, sort
                    }),
                    userDataServiceProvider.countAll({
                        query
                    })
                ]);
                const response = paginationHelper_1.default.getPaginationResponse({
                    page: req.query.page || 1,
                    count,
                    limit,
                    skip,
                    data: users,
                    message: "Users fetched successfully",
                    searchString: req.query.search_string,
                });
                return res.status(200).json(response);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    listAgents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { skip, limit, sort } = req.parsedFilterParams || {};
                const query = {
                    user_type: { $eq: 'AGENT' }
                };
                const [users, count] = yield Promise.all([
                    userDataServiceProvider.getAll({
                        query, skip, limit, sort
                    }),
                    userDataServiceProvider.countAll({
                        query
                    })
                ]);
                const response = paginationHelper_1.default.getPaginationResponse({
                    page: req.query.page || 1,
                    count,
                    limit,
                    skip,
                    data: users,
                    message: "Users fetched successfully",
                    searchString: req.query.search_string,
                });
                return res.status(200).json(response);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    updateUserStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield userDataServiceProvider.updateUserById(id, req.body);
                return res.status(200).json({
                    success: true,
                    message: "User Status Updated Successfully"
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getSignedUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileName = `${req.user._id}_${(0, uuid_1.v4)()}_${req.body.file}`;
                if (!fileName) {
                    return res.status(400).json({ message: "No file provided" });
                }
                const proof = yield ticketDataServiceProvider.saveProof(req.params.id, fileName);
                const filePath = "Ticket-Proofs";
                const uploadUrl = yield s3DataServiceProvider.getPreSignedUrl(fileName, 'put', filePath);
                let data = {
                    "upload_url": uploadUrl,
                };
                return res.status(200).json({
                    success: true,
                    message: "Successfully generated pre-signed url",
                    data,
                    proof
                });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const user = yield userDataServiceProvider.userByEmail(email);
                if (user) {
                    const token = jsonwebtoken_1.default.sign({ user_id: user._id, email: user.email }, process.env.JWT_SECRET, {
                        expiresIn: process.env.EXPIRES_IN
                    });
                    const { emailData, emailContent } = (0, emailHelper_1.prepareForgotPasswordEmailData)(email, token);
                    yield emailServiceProvider_1.default.sendForgotPasswordDetailsEmail(emailData, emailContent);
                    return res.status(200).json({
                        success: true,
                        message: `email sent successfully`,
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: "user not found",
                });
            }
            catch (err) {
                let respData = {
                    success: false,
                    message: err.message,
                };
                return res.status(err.statusCode || 500).json(respData);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = req.body.token;
                let verify = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                let user = yield userDataServiceProvider.userByEmail(verify.email);
                if (user) {
                    const hasedpassword = yield bcrypt_1.default.hash(req.body.password, 12);
                    user.password = hasedpassword;
                    yield user.save();
                    return res.status(200).json({
                        success: true,
                        message: "password reset successfully",
                    });
                }
                else {
                    return res.status(401).json({
                        success: true,
                        message: "password reset failed",
                    });
                }
            }
            catch (err) {
                let respData = {
                    success: false,
                    message: err.message,
                };
                return res.status(err.statusCode || 500).json(respData);
            }
        });
    }
}
exports.UserController = UserController;
