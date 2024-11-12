import { env } from "../environment.js";

export const createDatabaseConfig = () => {
  const baseConfig = {
    dialect: "postgres",
    define: {
      underscored: true,
      timestamps: true,
    },
  };

  const configs = {
    development: {
      ...baseConfig,
      host: env.DATABASE.HOST,
      port: env.DATABASE.PORT,
      username: env.DATABASE.USER,
      password: env.DATABASE.PASSWORD,
      database: env.DATABASE.NAME,
      logging: console.log,
    },
    production: {
      ...baseConfig,
      host: env.DATABASE.HOST,
      port: env.DATABASE.PORT,
      username: env.DATABASE.USER,
      password: env.DATABASE.PASSWORD,
      database: env.DATABASE.NAME,
      logging: false,
    },
  };

  const environment = env.NODE_ENV;
  const config = configs[environment];

  if (!config) {
    throw new Error(
      `Configuration for environment '${environment}' not found!`
    );
  }

  return config;
};
