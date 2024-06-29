import { AuthMiddleware } from "./../middleware/auth.middleware";
import express from "express";
import {
  createAccount,
  getAccountByNumber,
  getAccounts,
} from "../controllers/account.controller";

const router = express.Router();
router.get("/", AuthMiddleware.authenticate, getAccounts);
router.post("/create", AuthMiddleware.authenticate, createAccount);
router.get("/getAccount/:accountNumber", getAccountByNumber);

export default router;
