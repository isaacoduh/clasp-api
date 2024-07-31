"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
const Account_1 = require("./entities/Account");
const CreditCard_1 = require("./entities/CreditCard");
const KYC_1 = require("./entities/KYC");
const Notification_1 = require("./entities/Notification");
const Transaction_1 = require("./entities/Transaction");
const User_1 = require("./entities/User");
dotenv.config();
// const isProduction = process.env.NODE_ENV === "production";
const isStaging = process.env.NODE_ENV === "staging";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: ["query"],
    entities: [User_1.User, KYC_1.Kyc, Account_1.Account, Transaction_1.Transaction, CreditCard_1.CreditCard, Notification_1.Notification],
    subscribers: [],
    migrations: ["src/database/migrations/*.ts"],
    ssl: isStaging ? { rejectUnauthorized: true } : false,
});
//# sourceMappingURL=data-source.js.map