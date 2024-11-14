import mondaySdk from "monday-sdk-js";
import dotenv from "dotenv";

dotenv.config();

const monday = mondaySdk();
monday.setToken(process.env.MONDAY_API_TOKEN);

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  DATABASE: {
    HOST: process.env.DB_HOST || "localhost",
    PORT: Number(process.env.DB_PORT) || 5432,
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME || "fragrance_db",
  },
  MONDAY: {
    API_URL: process.env.MONDAY_API_URL,
    MONDAY_API_TOKEN: process.env.MONDAY_API_TOKEN,
    MONDAY_BOARD_ID: process.env.MONDAY_BOARD_ID,
  },
};
