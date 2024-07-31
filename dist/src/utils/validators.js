"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object({
    username: joi_1.default.string().min(4).max(20).alphanum().required(),
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().min(8).required(),
});
exports.registerSchema = registerSchema;
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
exports.loginSchema = loginSchema;
//# sourceMappingURL=validators.js.map