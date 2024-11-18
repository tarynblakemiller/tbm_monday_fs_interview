export interface DatabaseConfig {
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD: string | undefined;
  NAME: string;
}

export interface MondayConfig {
  API_URL: string | undefined;
  MONDAY_API_TOKEN: string | undefined;
  MONDAY_BOARD_ID: string | undefined;
}

export interface Environment {
  NODE_ENV: string;
  PORT: number;
  CLIENT_URL: string;
  DATABASE: DatabaseConfig;
  MONDAY: MondayConfig;
}
