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
const ticketService_1 = require("../services/ticketService");
const paginationHelper_1 = __importDefault(require("../helpers/paginationHelper"));
const ticketDataServiceProvider = new ticketService_1.TicketDataServiceProvider();
class TicketController {
    addTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketData = req.body;
                const queryData = yield ticketDataServiceProvider.saveTicket(ticketData);
                return res.status(200).json({
                    success: true,
                    message: "Token Created successfully",
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
}
exports.TicketController = TicketController;
