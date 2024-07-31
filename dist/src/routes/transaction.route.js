"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middleware/auth.middleware");
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("../controllers/transaction.controller");
const router = express_1.default.Router();
router.post("/transfer", auth_middleware_1.AuthMiddleware.authenticate, transaction_controller_1.transferFunds);
router.get("/history", auth_middleware_1.AuthMiddleware.authenticate, transaction_controller_1.transactionHistory);
exports.default = router;
//# sourceMappingURL=transaction.route.js.map