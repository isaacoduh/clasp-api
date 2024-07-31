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
exports.CreateNotificationTable1719921865461 = void 0;
const typeorm_1 = require("typeorm");
class CreateNotificationTable1719921865461 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "notifications",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "notification_type",
                        type: "enum",
                        enum: [
                            "None",
                            "Transfer",
                            "Credit Alert",
                            "Debit Alert",
                            "Sent Payment Request",
                            "Received Payment Request",
                            "Funded Credit Card",
                            "Withdrew Credit Card Funds",
                            "Deleted Credit Card",
                            "Added Credit Card",
                        ],
                        default: "'None'",
                    },
                    {
                        name: "amount",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        default: "0.0",
                    },
                    {
                        name: "is_read",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "date",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "nid",
                        type: "varchar",
                        length: "25",
                        isUnique: true,
                    },
                    {
                        name: "userId",
                        type: "varchar",
                        isNullable: true,
                    },
                ],
            }));
            yield queryRunner.createForeignKey("notifications", new typeorm_1.TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL",
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("notifications");
        });
    }
}
exports.CreateNotificationTable1719921865461 = CreateNotificationTable1719921865461;
//# sourceMappingURL=1719921865461-CreateNotificationTable.js.map