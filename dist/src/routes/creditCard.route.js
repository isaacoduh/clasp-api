"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middleware/auth.middleware");
const express_1 = __importDefault(require("express"));
const creditCard_controller_1 = require("../controllers/creditCard.controller");
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.AuthMiddleware.authenticate, creditCard_controller_1.createCreditCard);
router.get("/", auth_middleware_1.AuthMiddleware.authenticate, creditCard_controller_1.allCards);
router.get("/:card_id", auth_middleware_1.AuthMiddleware.authenticate, creditCard_controller_1.cardDetail);
router.post("/:card_id/fund", auth_middleware_1.AuthMiddleware.authenticate, creditCard_controller_1.fundCreditCard);
router.post("/:card_id/withdraw", auth_middleware_1.AuthMiddleware.authenticate, creditCard_controller_1.withdrawFunds);
router.delete("/:card_id/delete", auth_middleware_1.AuthMiddleware.authenticate, creditCard_controller_1.deleteCard);
exports.default = router;
//# sourceMappingURL=creditCard.route.js.map