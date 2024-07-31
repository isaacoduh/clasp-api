"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.NotificationType = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
var NotificationType;
(function (NotificationType) {
    NotificationType["NONE"] = "None";
    NotificationType["TRANSFER"] = "Transfer";
    NotificationType["CREDIT_ALERT"] = "Credit Alert";
    NotificationType["DEBIT_ALERT"] = "Debit Alert";
    NotificationType["SENT_PAYMENT_REQUEST"] = "Sent Payment Request";
    NotificationType["RECEIVED_PAYMENT_REQUEST"] = "Received Payment Request";
    NotificationType["FUNDED_CREDIT_CARD"] = "Funded Credit Card";
    NotificationType["WITHDREW_CREDIT_CARD_FUNDS"] = "Withdrew Credit Card Funds";
    NotificationType["DELETED_CREDIT_CARD"] = "Deleted Credit Card";
    NotificationType["ADDED_CREDIT_CARD"] = "Added Credit Card";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
let Notification = class Notification {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { onDelete: "SET NULL", nullable: true })
], Notification.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: NotificationType,
        default: NotificationType.NONE,
    })
], Notification.prototype, "notification_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.0 })
], Notification.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false })
], Notification.prototype, "is_read", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], Notification.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 25 })
], Notification.prototype, "nid", void 0);
Notification = __decorate([
    (0, typeorm_1.Entity)("notifications")
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map