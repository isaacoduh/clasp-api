import { AuthMiddleware } from "./../middleware/auth.middleware";
import express from "express";
import {
  searchUser,
  createPaymentRequest,
  recievedPaymentRequests,
  sentPaymentRequests,
  acceptPaymentRequest,
  cancelPaymentRequest,
} from "../controllers/paymentRequest.controller";

const router = express.Router();
router.get("/searchUser", searchUser);
router.post("/new", AuthMiddleware.authenticate, createPaymentRequest);
router.get("/received", AuthMiddleware.authenticate, recievedPaymentRequests);
router.get("/sent", AuthMiddleware.authenticate, sentPaymentRequests);
router.put("/:id/accept", AuthMiddleware.authenticate, acceptPaymentRequest);
router.put("/:id/cancel", AuthMiddleware.authenticate, cancelPaymentRequest);

export default router;
