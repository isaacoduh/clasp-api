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
exports.deleteCard = exports.withdrawFunds = exports.fundCreditCard = exports.cardDetail = exports.allCards = exports.createCreditCard = void 0;
const CreditCard_1 = require("./../database/entities/CreditCard");
const data_source_1 = require("../database/data-source");
const User_1 = require("../database/entities/User");
const uuid_1 = require("uuid");
const Account_1 = require("../database/entities/Account");
const createCreditCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { firstname, lastname } = req.body;
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const creditCardRepository = data_source_1.AppDataSource.getRepository(CreditCard_1.CreditCard);
    const user = yield userRepository.findOneBy({ id: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const cardId = (0, uuid_1.v4)().slice(0, 20);
    const cardNumber = generateRandomNumber(16);
    const cvv = generateRandomNumber(3);
    const currentDate = new Date();
    const expiryMonth = currentDate.getMonth() + 1;
    const expirtyYear = currentDate.getFullYear() + 5;
    const newCreditCard = creditCardRepository.create({
        card_id: cardId,
        name: `${firstname} ${lastname}`,
        number: cardNumber,
        month: expiryMonth,
        year: expirtyYear,
        cvv: cvv,
        amount: 0.0,
        card_type: CreditCard_1.CardType.MASTER,
        card_status: true,
        user: user,
    });
    yield creditCardRepository.save(newCreditCard);
    return res.status(201).json({
        message: "Credit Card Created Successfully",
        credit_card: newCreditCard,
    });
});
exports.createCreditCard = createCreditCard;
const allCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const creditCardRepository = data_source_1.AppDataSource.getRepository(CreditCard_1.CreditCard);
    const creditCards = yield creditCardRepository.find({
        where: { user: { id: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id } },
    });
    return res
        .status(200)
        .json({ message: "Credit Card Data", cards: creditCards });
});
exports.allCards = allCards;
const cardDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { card_id } = req.params;
    const creditCardRepository = data_source_1.AppDataSource.getRepository(CreditCard_1.CreditCard);
    const creditCard = yield creditCardRepository.findOne({
        where: { card_id: card_id, user: { id: (_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.id } },
        relations: ["user"],
    });
    if (!creditCard) {
        return res.status(404).json({ message: "Credit Card Not Found" });
    }
    return res
        .status(200)
        .json({ message: "Card Information", credit_card: creditCard });
});
exports.cardDetail = cardDetail;
const fundCreditCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const { card_id } = req.params;
    const { funding_amount, account_number } = req.body;
    const creditCardRepository = data_source_1.AppDataSource.getRepository(CreditCard_1.CreditCard);
    const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
    const creditCard = yield creditCardRepository.findOne({
        where: { card_id, user: { id: (_d = req.currentUser) === null || _d === void 0 ? void 0 : _d.id } },
    });
    const account = yield accountRepository.findOne({
        where: { account_number, user: { id: (_e = req.currentUser) === null || _e === void 0 ? void 0 : _e.id } },
    });
    if (!creditCard || !account) {
        return res
            .status(404)
            .json({ message: "Credit card or account not found" });
    }
    // confirm funds in card
    if (parseFloat(funding_amount) <= account.account_balance) {
        account.account_balance =
            parseFloat(account.account_balance.toString()) -
                parseFloat(funding_amount);
        creditCard.amount =
            parseFloat(creditCard.amount.toString()) + parseFloat(funding_amount);
    }
    else {
        return res.status(500).json({ message: "Insufficent funds!" });
    }
    yield data_source_1.AppDataSource.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        yield t.save(account);
        yield t.save(creditCard);
    }));
    return res.status(200).json({ message: "Card Funded!" });
});
exports.fundCreditCard = fundCreditCard;
const withdrawFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    const { card_id } = req.params;
    const { amount, account_number } = req.body;
    const creditCardRepository = data_source_1.AppDataSource.getRepository(CreditCard_1.CreditCard);
    const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
    const creditCard = yield creditCardRepository.findOne({
        where: { card_id, user: { id: (_f = req.currentUser) === null || _f === void 0 ? void 0 : _f.id } },
    });
    const account = yield accountRepository.findOne({
        where: { account_number, user: { id: (_g = req.currentUser) === null || _g === void 0 ? void 0 : _g.id } },
    });
    if (!creditCard || !account) {
        return res
            .status(404)
            .json({ message: "Credit card or account not found" });
    }
    if (parseFloat(creditCard.amount.toString()) >= parseFloat(amount) &&
        creditCard.amount !== 0.0) {
        account.account_balance =
            parseFloat(account.account_balance.toString()) + parseFloat(amount);
        creditCard.amount =
            parseFloat(creditCard.amount.toString()) - parseFloat(amount);
    }
    else {
        return res.status(404).json({ message: "Insufficient Funds!" });
    }
    yield data_source_1.AppDataSource.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        yield t.save(account);
        yield t.save(creditCard);
    }));
    return res.status(200).json({ message: "Funds Withdrawn!" });
});
exports.withdrawFunds = withdrawFunds;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    const { card_id } = req.params;
    const { account_number } = req.body;
    const creditCardRepository = data_source_1.AppDataSource.getRepository(CreditCard_1.CreditCard);
    const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
    const creditCard = yield creditCardRepository.findOne({
        where: { card_id, user: { id: (_h = req.currentUser) === null || _h === void 0 ? void 0 : _h.id } },
    });
    const account = yield accountRepository.findOne({
        where: { account_number, user: { id: (_j = req.currentUser) === null || _j === void 0 ? void 0 : _j.id } },
    });
    if (!creditCard || !account) {
        return res
            .status(404)
            .json({ message: "Credit card or account not found" });
    }
    if (parseFloat(creditCard.amount.toString()) >= 0) {
        account.account_balance =
            parseFloat(account.account_balance.toString()) +
                parseFloat(creditCard.amount.toString());
        yield accountRepository.save(account);
    }
    yield creditCardRepository.remove(creditCard);
    return res.status(200).json({ message: "Card Deleted!" });
});
exports.deleteCard = deleteCard;
const generateRandomNumber = (length) => {
    return Math.floor(Math.random() * Math.pow(10, length));
};
//# sourceMappingURL=creditCard.controller.js.map