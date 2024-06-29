import express from "express";
import { updateKyc } from "../controllers/kyc.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

router.put("/update", AuthMiddleware.authenticate, updateKyc);
export default router;
