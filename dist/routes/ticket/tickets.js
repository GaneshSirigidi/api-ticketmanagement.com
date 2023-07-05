"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../../controllers/ticketController");
const ticketController = new ticketController_1.TicketController();
const router = (0, express_1.Router)();
router.post('/ticket/add', ticketController.addTicket);
router.get('/ticket/tickets', ticketController.listTickets);
exports.default = router;
