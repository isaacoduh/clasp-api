import express, { Express, Request, Response } from "express";
import authRoute from "./routes/auth.route";
import accountRoute from "./routes/account.route";
import kycRoute from "./routes/kyc.route";
import adminRoute from "./routes/admin.route";
import transactionRoute from "./routes/transaction.route";
import paymentRequestRoute from "./routes/paymentRequest.route";
import stripeRoutes from "./routes/stripe.route";
import creditCardRoute from "./routes/creditCard.route";
import notificationRoute from "./routes/notification.route";
import bodyParser from "body-parser";
import "express-async-errors";
import { handleWebhook } from "./controllers/payment.controller";
const stripe = require("stripe")(
  "sk_test_51PY6hmL0mfmIj3HsbICsI85uBR28wrWRopTe9NGY7D38gmqMLt24x7lE8Ap4Z3oDy6cEGPfpkxdghARiT1g3sPx600wzDygAz7"
);

const app: Express = express();
app.use(
  "/api/v1/payments/handle-stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  handleWebhook
);
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/accounts", accountRoute);
app.use("/api/v1/kyc", kycRoute);
app.use("/api/v1/transactions", transactionRoute);
app.use("/api/v1/payment_requests", paymentRequestRoute);
app.use("/api/v1/credit_cards", creditCardRoute);
app.use("/api/v1/notifications", notificationRoute);
app.use("/api/v1/payments", stripeRoutes);
app.use("/api/v1/admin", adminRoute);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({ success: false, message: "Route Not Found!" });
});

export default app;
