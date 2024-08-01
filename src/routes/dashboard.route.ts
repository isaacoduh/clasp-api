import express from "express";
import { overview } from "../controllers/dashboard.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", AuthMiddleware.authenticate, overview);

export default router;
