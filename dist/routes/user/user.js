"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/userController");
const userController = new userController_1.UserController();
const schemaValidators_1 = require("../../middlewares/validations/schemaValidators");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const passportMiddleware_1 = __importDefault(require("../../middlewares/passportMiddleware"));
const customValidationMiddleware_1 = require("../../middlewares/customValidationMiddleware");
const customValidationMiddleware = new customValidationMiddleware_1.CustomValidationMiddleware();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const schemaValidator = new schemaValidators_1.SchemaValidator(true);
const validateRequest = schemaValidator.validate();
const router = (0, express_1.Router)();
router.post('/user/signup', [
    validateRequest,
    customValidationMiddleware.checkEmailExists
], userController.signUp);
router.post('/signin', passportMiddleware_1.default.authenticate('signin', {
    session: false,
    failWithError: true,
}), [
    validateRequest
], userController.signIn, (err, req, res, next) => {
    const respData = {
        success: false,
        message: 'Invalid Credentials!',
    };
    return res.status(err.status).json(respData);
});
router.get('/profile', [
    authMiddleware.validateAccessTokenForUser
], userController.getProfile);
router.patch('/user/profile', [
    authMiddleware.validateAccessTokenForUser,
    validateRequest,
], userController.updateProfile);
router.post('/user/forgot-password', [
    validateRequest,
], userController.forgotPassword);
router.patch('/user/reset-password', [
    validateRequest,
], userController.resetPassword);
router.post('/user/pre-signed-url', [
    authMiddleware.validateAccessTokenForUser,
    validateRequest
], userController.getSignedUrl);
exports.default = router;
