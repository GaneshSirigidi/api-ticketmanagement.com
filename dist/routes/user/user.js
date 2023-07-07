"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/userController");
const userController = new userController_1.UserController();
const router = (0, express_1.Router)();
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
exports.default = router;
