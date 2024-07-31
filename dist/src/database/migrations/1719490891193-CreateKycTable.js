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
exports.CreateKycTable1719490891193 = void 0;
const typeorm_1 = require("typeorm");
class CreateKycTable1719490891193 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "kycs",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "userId",
                        type: "varchar",
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["pending", "approved", "rejected"],
                        default: "'pending'",
                        isNullable: false,
                    },
                    {
                        name: "documentType",
                        type: "enum",
                        enum: ["passport", "driver_license", "id_card"],
                        isNullable: true,
                    },
                    {
                        name: "documentNumber",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "issuedDate",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "expiryDate",
                        type: "date",
                        isNullable: true,
                    },
                    { name: "firstname", type: "varchar", isNullable: true },
                    { name: "lastname", type: "varchar", isNullable: true },
                    {
                        name: "gender",
                        type: "enum",
                        enum: ["male", "female"],
                        isNullable: true,
                    },
                    { name: "image", type: "varchar", isNullable: true },
                    {
                        name: "marital_status",
                        type: "enum",
                        enum: ["marrried", "single", "divorced"],
                        isNullable: true,
                    },
                    {
                        name: "date_of_birth",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "signature",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "country",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "state",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "city",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true,
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true,
                    },
                ],
            }), true);
            yield queryRunner.createForeignKey("kycs", new typeorm_1.TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            }));
            // await queryRunner.createUniqueConstraint(
            //   "kycs",
            //   new TableUnique({
            //     columnNames: ["userId"],
            //   })
            // );
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("kycs");
        });
    }
}
exports.CreateKycTable1719490891193 = CreateKycTable1719490891193;
//# sourceMappingURL=1719490891193-CreateKycTable.js.map