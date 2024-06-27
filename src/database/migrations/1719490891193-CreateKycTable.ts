import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from "typeorm";

export class CreateKycTable1719490891193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    await queryRunner.createForeignKey(
      "kycs",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
    // await queryRunner.createUniqueConstraint(
    //   "kycs",
    //   new TableUnique({
    //     columnNames: ["userId"],
    //   })
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("kycs");
  }
}
