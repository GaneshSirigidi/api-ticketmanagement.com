"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agent_1 = __importDefault(require("../agent/agent"));
const ticket_1 = __importDefault(require("../agent/ticket"));
const router = (0, express_1.Router)();
router.use(agent_1.default);
router.use(ticket_1.default);
exports.default = router;
