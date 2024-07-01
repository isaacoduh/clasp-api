import express from "express";
import { searchUser } from "../controllers/paymentRequest.controller";

const router = express.Router();
router.get("/searchUser", searchUser);

export default router;
