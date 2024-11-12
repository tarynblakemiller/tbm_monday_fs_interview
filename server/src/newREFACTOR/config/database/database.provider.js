import { Sequelize } from "sequelize";
import { dbConfig } from "./database.config.js";

export const createDatabaseConnection = async () => {
  const dbConfig = createDatabaseConfig();
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );

  return sequelize;
};

export const initializeDatabase = async (sequelize) => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    return sequelize;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
};
