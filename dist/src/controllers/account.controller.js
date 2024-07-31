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
exports.getAccounts = exports.getAccountByNumber = exports.createAccount = void 0;
const data_source_1 = require("../database/data-source");
const Account_1 = require("../database/entities/Account");
const KYC_1 = require("../database/entities/KYC");
const User_1 = require("../database/entities/User");
const crypto_1 = __importDefault(require("crypto"));
require("class-validator");
const class_validator_1 = require("class-validator");
const generateAccountNumer = () => {
    return Math.random().toString().slice(2, 12);
};
const generateAccountId = () => {
    return crypto_1.default.randomBytes(4).toString("hex").toUpperCase().slice(0, 7);
};
const generatePinNumber = () => {
    return Math.random().toString().slice(2, 6);
};
const generateRedCode = () => {
    return crypto_1.default.randomBytes(6).toString("hex").toUpperCase().slice(0, 10);
};
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.currentUser;
        const { currency } = req.body;
        const userRespository = data_source_1.AppDataSource.getRepository(User_1.User);
        const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
        const kycRepository = data_source_1.AppDataSource.getRepository(KYC_1.Kyc);
        const user = yield userRespository.findOneBy({ id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const kyc = yield kycRepository.findOneBy({ user });
        //   if (!kyc || !kyc.isKycCompleted()) {
        //     return res.status(400).json({ message: "KYC not completed!" });
        //   }
        const account = new Account_1.Account();
        account.user = user;
        account.account_number = generateAccountNumer();
        account.account_id = generateAccountId();
        account.pin_number = generatePinNumber();
        account.red_code = generateRedCode();
        account.currency = currency;
        account.account_status = "active";
        account.kyc_submitted = true;
        account.kyc_confirmed = (kyc === null || kyc === void 0 ? void 0 : kyc.status) === "approved";
        const errors = yield (0, class_validator_1.validate)(account);
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed", errors });
        }
        yield accountRepository.save(account);
        return res
            .status(201)
            .json({ message: "Account created successfully!", account });
        // console.log(account);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createAccount = createAccount;
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.currentUser;
        // find user then return accounts
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
        const user = yield userRepository.findOneBy({ id });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const accounts = yield accountRepository.find({ where: { userId: id } });
        return res.status(200).json({ message: "Data Retrieved", accounts });
    }
    catch (error) {
        return res.status(500).json(`Error get_accounts: ${error}`);
    }
});
exports.getAccounts = getAccounts;
const getAccountByNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountNumber = req.params.accountNumber;
    const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
    const account = yield accountRepository.findOne({
        where: { account_number: accountNumber },
        relations: ["user"],
        select: ["id", "account_number"],
    });
    if (!account) {
        return res.status(404).json({ message: "Account not found!" });
    }
    const { account_number, user } = account;
    const data = { account_number, username: user === null || user === void 0 ? void 0 : user.username };
    return res.status(200).json({ message: "Data Retrieved!", data });
});
exports.getAccountByNumber = getAccountByNumber;
//# sourceMappingURL=account.controller.js.map