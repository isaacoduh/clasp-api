import express from "express";
import { AuthController } from "../controllers/auth.controller";

const authController = new AuthController();

const router = express.Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
export default router;
