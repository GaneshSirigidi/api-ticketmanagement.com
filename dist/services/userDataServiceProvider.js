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
exports.UserDataServiceProvider = void 0;
const user_1 = require("../model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 12;
class UserDataServiceProvider {
    saveUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            userData.password = yield bcrypt_1.default.hash(userData.password, saltRounds);
            return yield user_1.UserModel.create(userData);
        });
    }
    userById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.UserModel.findOne({ _id: userId });
        });
    }
    signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let match = false;
            const userDetails = yield user_1.UserModel.findOne({ email });
            if (userDetails) {
                match = yield bcrypt_1.default.compare(password, userDetails.password);
            }
            return match ? userDetails : null;
        });
    }
    saveAgent(agentData) {
        return __awaiter(this, void 0, void 0, function* () {
            agentData.password = yield bcrypt_1.default.hash(agentData.password, saltRounds);
            return yield user_1.UserModel.create(agentData);
        });
    }
    emailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.UserModel.findOne({ email: email });
        });
    }
    updateUserById(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.UserModel.updateOne({ _id: userId }, { $set: data });
        });
    }
    getAll({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lean) {
                return user_1.UserModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection).lean();
            }
            return user_1.UserModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection);
        });
    }
    countAll({ query = {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.UserModel.countDocuments(query);
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.UserModel.deleteOne({ _id: userId });
        });
    }
}
exports.UserDataServiceProvider = UserDataServiceProvider;
