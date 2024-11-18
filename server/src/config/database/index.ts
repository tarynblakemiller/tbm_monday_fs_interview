import { Sequelize, DataTypes } from "sequelize";
import { DatabaseConfig, Database } from "./types";
import { env } from "../environment";

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
