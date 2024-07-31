"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middleware/auth.middleware");
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const router = express_1.default.Router();
router.post("/create-payment-intent", auth_middleware_1.AuthMiddleware.authenticate, payment_controller_1.createPaymentIntent);
// router.post(
//   "/handle-stripe-webhook",
//   bodyParser.raw({ type: "*/*" }),
//   handleWebhook
// );
exports.default = router;
//# sourceMappingURL=stripe.route.js.map