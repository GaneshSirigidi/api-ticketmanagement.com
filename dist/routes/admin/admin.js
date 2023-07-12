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
router.post('/admin/signup', [
    validateRequest
], userController.signUp);
router.post('/admin/signin', [
    validateRequest
], userController.signIn);
router.post('/admin/agent', [
    authMiddleware.validateAccessTokenForAdmin,
    validateRequest
], userController.addAgent);
router.delete('/admin/agent/:id', [
    authMiddleware.validateAccessTokenForAdmin,
], userController.delete);
router.get('/admin/profile', [
    authMiddleware.validateAccessTokenForAdmin
], userController.getProfile);
router.patch('/admin/profile', [
    authMiddleware.validateAccessTokenForAdmin,
    validateRequest
], userController.updateProfile);
router.get('/admin/users', [
    authMiddleware.validateAccessTokenForAdmin
], userController.listUsersByUserType);
exports.default = router;
