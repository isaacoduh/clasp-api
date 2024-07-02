import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Account } from "./entities/Account";
import { CreditCard } from "./entities/CreditCard";
import { Kyc } from "./entities/KYC";
import { Transaction } from "./entities/Transaction";
import { User } from "./entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "isaacoduh",
  password: "root",
  database: "clasp-dev",
  synchronize: false,
  logging: ["query"],
  entities: [User, Kyc, Account, Transaction, CreditCard],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
