import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const authController = new AuthController();

const router = express.Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get('/me', AuthMiddleware.authenticate,  authController.currentUser);
export default router;
