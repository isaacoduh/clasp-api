import express from "express";
import { getKyc, updateKyc } from "../controllers/kyc.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

router.get("/", AuthMiddleware.authenticate, getKyc);
router.put("/update", AuthMiddleware.authenticate, updateKyc);
export default router;
