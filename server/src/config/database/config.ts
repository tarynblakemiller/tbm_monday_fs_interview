import dotenv from "dotenv";
import mondaySdk from "monday-sdk-js";
import {
  Environment,
  DatabaseEnvConfig,
  MondayEnvConfig,
} from "../environment/types";

dotenv.config();

export const monday = mondaySdk();
if (!process.env.MONDAY_API_TOKEN) {
  throw new Error("MONDAY_API_TOKEN is required");
}
monday.setToken(process.env.MONDAY_API_TOKEN);

const database: DatabaseEnvConfig = {
  HOST: process.env.DB_HOST || "localhost",
  PORT: Number(process.env.DB_PORT) || 5432,
  USER: process.env.DB_USER || "postgres",
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME || "postgres",
};

const mondayConfig: MondayEnvConfig = {
  API_URL: process.env.MONDAY_API_URL,
  MONDAY_API_TOKEN: process.env.MONDAY_API_TOKEN,
  MONDAY_BOARD_ID: process.env.MONDAY_BOARD_ID,
};

export const env: Environment = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5173,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  DATABASE: database,
  MONDAY: mondayConfig,
};
