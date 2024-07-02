import { AuthMiddleware } from "./../middleware/auth.middleware";
import express from "express";
import {
  getUserNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller";

const router = express.Router();

router.get("/", AuthMiddleware.authenticate, getUserNotifications);
router.put(
  "/:notificationId",
  AuthMiddleware.authenticate,
  markNotificationAsRead
);

export default router;
