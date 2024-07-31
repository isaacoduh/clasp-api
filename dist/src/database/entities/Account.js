"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.CurrencyType = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
var CurrencyType;
(function (CurrencyType) {
    CurrencyType["NAIRA"] = "ngn";
    CurrencyType["POUNDS"] = "gbp";
    CurrencyType["DOLLAR"] = "usd";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
let Account = class Account {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Account.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.accounts, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)()
], Account.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 12, scale: 2, default: 0 })
], Account.prototype, "account_balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 10 })
], Account.prototype, "account_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 7 })
], Account.prototype, "account_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 4 })
], Account.prototype, "pin_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 10 })
], Account.prototype, "red_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, default: "in-active" })
], Account.prototype, "account_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: CurrencyType, default: CurrencyType.POUNDS })
], Account.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], Account.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false })
], Account.prototype, "kyc_submitted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false })
], Account.prototype, "kyc_confirmed", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, default: "Review" })
], Account.prototype, "review", void 0);
Account = __decorate([
    (0, typeorm_1.Entity)("accounts")
], Account);
exports.Account = Account;
//# sourceMappingURL=Account.js.map