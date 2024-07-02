import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateAccountTable1719589196897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    await queryRunner.createForeignKey(
      "accounts",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    let table = await queryRunner.getTable("accounts");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("userId") !== -1
    );
    await queryRunner.dropForeignKey("accounts", foreignKey!);
    await queryRunner.dropTable("accounts");
  }
}
