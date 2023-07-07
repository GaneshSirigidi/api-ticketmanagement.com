"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../../controllers/ticketController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const ticketController = new ticketController_1.TicketController();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const router = (0, express_1.Router)();
router.post('/ticket/add', [
    authMiddleware.validateAccessToken
], ticketController.addTicket);
router.get('/ticket/tickets', [
    authMiddleware.validateAccessToken
], ticketController.listTickets);
router.post('/ticket/reply/:id', [
    authMiddleware.validateAccessToken
], ticketController.replyTicket);
exports.default = router;
