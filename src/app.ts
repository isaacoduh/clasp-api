import express, { Express, Request, Response } from "express";
import authRoute from "./routes/auth.route";
import dashboardRoute from "./routes/dashboard.route";
import accountRoute from "./routes/account.route";
import kycRoute from "./routes/kyc.route";
import adminRoute from "./routes/admin.route";
import transactionRoute from "./routes/transaction.route";
import paymentRequestRoute from "./routes/paymentRequest.route";
import stripeRoutes from "./routes/stripe.route";
import creditCardRoute from "./routes/creditCard.route";
import notificationRoute from "./routes/notification.route";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import "express-async-errors";
import { handleWebhook } from "./controllers/payment.controller";

const app: Express = express();
app.use(
  "/api/v1/payments/handle-stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  handleWebhook
);
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/dashboard", dashboardRoute);
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
