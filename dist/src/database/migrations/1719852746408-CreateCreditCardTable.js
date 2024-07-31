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
exports.CreateCreditCardTable1719852746408 = void 0;
const typeorm_1 = require("typeorm");
class CreateCreditCardTable1719852746408 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "credit_cards",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "card_id",
                        type: "varchar",
                        length: "20",
                        isUnique: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "number",
                        type: "bigint",
                    },
                    {
                        name: "month",
                        type: "smallint",
                    },
                    {
                        name: "year",
                        type: "smallint",
                    },
                    {
                        name: "cvv",
                        type: "smallint",
                    },
                    {
                        name: "amount",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        default: "0.0",
                    },
                    {
                        name: "card_type",
                        type: "enum",
                        enum: ["master", "visa", "verve"],
                        default: `'master'`,
                    },
                    {
                        name: "card_status",
                        type: "boolean",
                        default: true,
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
                        name: "accountId",
                        type: "uuid",
                        isNullable: true,
                    },
                ],
            }), true);
            yield queryRunner.createForeignKeys("credit_cards", [
                new typeorm_1.TableForeignKey({
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                }),
                new typeorm_1.TableForeignKey({
                    columnNames: ["accountId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "accounts",
                    onDelete: "CASCADE",
                }),
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("credit_cards");
        });
    }
}
exports.CreateCreditCardTable1719852746408 = CreateCreditCardTable1719852746408;
//# sourceMappingURL=1719852746408-CreateCreditCardTable.js.map