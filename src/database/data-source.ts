import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
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
  entities: [User],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
