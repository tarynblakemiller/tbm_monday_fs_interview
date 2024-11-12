import dotenv from "dotenv";

dotenv.config();

const validateEnvironment = (env) => {
  const required = [
    "NODE_ENV",
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "MONDAY_API_TOKEN",
    "MONDAY_BOARD_ID",
  ];

  const missing = required.filter((key) => !env[key]);

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(", ")}`);
  }
};

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT, 10) || 8080,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  DATABASE: {
    HOST: process.env.DB_HOST || "localhost",
    PORT: parseInt(process.env.DB_PORT, 10) || 5432,
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

validateEnvironment(process.env);
