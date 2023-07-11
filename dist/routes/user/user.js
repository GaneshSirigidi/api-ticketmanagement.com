"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/userController");
const userController = new userController_1.UserController();
const schemaValidators_1 = require("../../middlewares/validations/schemaValidators");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const schemaValidator = new schemaValidators_1.SchemaValidator(true);
const validateRequest = schemaValidator.validate();
const router = (0, express_1.Router)();
router.post('/user/signup', [
    validateRequest
], userController.signUp);
router.post('/user/signin', [
    validateRequest
], userController.signIn);
router.get('/user/profile', [
    authMiddleware.validateAccessToken
], userController.getProfile);
router.patch('/user/profile', [
    authMiddleware.validateAccessToken,
    validateRequest,
], userController.updateProfile);
exports.default = router;
