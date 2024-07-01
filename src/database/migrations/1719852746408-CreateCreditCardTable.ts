import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCreditCardTable1719852746408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    await queryRunner.createForeignKeys("credit_cards", [
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["accountId"],
        referencedColumnNames: ["id"],
        referencedTableName: "accounts",
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("credit_cards");
  }
}
