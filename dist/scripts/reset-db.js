"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../src/database/data-source"); // Adjust the path to your data-source file
const resetDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.AppDataSource.initialize();
        yield data_source_1.AppDataSource.dropDatabase();
        yield data_source_1.AppDataSource.runMigrations();
        console.log("Database reset successfully.");
        yield data_source_1.AppDataSource.destroy();
    }
    catch (error) {
        console.error("Error resetting database:", error);
        process.exit(1);
    }
});
resetDatabase();
//# sourceMappingURL=reset-db.js.map