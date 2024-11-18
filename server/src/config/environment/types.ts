declare module "monday-sdk-js";

export interface DatabaseEnvConfig {
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD: string | undefined;
  NAME: string;
}

export interface MondayEnvConfig {
  API_URL: string | undefined;
  MONDAY_API_TOKEN: string | undefined;
  MONDAY_BOARD_ID: string | undefined;
}

export interface Environment {
  NODE_ENV: string;
  PORT: number | string;
  CLIENT_URL: string;
  DATABASE: DatabaseEnvConfig;
  MONDAY: MondayEnvConfig;
}
