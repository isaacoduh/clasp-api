"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authController = new auth_controller_1.AuthController();
const router = express_1.default.Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get('/me', auth_middleware_1.AuthMiddleware.authenticate, authController.currentUser);
exports.default = router;
//# sourceMappingURL=auth.route.js.map