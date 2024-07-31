"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const data_source_1 = require("../database/data-source");
const User_1 = require("../database/entities/User");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const KYC_1 = require("../database/entities/KYC");
const validators_1 = require("../utils/validators");
const email_1 = require("../utils/email");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            const { error } = validators_1.registerSchema.validate({ username, email, password });
            if (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const kycRepo = data_source_1.AppDataSource.getRepository(KYC_1.Kyc);
            // check if user exists already
            const existingUser = yield repo.findOne({
                where: { email: email, username: username },
            });
            if (existingUser) {
                return res.status(500).json({
                    success: false,
                    error: "User with email or username exists already",
                });
            }
            // Create and save the user
            const user = repo.create({ username, email, password });
            yield repo.save(user);
            // Create and save the KYC record associated with the user
            const newKyc = kycRepo.create({ userId: user.id });
            yield kycRepo.save(newKyc);
            // Assign the KYC record to the user and save the user again if necessary
            user.kyc = newKyc;
            yield repo.save(user);
            const isKycCompleted = newKyc.isKycCompleted();
            yield email_1.mailTransport.sendEmail(user.email, "Welcome", "Welcome to us", {}, "welcome");
            return res.status(201).json({
                success: true,
                message: "User Created Successfully",
                data: { user, isKycCompleted },
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = yield repo.findOneBy({ email });
            const { error } = validators_1.loginSchema.validate({ email, password });
            if (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
            if (!user) {
                return res.status(404).json({ message: "User not Found!" });
            }
            let passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid Credentials!" });
            }
            let token = (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            const result = user.toResponse();
            return res.json({
                success: true,
                message: "Login Success",
                user: result,
                token,
            });
        });
    }
    currentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.currentUser;
            // find the currently logged in user by the id
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = yield repo.findOneByOrFail({ id });
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }
            return res.status(201).json({ success: true, user: user.toResponse() });
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map