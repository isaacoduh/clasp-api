"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kyc_controller_1 = require("../controllers/kyc.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.put("/update", auth_middleware_1.AuthMiddleware.authenticate, kyc_controller_1.updateKyc);
exports.default = router;
//# sourceMappingURL=kyc.route.js.map