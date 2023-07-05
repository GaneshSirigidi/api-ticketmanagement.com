"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.MONGO_URL) {
    throw new Error("Please add the MONGO_URL environment variable");
}
var dbConnectionString = process.env.MONGO_URL;
mongoose_1.default.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const database = mongoose_1.default.connection;
database.on("error", console.error.bind(console, "❌ mongodb connection error"));
database.once("open", () => console.log("✅ mongodb connected successfully"));
mongoose_1.default.Promise = Promise;
exports.default = database;
