import { Sequelize, Model, DataTypes } from "sequelize";
import { env } from "./environment.js";
import { runMigrations } from "../migrations/index.js";

const dbConfig = {
  development: {
    dialect: "postgres",
    host: env.DB_HOST || "localhost",
    port: Number(env.DB_PORT) || 5432,
    username: env.DB_USER || "postgres",
    password: env.DB_PASSWORD || "password",
    database: env.DB_NAME || "fragrance_db",
    logging: console.log,
    define: {
      underscored: true,
      timestamps: true,
    },
  },
  production: {
    dialect: "postgres",
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    logging: false,
    define: {
      underscored: true,
      timestamps: true,
    },
  },
};

const environment = process.env.NODE_ENV || "development";
const config = dbConfig[environment];

if (!config) {
  throw new Error(`Configuration for environment '${environment}' not found!`);
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

class Fragrance extends Model {
  static associate(models) {}
}

Fragrance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fragrance_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Fragrance",
    tableName: "fragrances",
    underscored: true,
  }
);

export const initializeDatabase = async () => {
  try {
    await sequelize.query("DROP SCHEMA public CASCADE;");
    await sequelize.query("CREATE SCHEMA public;");

    await sequelize.authenticate();
    console.log("Database connected successfully");

    console.log("Running migrations and seeds...");
    await runMigrations(sequelize, true);

    console.log("Database initialization completed successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
};
const db = {};

db.Fragrance = Fragrance;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.initializeDatabase = initializeDatabase;

export default db;
