"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_1 = __importDefault(require("../admin/ticket"));
const admin_1 = __importDefault(require("../admin/admin"));
const router = (0, express_1.Router)();
router.use(ticket_1.default);
router.use(admin_1.default);
exports.default = router;
