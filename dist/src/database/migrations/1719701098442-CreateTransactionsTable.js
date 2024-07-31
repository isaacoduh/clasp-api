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
exports.CreateTransactionsTable1719701098442 = void 0;
const typeorm_1 = require("typeorm");
class CreateTransactionsTable1719701098442 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "transactions",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "amount",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        default: "0.0",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "1000",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: [
                            "failed",
                            "completed",
                            "pending",
                            "processing",
                            "request_sent",
                            "request_settled",
                            "request_processing",
                        ],
                        default: "'pending'",
                    },
                    {
                        name: "transactionType",
                        type: "enum",
                        enum: [
                            "transfer",
                            "received",
                            "withdraw",
                            "refund",
                            "payment_request",
                            "none",
                        ],
                        default: "'none'",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        isNullable: true,
                        default: "now()",
                    },
                    {
                        name: "userId",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "receiverId",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "senderId",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "receiverAccountId",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "senderAccountId",
                        type: "uuid",
                        isNullable: true,
                    },
                ],
            }), true);
            yield queryRunner.createForeignKeys("transactions", [
                new typeorm_1.TableForeignKey({
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "SET NULL",
                }),
                new typeorm_1.TableForeignKey({
                    columnNames: ["receiverId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "SET NULL",
                }),
                new typeorm_1.TableForeignKey({
                    columnNames: ["senderId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "SET NULL",
                }),
                new typeorm_1.TableForeignKey({
                    columnNames: ["receiverAccountId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "accounts",
                    onDelete: "SET NULL",
                }),
                new typeorm_1.TableForeignKey({
                    columnNames: ["senderAccountId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "accounts",
                    onDelete: "SET NULL",
                }),
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("transactions");
        });
    }
}
exports.CreateTransactionsTable1719701098442 = CreateTransactionsTable1719701098442;
//# sourceMappingURL=1719701098442-CreateTransactionsTable.js.map