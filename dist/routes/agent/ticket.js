"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../../controllers/ticketController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const customValidationMiddleware_1 = require("../../middlewares/customValidationMiddleware");
const schemaValidators_1 = require("../../middlewares/validations/schemaValidators");
const schemaValidator = new schemaValidators_1.SchemaValidator(true);
const validateRequest = schemaValidator.validate();
const customValidationMiddleware = new customValidationMiddleware_1.CustomValidationMiddleware();
const ticketController = new ticketController_1.TicketController();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const router = (0, express_1.Router)();
// router.post('/agent/tickets',
//     [
//         validateRequest,
//         authMiddleware.validateAccessToken
//     ],
//     ticketController.addTicket
// )
router.get('/agent/tickets/:id', [
    authMiddleware.validateAccessTokenForAgent
], ticketController.getOne);
router.get('/agent/tickets', [
    authMiddleware.validateAccessTokenForAgent,
    validateRequest,
    customValidationMiddleware.parseSkipAndLimitAndSortParams,
], ticketController.listTickets);
router.post('/agent/tickets/:id/reply', [
    validateRequest,
    authMiddleware.validateAccessTokenForAgent,
], ticketController.replyTicket);
router.post('/agent/ticket/:id/download', [
    authMiddleware.validateAccessTokenForAgent,
    validateRequest
], ticketController.downloadProof);
router.post('/agent/tickets/:id/reply-proof', [
    authMiddleware.validateAccessTokenForAgent,
    validateRequest,
], ticketController.replyTicketWithImage);
router.post('/agent/tickets/:id/main-reply', [
    authMiddleware.validateAccessTokenForAgent,
    validateRequest,
], ticketController.mainReply);
exports.default = router;
