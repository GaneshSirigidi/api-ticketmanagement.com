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
const threadsDataServiceProvider_1 = require("../services/threadsDataServiceProvider");
const roleBasedFilterHelper_1 = __importDefault(require("../helpers/roleBasedFilterHelper"));
const filterHelper_1 = __importDefault(require("../helpers/filterHelper"));
const emailServiceProvider_1 = __importDefault(require("../services/notifications/emailServiceProvider"));
const emailHelper_1 = require("../helpers/emailHelper");
const threadsDataServiceProvider = new threadsDataServiceProvider_1.ThreadsDataServiceProvider();
const userDataServiceProvider = new userDataServiceProvider_1.UserDataServiceProvider();
const ticketDataServiceProvider = new ticketDataServiceProvider_1.TicketDataServiceProvider();
class TicketController {
    addTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketData = req.body;
                const ticketId = yield (0, stringGen_1.stringGen)();
                ticketData.ticket_id = ticketId;
                const responseData = yield ticketDataServiceProvider.saveTicket(ticketData);
                //send email to admin 
                const { emailData, emailContent } = (0, emailHelper_1.prepareTicketdetailsData)(responseData);
                yield emailServiceProvider_1.default.sendTicketDetailsEmail(emailData, emailContent);
                //send email to user
                yield emailServiceProvider_1.default.sendTicketDetailsEmailToUser(emailData, emailContent);
                return res.status(200).json({
                    success: true,
                    message: "Ticket Created successfully",
                    data: responseData,
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
                const { skip, limit, sort } = req.parsedFilterParams || {};
                let { query = {} } = req.parsedFilterParams || {};
                query = filterHelper_1.default.tickets(query, req.query);
                query = roleBasedFilterHelper_1.default.tickets(query, req.user);
                const [tickets, count] = yield Promise.all([
                    ticketDataServiceProvider.getAll({
                        query, skip, limit, sort
                    }),
                    ticketDataServiceProvider.countAll({ query })
                ]);
                if (!tickets.length) {
                    return res.status(400).json({
                        success: false,
                        message: "No tickets found",
                        data: [],
                    });
                }
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
    updateTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                yield ticketDataServiceProvider.updateTicket(ticketId, req.body);
                return res.status(200).json({
                    success: true,
                    message: "Ticket Updated successfully"
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                if (!ticketId.length) {
                    return res.status(400).json({
                        success: false,
                        message: "Ticket not found",
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
                const agent = req.body;
                const emailExists = yield userDataServiceProvider.emailExists(agent.assigned_to);
                if (!emailExists) {
                    return res.status(400).json({
                        success: false,
                        message: "Agent not found",
                        data: [],
                    });
                }
                const id = req.params.id;
                const ticektDetails = yield ticketDataServiceProvider.ticketExists(id);
                if (!ticektDetails) {
                    return res.status(400).json({
                        success: false,
                        message: "Ticket not found",
                        data: [],
                    });
                }
                yield ticketDataServiceProvider.assignTicketById(id, agent);
                const { emailData, emailContent } = (0, emailHelper_1.prepareAssignTicketdetailsData)(ticektDetails, agent);
                yield emailServiceProvider_1.default.sendTicketDetailsToAgentEmail(emailData, emailContent);
                return res.status(200).json({
                    success: true,
                    message: `Ticket assigned to ${agent.assigned_to}`,
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
    replyTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqData = req.body;
                const ticketId = req.params.id;
                const ticket = yield ticketDataServiceProvider.getTicketById(ticketId);
                if (!ticket) {
                    return res.status(400).json({
                        success: false,
                        message: "Ticket not found",
                    });
                }
                const replyData = {
                    reporter_by: req.user.full_name,
                    ticket_id: ticketId,
                    reporter_type: req.user.user_type,
                    message: reqData.message,
                    ticket_status: reqData.ticket_status
                };
                const threadData = yield threadsDataServiceProvider.replyTicket(replyData);
                //  await ticketDataServiceProvider.updateTicketStatus(ticket, reqData.ticket_status)
                return res.status(200).json({
                    success: true,
                    message: "Reply posted successfully",
                    data: threadData,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getThreads(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const ticketData = yield ticketDataServiceProvider.getTicketById(ticketId);
                const { skip, limit, sort } = req.params;
                const query = {
                    ticket_id: { $eq: ticketId }
                };
                const [threadsData, count] = yield Promise.all([
                    threadsDataServiceProvider.getAll({
                        query, skip, limit, sort
                    }),
                    threadsDataServiceProvider.countAll({
                        query
                    })
                ]);
                const response = paginationHelper_1.default.getPaginationResponse({
                    page: req.query.page || 1,
                    count,
                    limit,
                    skip,
                    data: [ticketData, threadsData],
                    message: "Threads fetched successfully",
                    searchString: req.query.search_string,
                });
                return res.status(200).json(response);
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message || "Something went wrong"
                });
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                if (!ticketId.length) {
                    return res.status(400).json({
                        success: false,
                        message: "Ticket not found",
                        data: [],
                    });
                }
                const deleteData = yield ticketDataServiceProvider.delete(ticketId, req.body);
                return res.status(200).json({
                    success: true,
                    message: "Ticket deleted successfully",
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    updateStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const ticketStatus = req.body;
                const responseData = yield ticketDataServiceProvider.updateTicketStatus(ticketId, ticketStatus);
                return res.status(200).json({
                    success: true,
                    message: "Ticket status updated successfully",
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    //TODO
    ticketsStatistics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalTickets = yield ticketDataServiceProvider.countAll({});
                return totalTickets;
            }
            catch (error) {
            }
        });
    }
}
exports.TicketController = TicketController;
