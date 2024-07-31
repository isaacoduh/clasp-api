"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middleware/auth.middleware");
const express_1 = __importDefault(require("express"));
const account_controller_1 = require("../controllers/account.controller");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.AuthMiddleware.authenticate, account_controller_1.getAccounts);
router.post("/create", auth_middleware_1.AuthMiddleware.authenticate, account_controller_1.createAccount);
router.get("/getAccount/:accountNumber", account_controller_1.getAccountByNumber);
exports.default = router;
//# sourceMappingURL=account.route.js.map