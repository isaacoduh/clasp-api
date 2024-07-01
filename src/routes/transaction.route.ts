import { AuthMiddleware } from "./../middleware/auth.middleware";
import express from "express";
import {
  transactionHistory,
  transferFunds,
} from "../controllers/transaction.controller";
const router = express.Router();

router.post("/transfer", AuthMiddleware.authenticate, transferFunds);
router.get("/history", AuthMiddleware.authenticate, transactionHistory);

export default router;
