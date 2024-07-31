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
exports.markNotificationAsRead = exports.getUserNotifications = void 0;
const data_source_1 = require("../database/data-source");
const Notification_1 = require("../database/entities/Notification");
const getUserNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const notificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
        const notifications = yield notificationRepository.find({
            where: { user: { id: userId } },
            order: { date: "DESC" },
        });
        return res.status(200).json({ message: "Notifications", notifications });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
});
exports.getUserNotifications = getUserNotifications;
const markNotificationAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificationId } = req.params;
    try {
        const notificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
        const notification = yield notificationRepository.update(notificationId, {
            is_read: true,
        });
        return res.status(200).json({ message: "Notification marked as read!" });
    }
    catch (error) {
        console.log(`Error mark_notification: ${error}`);
        return res.status(500).json({ message: "Internal server error!" });
    }
});
exports.markNotificationAsRead = markNotificationAsRead;
//# sourceMappingURL=notification.controller.js.map