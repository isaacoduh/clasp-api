import { AppDataSource } from "./database/data-source";
import * as dotenv from "dotenv";
import "reflect-metadata";

import app from "./app";
dotenv.config();

const PORT = process.env.PORT || 7600;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connection success!");
  })
  .catch((error) => console.error(error));

app.listen(PORT, () => {
  console.log(`Service is running on port ${PORT}`);
});
