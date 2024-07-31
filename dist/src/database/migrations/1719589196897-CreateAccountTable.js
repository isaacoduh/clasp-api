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
exports.CreateAccountTable1719589196897 = void 0;
const typeorm_1 = require("typeorm");
class CreateAccountTable1719589196897 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "accounts",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    { name: "userId", type: "varchar" },
                    {
                        name: "account_balance",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: "account_number",
                        type: "varchar",
                        length: "10",
                        isUnique: true,
                    },
                    {
                        name: "account_id",
                        type: "varchar",
                        length: "7",
                        isUnique: true,
                    },
                    {
                        name: "pin_number",
                        type: "varchar",
                        length: "4",
                        isUnique: true,
                    },
                    {
                        name: "red_code",
                        type: "varchar",
                        length: "10",
                        isUnique: true,
                    },
                    {
                        name: "account_status",
                        type: "varchar",
                        length: "100",
                        default: "'in-active'",
                    },
                    {
                        name: "currency",
                        type: "enum",
                        enum: ["ngn", "gbp", "usd"],
                        default: `'gbp'`,
                    },
                    {
                        name: "date",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "kyc_submitted",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "kyc_confirmed",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "review",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                        default: "'Review'",
                    },
                ],
            }), true);
            yield queryRunner.createForeignKey("accounts", new typeorm_1.TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            let table = yield queryRunner.getTable("accounts");
            const foreignKey = table === null || table === void 0 ? void 0 : table.foreignKeys.find((fk) => fk.columnNames.indexOf("userId") !== -1);
            yield queryRunner.dropForeignKey("accounts", foreignKey);
            yield queryRunner.dropTable("accounts");
        });
    }
}
exports.CreateAccountTable1719589196897 = CreateAccountTable1719589196897;
//# sourceMappingURL=1719589196897-CreateAccountTable.js.map