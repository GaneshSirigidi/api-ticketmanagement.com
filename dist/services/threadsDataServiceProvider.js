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
exports.ThreadsDataServiceProvider = void 0;
const thread_1 = require("../model/thread");
class ThreadsDataServiceProvider {
    replyTicket(replyData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield thread_1.ThreadModel.create(replyData);
        });
    }
    getAll({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lean) {
                return thread_1.ThreadModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection).lean();
            }
            return thread_1.ThreadModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection);
        });
    }
    countAll({ query = {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            return thread_1.ThreadModel.countDocuments(query);
        });
    }
}
exports.ThreadsDataServiceProvider = ThreadsDataServiceProvider;
