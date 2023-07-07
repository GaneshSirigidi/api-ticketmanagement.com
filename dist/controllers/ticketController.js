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
const ticketDataServiceProvider = new ticketDataServiceProvider_1.TicketDataServiceProvider();
class TicketController {
    addTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketData = req.body;
                ticketData.threads = [];
                const queryData = yield ticketDataServiceProvider.saveTicket(ticketData);
                return res.status(200).json({
                    success: true,
                    message: "Token Created successfully",
                    data: queryData,
                });
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong"
                });
            }
        });
    }
    listTickets(req, res) {
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
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong"
                });
            }
        });
    }
    replyTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { message } = req.body;
                const user = req.user;
                const name = user.name;
                const ticket = yield ticketDataServiceProvider.getTicketById(id);
                if (!ticket) {
                    return res.status(400).json({
                        success: false,
                        message: "Ticket not found",
                    });
                }
                const thread = {
                    name,
                    message,
                    timestamp: new Date(),
                };
                ticket.threads.push(thread); // Add the new thread to the ticket
                const updatedTicket = yield ticketDataServiceProvider.saveTicket(ticket);
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
}
exports.TicketController = TicketController;
