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
exports.SendInBlueAPIDataServiceProvider = void 0;
// import { CustomError } from '../../interfaces/customError'
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SibApiV3Sdk = require("sib-api-v3-typescript");
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.AccountApiApiKeys.apiKey, process.env.SEND_IN_BLUE_SERVICE_KEY);
class SendInBlueAPIDataServiceProvider {
    constructor() {
    }
    sendEmail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sender = {
                    email: process.env.SENDER_EMAIL,
                    name: process.env.SENDER_NAME,
                };
                const receivers = [{ email: options.to }];
                const response = yield apiInstance.sendTransacEmail({
                    sender,
                    to: receivers,
                    subject: options.subject,
                    htmlContent: options.html,
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.SendInBlueAPIDataServiceProvider = SendInBlueAPIDataServiceProvider;
