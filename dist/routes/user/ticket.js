"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../../controllers/ticketController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const schemaValidators_1 = require("../../middlewares/validations/schemaValidators");
const customValidationMiddleware_1 = require("../../middlewares/customValidationMiddleware");
const customValidationMiddleware = new customValidationMiddleware_1.CustomValidationMiddleware();
const schemaValidator = new schemaValidators_1.SchemaValidator(true);
const validateRequest = schemaValidator.validate();
const ticketController = new ticketController_1.TicketController();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const router = (0, express_1.Router)();
router.post('/user/tickets', [
    validateRequest,
    authMiddleware.validateAccessToken
], ticketController.addTicket);
router.patch('/user/tickets/:id', [
    validateRequest,
    authMiddleware.validateAccessToken
], ticketController.updateTicket);
router.get('/user/tickets/:id', [
    authMiddleware.validateAccessToken
], ticketController.getOne);
router.get('/user/tickets', [
    authMiddleware.validateAccessToken,
    validateRequest,
    customValidationMiddleware.parseSkipAndLimitAndSortParams,
], ticketController.listTickets);
router.get('/user/tickets/:id/threads', [
    authMiddleware.validateAccessToken
], ticketController.getThreads);
exports.default = router;
