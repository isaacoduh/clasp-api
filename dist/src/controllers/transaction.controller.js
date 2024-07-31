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
exports.transactionHistory = exports.transferFunds = void 0;
const data_source_1 = require("../database/data-source");
const Account_1 = require("../database/entities/Account");
const User_1 = require("../database/entities/User");
const Transaction_1 = require("../database/entities/Transaction");
const Notification_1 = require("../database/entities/Notification");
const uuid_1 = require("uuid");
const transferFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const senderId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
    const { senderAccountNumber, receiverAccountNumber, amount, description } = req.body;
    if (!receiverAccountNumber || !amount) {
        return res
            .status(400)
            .json({ message: "receiver, and amount are required!" });
    }
    const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
    const notificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
    const sender = yield userRepository.findOneBy({ id: senderId });
    if (!sender) {
        return res.status(404).json({ message: "Sender not found!" });
    }
    const senderAccount = yield accountRepository.findOneBy({
        account_number: senderAccountNumber,
    });
    if (!senderAccount || senderAccount.account_balance < amount) {
        return res.status(404).json({ message: "Insufficient Funds!" });
    }
    const receiverAccount = yield accountRepository.findOneBy({
        account_number: receiverAccountNumber,
    });
    if (!receiverAccount) {
        return res.status(404).json({ message: "Reciever Not found!" });
    }
    const receiver = (yield userRepository.findOneBy({
        id: receiverAccount.userId,
    }));
    const senderBalance = parseFloat(senderAccount.account_balance.toString());
    const receiverBalance = parseFloat(receiverAccount.account_balance.toString());
    if (isNaN(senderBalance) || isNaN(receiverBalance)) {
        return res.status(400).json({ message: "Invalid account balance" });
    }
    senderAccount.account_balance = senderBalance - amount;
    receiverAccount.account_balance = receiverBalance + amount;
    const transaction = new Transaction_1.Transaction();
    transaction.sender = sender;
    transaction.receiver = receiver;
    transaction.amount = amount;
    transaction.description = description;
    transaction.senderAccount = senderAccount;
    transaction.receiverAccount = receiverAccount;
    transaction.status = Transaction_1.TransactionStatus.COMPLETED;
    transaction.transactionType = Transaction_1.TransactionType.TRANSFER;
    transaction.user = sender;
    const senderNotification = new Notification_1.Notification();
    senderNotification.amount = amount;
    senderNotification.notification_type = Notification_1.NotificationType.TRANSFER;
    senderNotification.nid = (0, uuid_1.v4)().slice(0, 20);
    senderNotification.user = sender;
    const receiverNotification = new Notification_1.Notification();
    receiverNotification.amount = amount;
    receiverNotification.user = receiver;
    receiverNotification.nid = (0, uuid_1.v4)().slice(0, 20);
    receiverNotification.notification_type = Notification_1.NotificationType.CREDIT_ALERT;
    yield data_source_1.AppDataSource.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        yield t.save(senderAccount);
        yield t.save(receiverAccount);
        yield t.save(transaction);
        yield t.save(senderNotification);
        yield t.save(receiverNotification);
    }));
    return res.status(200).json({ message: "Transfer completed", transaction });
});
exports.transferFunds = transferFunds;
const transactionHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id;
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const user = yield userRepository.findOne({
        where: { id: userId },
        relations: ["transactions"],
    });
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    const t = yield data_source_1.AppDataSource.getRepository(Transaction_1.Transaction).find({
        where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
        relations: ["sender", "receiver"],
        order: { createdAt: "DESC" },
    });
    const transactions = t.map((transaction) => {
        var _a, _b;
        return {
            id: transaction.id,
            amount: transaction.amount,
            description: transaction.description,
            status: transaction.status,
            transactionType: transaction.transactionType,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
            senderUsername: ((_a = transaction.sender) === null || _a === void 0 ? void 0 : _a.username) || null,
            receiverUsername: ((_b = transaction.receiver) === null || _b === void 0 ? void 0 : _b.username) || null,
        };
    });
    return res.status(200).json({ message: "Data retrieved!", transactions });
});
exports.transactionHistory = transactionHistory;
//# sourceMappingURL=transaction.controller.js.map