import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateNotificationTable1719921865461
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
            type: "integer",
            default: 0,
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
      })
    );

    await queryRunner.createForeignKey(
      "notifications",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notification");
  }
}
