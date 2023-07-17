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
    updateTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield ticketDataServiceProvider.updateTicket(id, req.body);
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
    listTickets(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.query.email;
                const queryStatus = req.query.query_status;
                const { skip, limit, sort } = req.parsedFilterParams || {};
                const { query = {} } = req.parsedFilterParams || {};
                if (email && email.length) {
                    query.email = { $eq: email };
                }
                if (queryStatus) {
                    query['query_status'] = { $eq: queryStatus };
                }
                const searchQuery = req.query.ticket_id;
                if (searchQuery && searchQuery.length) {
                    query.$or =
                        [
                            { ticket_id: { $regex: searchQuery, $options: "i" } },
                        ];
                }
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
    listUserTickets(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryStatus = req.query.query_status;
                const email = req.user.email;
                const { skip, limit, sort } = req.parsedFilterParams;
                const { query = {} } = req.parsedFilterParams;
                if (email && email.length) {
                    query['email'] = { $eq: email };
                }
                if (queryStatus && queryStatus.length) {
                    query['query_status'] = { $eq: queryStatus };
                }
                const searchQuery = req.query.ticket_id;
                if (searchQuery && searchQuery.length) {
                    query.$or =
                        [
                            { ticket_id: { $regex: searchQuery, $options: "i" } },
                        ];
                }
                const [tickets, count] = yield Promise.all([
                    ticketDataServiceProvider.getAllUserTickets({
                        query, skip, limit, sort
                    }),
                    ticketDataServiceProvider.countAll({
                        query
                    })
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
                    searchString: searchQuery,
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
                const id = req.params.id;
                if (!id) {
                    return res.status(400).json({
                        success: false,
                        message: "No ticket Id",
                        data: [],
                    });
                }
                const ticketData = yield ticketDataServiceProvider.getOne(id);
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
                const id = req.params.id;
                const ticektExists = yield ticketDataServiceProvider.ticketExists(id);
                if (!ticektExists) {
                    return res.status(400).json({
                        success: false,
                        message: "Ticket not found",
                        data: [],
                    });
                }
                yield ticketDataServiceProvider.assignTicketById(id, assignData);
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
    listAgentTickets(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.user.email;
                const { skip, limit, sort } = req.parsedFilterParams || {};
                const query = {
                    assigned_to: { $eq: email }
                };
                const [users, count] = yield Promise.all([
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
                    data: users,
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
    replyTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqData = req.body;
                const ticketId = req.params.id;
                const ticket = yield ticketDataServiceProvider.getTicketByTicketId(ticketId);
                if (!ticket) {
                    return res.status(400).json({
                        success: false,
                        message: "Ticket not found",
                    });
                }
                const replyData = {
                    reporter_by: req.user.full_name,
                    ticket_id: ticket.ticket_id,
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
                const ticketData = yield ticketDataServiceProvider.getTicketByTicketId(ticketId);
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
}
exports.TicketController = TicketController;
