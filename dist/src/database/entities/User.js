"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = require("bcrypt");
const typeorm_1 = require("typeorm");
const Account_1 = require("./Account");
const KYC_1 = require("./KYC");
const Transaction_1 = require("./Transaction");
let User = User_1 = class User {
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield (0, bcrypt_1.hash)(this.password, 12);
        });
    }
    toResponse() {
        const responseUser = new User_1();
        responseUser.id = this.id;
        responseUser.username = this.username;
        responseUser.email = this.email;
        responseUser.createdAt = this.createdAt;
        responseUser.updatedAt = this.updatedAt;
        responseUser.kyc = this.kyc;
        return responseUser;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true })
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true })
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)()
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => KYC_1.Kyc, (kyc) => kyc.user, { cascade: true })
], User.prototype, "kyc", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Account_1.Account, (account) => account.user, { cascade: true })
], User.prototype, "accounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transaction_1.Transaction, (transaction) => transaction.user, {
        cascade: true,
    })
], User.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)()
], User.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)()
], User.prototype, "updatedAt", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
exports.User = User;
//# sourceMappingURL=User.js.map