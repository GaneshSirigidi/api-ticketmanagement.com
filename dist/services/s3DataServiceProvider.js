"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.S3DataServiceProvider = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AWS = __importStar(require("aws-sdk"));
class S3DataServiceProvider {
    constructor() {
        this.s3Service = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            region: process.env.AWS_S3_BUCKET_REGION,
            signatureVersion: 'v4'
        });
    }
    getPreSignedUrl(fileName, type = "put", slug, expireSeconds = parseInt(process.env.PRE_SIGNED_URL_EXPIRES, 10), bucket = process.env.AWS_S3_BUCKET) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = "";
            if (slug) {
                key += `${slug}/`;
            }
            key += fileName;
            const params = {
                Bucket: bucket,
                Expires: expireSeconds,
                Key: key,
            };
            if (type == "put") {
                params["ContentType"] = "application/x-www-form-urlencoded";
            }
            const method = type === "put" ? "putObject" : "getObject";
            return yield this.s3Service.getSignedUrl(method, params);
        });
    }
}
exports.S3DataServiceProvider = S3DataServiceProvider;
