import { AuthMiddleware } from "./../middleware/auth.middleware";
import express from "express";
import {
  searchUser,
  createPaymentRequest,
  recievedPaymentRequests,
  sentPaymentRequests,
  acceptPaymentRequest,
} from "../controllers/paymentRequest.controller";

const router = express.Router();
router.get("/searchUser", searchUser);
router.post("/new", AuthMiddleware.authenticate, createPaymentRequest);
router.get("/received", AuthMiddleware.authenticate, recievedPaymentRequests);
router.get("/sent", AuthMiddleware.authenticate, sentPaymentRequests);
router.put("/:id/accept", AuthMiddleware.authenticate, acceptPaymentRequest);

export default router;
