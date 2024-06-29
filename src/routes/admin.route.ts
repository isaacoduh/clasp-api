import express from "express";
import { moderateKyc } from "../controllers/admin.controller";
const router = express.Router();

router.put("/kyc/moderate/:kycId", moderateKyc);

export default router;
