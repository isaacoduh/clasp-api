import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Account } from "./entities/Account";
import { CreditCard } from "./entities/CreditCard";
import { Kyc } from "./entities/KYC";
import { Notification } from "./entities/Notification";
import { Transaction } from "./entities/Transaction";
import { User } from "./entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: ["query"],
  entities: [User, Kyc, Account, Transaction, CreditCard, Notification],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});
