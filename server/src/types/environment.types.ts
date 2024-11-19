import {
  Environment,
  DatabaseEnvConfig,
  MondayEnvConfig,
} from "../config/database/types";

const database: DatabaseEnvConfig = {
  HOST: process.env.DB_HOST || "localhost",
  PORT: Number(process.env.DB_PORT) || 5432,
  USER: process.env.DB_USER || "postgres",
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME || "postgres",
};

const monday: MondayEnvConfig = {
  API_URL: process.env.MONDAY_API_URL,
  MONDAY_API_TOKEN: process.env.MONDAY_API_TOKEN,
  MONDAY_BOARD_ID: process.env.MONDAY_BOARD_ID,
};

export const env: Environment = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  DATABASE: database,
  MONDAY: monday,
};
