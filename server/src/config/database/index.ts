import { Sequelize } from "sequelize";
import { env } from "./config";
import { Database, DatabaseConfig } from "./types";
import { Fragrance } from "../../models/fragrance.model";

const dbConfig: DatabaseConfig = {
  dialect: "postgres",
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USER,
  password: env.DATABASE.PASSWORD,
  database: env.DATABASE.NAME,
  logging: env.NODE_ENV === "development" ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
  },
};

const createDatabase = (): Database => {
  const sequelize = new Sequelize(dbConfig);

  Fragrance.initialize(sequelize);

  return {
    sequelize,
    Sequelize,
    models: {
      Fragrance,
    },
    connect: async () => {
      await sequelize.authenticate();
    },
    disconnect: async () => {
      await sequelize.close();
    },
  };
};

export const db = createDatabase();
