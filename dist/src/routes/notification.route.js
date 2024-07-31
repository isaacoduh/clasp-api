"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middleware/auth.middleware");
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../controllers/notification.controller");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.AuthMiddleware.authenticate, notification_controller_1.getUserNotifications);
router.put("/:notificationId", auth_middleware_1.AuthMiddleware.authenticate, notification_controller_1.markNotificationAsRead);
exports.default = router;
//# sourceMappingURL=notification.route.js.map