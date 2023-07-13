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
// router.post('/admin/tickets',
//     [
//         validateRequest,
//         authMiddleware.validateAccessToken
//     ],
//     ticketController.addTicket)
router.get('/admin/tickets', [
    authMiddleware.validateAccessTokenForAdmin
], ticketController.listTickets);
router.get('/admin/ticket', [
    authMiddleware.validateAccessTokenForAdmin
], ticketController.getOne);
router.patch('/admin/tickets/:id/assigned-to', [
    authMiddleware.validateAccessTokenForAdmin
], ticketController.assignTicket);
router.post('/admin/tickets/:id/reply', [
    authMiddleware.validateAccessTokenForAdmin
], ticketController.replyTicket);
// router.get('/admin/tickets/:id/threads',
//     [
//         authMiddleware.validateAccessTokenForAdmin
//     ],
//     ticketController.getThreads
// )
exports.default = router;
