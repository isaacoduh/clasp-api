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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const data_source_1 = require("./../database/data-source");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../database/entities/User");
class AuthMiddleware {
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization: tokenHeader } = req.headers;
            if (!tokenHeader) {
                return res.status(401).json({ message: 'Token not found' });
            }
            const token = tokenHeader.split(' ')[1];
            try {
                const decoded = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "x!GH#EEOE@");
                // @ts-ignore
                const { userId: id } = decoded;
                const repo = data_source_1.AppDataSource.getRepository(User_1.User);
                const user = yield repo.findOneByOrFail({ id });
                // @ts-ignore
                req === null || req === void 0 ? void 0 : req.user = user;
                req.currentUser = { id: user.id };
            }
            catch (error) {
                console.log(error);
                return res.status(401).json({ message: 'Invalid Token' });
            }
            next();
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map