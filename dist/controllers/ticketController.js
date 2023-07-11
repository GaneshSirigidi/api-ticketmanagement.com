"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const ticketDataServiceProvider_1 = require("../services/ticketDataServiceProvider");
const paginationHelper_1 = __importDefault(require("../helpers/paginationHelper"));
const stringGen_1 = require("../helpers/stringGen");
const userDataServiceProvider_1 = require("../services/userDataServiceProvider");
const userDataServiceProvider = new userDataServiceProvider_1.UserDataServiceProvider();
const ticketDataServiceProvider = new ticketDataServiceProvider_1.TicketDataServiceProvider();
class TicketController {
    addTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketData = req.body;
                const ticketId = yield (0, stringGen_1.stringGen)();
                ticketData.ticket_id = ticketId;
                const queryData = yield ticketDataServiceProvider.saveTicket(ticketData);
                return res.status(200).json({
                    success: true,
                    message: "Ticket Created successfully",
                    data: queryData,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    listTickets(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.query.email;
                const { skip, limit, sort } = req.params;
                const query = {
                    email: { $eq: email }
                };
                const [tickets, count] = yield Promise.all([
                    ticketDataServiceProvider.getAll({
                        query, skip, limit, sort
                    }),
                    ticketDataServiceProvider.countAll({
                        query
                    })
                ]);
                const response = paginationHelper_1.default.getPaginationResponse({
                    page: req.query.page || 1,
                    count,
                    limit,
                    skip,
                    data: tickets,
                    message: "Tickets fetched successfully",
                    searchString: req.query.search_string,
                });
                return res.status(200).json(response);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.query.ticket_id;
                if (!ticketId) {
                    return res.status(400).json({
                        success: false,
                        message: "No ticket Id",
                        data: [],
                    });
                }
                const ticketData = yield ticketDataServiceProvider.getOne(ticketId);
                if (ticketData === null) {
                    return res.status(400).json({
                        success: false,
                        message: "Ticket details not found",
                        data: [],
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Ticket details fetched successfully",
                    data: ticketData,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    assignTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignData = req.body;
                const emailExists = yield userDataServiceProvider.emailExists(assignData.assigned_to);
                if (!emailExists) {
                    return res.status(400).json({
                        success: false,
                        message: "Agent not found",
                        data: [],
                    });
                }
                const ticketId = req.params.id;
                const ticektExists = yield ticketDataServiceProvider.ticketExists(ticketId);
                if (!ticektExists) {
                    return res.status(400).json({
                        success: false,
                        message: "Ticket not found",
                        data: [],
                    });
                }
                yield ticketDataServiceProvider.assignTicketById(ticketId, assignData);
                return res.status(200).json({
                    success: true,
                    message: `Ticket assigned to ${assignData.assigned_to}`,
                });
            }
            catch (error) {
                let respData = {
                    success: false,
                    message: error.message,
                };
                return res.status(error.statusCode || 500).json(respData);
            }
        });
    }
    replyTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const ticket = yield ticketDataServiceProvider.getTicketById(id);
                if (!ticket) {
                    return res.status(400).json({
                        success: false,
                        message: "Ticket not found",
                    });
                }
                const replyData = {
                    reporter_by: req.user.name,
                    request_id: req.body.request_id,
                    reporter_type: req.user.user_type,
                    message: req.body.message
                };
                const updatedTicket = yield ticketDataServiceProvider.replyTickets(replyData);
                return res.status(200).json({
                    success: true,
                    message: "Reply posted successfully",
                    data: updatedTicket,
                });
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong",
                });
            }
        });
    }
    getThreads(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                const { skip, limit, sort } = req.params;
                const query = {
                    email: { $eq: id }
                };
                const [tickets, count] = yield Promise.all([
                    ticketDataServiceProvider.getThreads({
                        query, skip, limit, sort
                    }),
                    ticketDataServiceProvider.countAll({
                        query
                    })
                ]);
                const response = paginationHelper_1.default.getPaginationResponse({
                    page: req.query.page || 1,
                    count,
                    limit,
                    skip,
                    data: tickets,
                    message: "Tickets fetched successfully",
                    searchString: req.query.search_string,
                });
                return res.status(200).json(response);
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong"
                });
            }
        });
    }
}
exports.TicketController = TicketController;
