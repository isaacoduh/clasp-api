import express, { Express, Request, Response } from "express";
import authRoute from "./routes/auth.route";
import accountRoute from "./routes/account.route";
import kycRoute from "./routes/kyc.route";
import adminRoute from "./routes/admin.route";
import bodyParser from "body-parser";
import "express-async-errors";

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/accounts", accountRoute);
app.use("/api/v1/kyc", kycRoute);
app.use("/api/v1/admin", adminRoute);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({ success: false, message: "Route Not Found!" });
});

export default app;
