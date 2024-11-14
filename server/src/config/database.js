import { Sequelize, Model, DataTypes } from "sequelize";
import { env } from "./environment.js";

const dbConfig = {
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

const sequelize = new Sequelize(dbConfig);

class Fragrance extends Model {}
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

const db = {
  Fragrance,
  sequelize,
  Sequelize,
};

export default db;
