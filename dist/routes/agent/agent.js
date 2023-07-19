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
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const schemaValidator = new schemaValidators_1.SchemaValidator(true);
const validateRequest = schemaValidator.validate();
const router = (0, express_1.Router)();
// router.post('/user/signup',
//   [
//     validateRequest
//   ], userController.signUp)
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
router.get('/agent/profile', [
    authMiddleware.validateAccessTokenForAgent
], userController.getProfile);
router.patch('agent/profile', [
    authMiddleware.validateAccessTokenForAgent,
    validateRequest,
], userController.updateProfile);
exports.default = router;
