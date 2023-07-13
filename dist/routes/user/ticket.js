"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../../controllers/ticketController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const schemaValidators_1 = require("../../middlewares/validations/schemaValidators");
const schemaValidator = new schemaValidators_1.SchemaValidator(true);
const validateRequest = schemaValidator.validate();
const ticketController = new ticketController_1.TicketController();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const router = (0, express_1.Router)();
router.post('/user/tickets', [
    validateRequest,
    authMiddleware.validateAccessTokenForUser
], ticketController.addTicket);
router.get('/user/ticket', [
    authMiddleware.validateAccessTokenForUser
], ticketController.getOne);
router.get('/user/tickets', [
    authMiddleware.validateAccessTokenForUser
], ticketController.listUserTickets);
router.get('/user/tickets/:id/threads', [
    authMiddleware.validateAccessTokenForUser
], ticketController.getThreads);
exports.default = router;
