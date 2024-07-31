"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCard = exports.CardType = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Account_1 = require("./Account");
var CardType;
(function (CardType) {
    CardType["MASTER"] = "master";
    CardType["VISA"] = "visa";
    CardType["VERVE"] = "verve";
})(CardType = exports.CardType || (exports.CardType = {}));
let CreditCard = class CreditCard {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
], CreditCard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { onDelete: "CASCADE" })
], CreditCard.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 20 })
], CreditCard.prototype, "card_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 })
], CreditCard.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" })
], CreditCard.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "smallint" })
], CreditCard.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "smallint" })
], CreditCard.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "smallint" })
], CreditCard.prototype, "cvv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0.0 })
], CreditCard.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: CardType, default: CardType.MASTER })
], CreditCard.prototype, "card_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true })
], CreditCard.prototype, "card_status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], CreditCard.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)()
], CreditCard.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, { onDelete: "CASCADE" })
], CreditCard.prototype, "account", void 0);
CreditCard = __decorate([
    (0, typeorm_1.Entity)("credit_cards")
], CreditCard);
exports.CreditCard = CreditCard;
//# sourceMappingURL=CreditCard.js.map