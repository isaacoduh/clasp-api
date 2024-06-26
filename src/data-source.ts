import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "isaacoduh",
  password: "root",
  database: "clasp-dev",
  synchronize: false,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
