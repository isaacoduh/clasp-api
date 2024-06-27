import { DataSource } from "typeorm";
import { AppDataSource } from "../src/database/data-source"; // Adjust the path to your data-source file

const resetDatabase = async () => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.dropDatabase();
    await AppDataSource.runMigrations();
    console.log("Database reset successfully.");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error resetting database:", error);
    process.exit(1);
  }
};

resetDatabase();
