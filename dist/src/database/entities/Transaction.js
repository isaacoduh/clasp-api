"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TransactionStatus = exports.TransactionType = void 0;
const typeorm_1 = require("typeorm");
const Account_1 = require("./Account");
const User_1 = require("./User");
var TransactionType;
(function (TransactionType) {
    TransactionType["TRANSFER"] = "transfer";
    TransactionType["RECEIVED"] = "received";
    TransactionType["WITHDRAW"] = "withdraw";
    TransactionType["REFUND"] = "refund";
    TransactionType["REQUEST"] = "payment_request";
    TransactionType["NONE"] = "none";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["FAILED"] = "failed";
    TransactionStatus["COMPLETED"] = "completed";
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["PROCESSING"] = "processing";
    TransactionStatus["REQUEST_SENT"] = "request_sent";
    TransactionStatus["REQUEST_SETTLED"] = "request_settled";
    TransactionStatus["REQUEST_PROCESSING"] = "request_processing";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.transactions, { nullable: true })
], Transaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 12, scale: 2, default: 0.0 })
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 1000, nullable: true })
], Transaction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true })
], Transaction.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true })
], Transaction.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, { nullable: true })
], Transaction.prototype, "receiverAccount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, { nullable: true })
], Transaction.prototype, "senderAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: TransactionStatus,
        default: TransactionStatus.PENDING,
    })
], Transaction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: TransactionType,
        default: TransactionType.NONE,
    })
], Transaction.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], Transaction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true })
], Transaction.prototype, "updatedAt", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)("transactions")
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map