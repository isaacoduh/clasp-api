"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kyc = exports.MaritalStatus = exports.Gender = exports.DocumentType = exports.KycStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
var KycStatus;
(function (KycStatus) {
    KycStatus["PENDING"] = "pending";
    KycStatus["APPROVED"] = "approved";
    KycStatus["REJECTED"] = "rejected";
})(KycStatus = exports.KycStatus || (exports.KycStatus = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["PASSPORT"] = "passport";
    DocumentType["DRIVER_LICENSE"] = "driver_license";
    DocumentType["ID_CARD"] = "id_card";
})(DocumentType = exports.DocumentType || (exports.DocumentType = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender = exports.Gender || (exports.Gender = {}));
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["MARRIED"] = "married";
    MaritalStatus["SINGLE"] = "single";
    MaritalStatus["DIVORCED"] = "divorced";
})(MaritalStatus = exports.MaritalStatus || (exports.MaritalStatus = {}));
let Kyc = class Kyc {
    isKycCompleted() {
        return (this.status === KycStatus.APPROVED &&
            this.documentType !== undefined &&
            this.documentNumber !== undefined &&
            this.issuedDate !== undefined &&
            this.expiryDate !== undefined &&
            this.firstname !== undefined &&
            this.lastname !== undefined &&
            this.gender !== undefined &&
            this.image !== undefined &&
            this.marital_status !== undefined &&
            this.date_of_birth !== undefined &&
            this.signature !== undefined &&
            this.country !== undefined &&
            this.state !== undefined &&
            this.city !== undefined &&
            this.phone !== undefined);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
], Kyc.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.kyc),
    (0, typeorm_1.JoinColumn)()
], Kyc.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: KycStatus, default: KycStatus.PENDING })
], Kyc.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: DocumentType })
], Kyc.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "documentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "issuedDate", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Gender })
], Kyc.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: MaritalStatus })
], Kyc.prototype, "marital_status", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "signature", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Kyc.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], Kyc.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)()
], Kyc.prototype, "updatedAt", void 0);
Kyc = __decorate([
    (0, typeorm_1.Entity)("kycs")
], Kyc);
exports.Kyc = Kyc;
//# sourceMappingURL=KYC.js.map