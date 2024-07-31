"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middleware/auth.middleware");
const express_1 = __importDefault(require("express"));
const paymentRequest_controller_1 = require("../controllers/paymentRequest.controller");
const router = express_1.default.Router();
router.get("/searchUser", paymentRequest_controller_1.searchUser);
router.post("/new", auth_middleware_1.AuthMiddleware.authenticate, paymentRequest_controller_1.createPaymentRequest);
router.get("/received", auth_middleware_1.AuthMiddleware.authenticate, paymentRequest_controller_1.recievedPaymentRequests);
router.get("/sent", auth_middleware_1.AuthMiddleware.authenticate, paymentRequest_controller_1.sentPaymentRequests);
router.put("/:id/accept", auth_middleware_1.AuthMiddleware.authenticate, paymentRequest_controller_1.acceptPaymentRequest);
router.put("/:id/cancel", auth_middleware_1.AuthMiddleware.authenticate, paymentRequest_controller_1.cancelPaymentRequest);
exports.default = router;
//# sourceMappingURL=paymentRequest.route.js.map