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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketDataServiceProvider = void 0;
const ticket_1 = require("../model/ticket");
class TicketDataServiceProvider {
    saveTicket(queryData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ticket_1.TicketModel.create(queryData);
        });
    }
    getTicketById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ticket_1.TicketModel.findById({ _id: id });
        });
    }
    getAll({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lean) {
                return ticket_1.TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection).lean();
            }
            return ticket_1.TicketModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection);
        });
    }
    countAll({ query = {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            return ticket_1.TicketModel.countDocuments(query);
        });
    }
}
exports.TicketDataServiceProvider = TicketDataServiceProvider;
