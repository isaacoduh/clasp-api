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
exports.cancelPaymentRequest = exports.acceptPaymentRequest = exports.sentPaymentRequests = exports.recievedPaymentRequests = exports.createPaymentRequest = exports.searchUser = void 0;
const data_source_1 = require("./../database/data-source");
const Account_1 = require("../database/entities/Account");
const User_1 = require("../database/entities/User");
const Transaction_1 = require("../database/entities/Transaction");
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { account_number } = req.query;
    const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
    const account = yield accountRepository.findOne({
        where: { account_number: account_number === null || account_number === void 0 ? void 0 : account_number.toString() },
        relations: ["user"],
    });
    if (!account) {
        return res.status(404).json({ message: "Account not found!" });
    }
    const result = {
        account_number: account.account_number,
        username: (_a = account.user) === null || _a === void 0 ? void 0 : _a.username,
    };
    return res.status(200).json({ message: "Account Number ", result });
});
exports.searchUser = searchUser;
const createPaymentRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const { account_number, amount, description } = req.body;
    const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
    // make sure sender is validated
    const sender = (yield userRepository.findOneBy({
        id: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
    }));
    const receiverAccount = yield accountRepository.findOne({
        where: { account_number: account_number === null || account_number === void 0 ? void 0 : account_number.toString() },
    });
    if (!sender || !receiverAccount) {
        return res
            .status(404)
            .json({ message: "Sender or receiver account not found!" });
    }
    // find receiver
    const receiver = (yield userRepository.findOneBy({
        id: (_c = receiverAccount.user) === null || _c === void 0 ? void 0 : _c.id,
    }));
    // create new request (transaction)
    const newRequest = new Transaction_1.Transaction();
    newRequest.user = sender;
    newRequest.amount = amount;
    newRequest.description = description;
    newRequest.sender = sender;
    newRequest.receiver = receiver;
    newRequest.receiverAccount = receiverAccount;
    newRequest.status = Transaction_1.TransactionStatus.REQUEST_PROCESSING;
    newRequest.transactionType = Transaction_1.TransactionType.REQUEST;
    yield transactionRepository.save(newRequest);
    return res.status(200).json({ message: "Payment Request created!" });
});
exports.createPaymentRequest = createPaymentRequest;
const recievedPaymentRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
    const paymentRequests = yield transactionRepository.find({
        where: {
            transactionType: Transaction_1.TransactionType.REQUEST,
            receiver: { id: (_d = req.currentUser) === null || _d === void 0 ? void 0 : _d.id },
        },
        relations: ["sender", "receiver"],
        order: { createdAt: "DESC" },
    });
    const results = paymentRequests.map((transaction) => {
        var _a;
        return {
            id: transaction.id,
            amount: transaction.amount,
            description: transaction.description,
            status: transaction.status,
            createdAt: transaction.createdAt,
            senderUsername: ((_a = transaction.sender) === null || _a === void 0 ? void 0 : _a.username) || null,
        };
    });
    return res.status(200).json({ message: "Payment Request created!", results });
});
exports.recievedPaymentRequests = recievedPaymentRequests;
const sentPaymentRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
    const paymentRequests = yield transactionRepository.find({
        where: {
            transactionType: Transaction_1.TransactionType.REQUEST,
            sender: { id: (_e = req.currentUser) === null || _e === void 0 ? void 0 : _e.id },
        },
        relations: ["sender", "receiver"],
        order: { createdAt: "DESC" },
    });
    const results = paymentRequests.map((transaction) => {
        var _a;
        return {
            id: transaction.id,
            amount: transaction.amount,
            description: transaction.description,
            status: transaction.status,
            createdAt: transaction.createdAt,
            receiverUsername: ((_a = transaction.receiver) === null || _a === void 0 ? void 0 : _a.username) || null,
        };
    });
    return res.status(200).json({ message: "Payment Request created!", results });
});
exports.sentPaymentRequests = sentPaymentRequests;
const acceptPaymentRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { transactionId } = req.params;
    const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
    const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
    const paymentRequest = (yield transactionRepository.findOne({
        where: { id: transactionId },
        relations: ["sender"],
    }));
    const amount = parseFloat(paymentRequest.amount.toString());
    const { account_number } = req.body;
    const account = yield accountRepository.findOne({
        where: { account_number: account_number, userId: (_f = req.currentUser) === null || _f === void 0 ? void 0 : _f.id },
    });
    if (!account) {
        return res.status(404).json({ message: "Account does not exist " });
    }
    const accountBalance = parseFloat(account.account_balance.toString());
    if (amount > accountBalance) {
        return res
            .status(500)
            .json({ message: "Requested amount is more than account balance" });
    }
    const receipientAccounts = yield accountRepository.find({
        where: { userId: paymentRequest.sender.id },
    });
    receipientAccounts[0].account_balance =
        parseFloat(receipientAccounts[0].account_balance.toString()) + amount;
    account.account_balance = account.account_balance - amount;
    paymentRequest.status = Transaction_1.TransactionStatus.REQUEST_SETTLED;
    yield data_source_1.AppDataSource.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        yield t.save(account);
        yield t.save(receipientAccounts[0]);
        yield t.save(paymentRequest);
    }));
    return res.status(200).json({ message: "Payment Request Processed!" });
});
exports.acceptPaymentRequest = acceptPaymentRequest;
const cancelPaymentRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.params;
    const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
    const paymentRequest = (yield transactionRepository.findOne({
        where: { id: transactionId },
        relations: ["sender"],
    }));
    paymentRequest.status = Transaction_1.TransactionStatus.FAILED;
    yield transactionRepository.save(paymentRequest);
    return res.status(200).json({ message: "Request Canceled" });
});
exports.cancelPaymentRequest = cancelPaymentRequest;
//# sourceMappingURL=paymentRequest.controller.js.map