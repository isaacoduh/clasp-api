import { AuthMiddleware } from "./../middleware/auth.middleware";
import express from "express";
import bodyParser from "body-parser";
import {
  createPaymentIntent,
  handleWebhook,
} from "../controllers/payment.controller";

const router = express.Router();
router.post(
  "/create-payment-intent",
  AuthMiddleware.authenticate,
  createPaymentIntent
);
// router.post(
//   "/handle-stripe-webhook",
//   bodyParser.raw({ type: "*/*" }),
//   handleWebhook
// );

export default router;
