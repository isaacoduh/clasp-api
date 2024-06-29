import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTransactionsTable1719701098442
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    await queryRunner.createForeignKeys("transactions", [
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      }),
      new TableForeignKey({
        columnNames: ["receiverId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      }),
      new TableForeignKey({
        columnNames: ["senderId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      }),
      new TableForeignKey({
        columnNames: ["receiverAccountId"],
        referencedColumnNames: ["id"],
        referencedTableName: "accounts",
        onDelete: "SET NULL",
      }),
      new TableForeignKey({
        columnNames: ["senderAccountId"],
        referencedColumnNames: ["id"],
        referencedTableName: "accounts",
        onDelete: "SET NULL",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
