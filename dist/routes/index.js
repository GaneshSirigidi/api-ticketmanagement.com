"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_1 = __importDefault(require("../routes/ticket"));
const user_1 = __importDefault(require("../routes/user"));
const router = express_1.default.Router();
router.use('/', ticket_1.default);
router.use('/', user_1.default);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
exports.default = router;
