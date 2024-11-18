import { Sequelize, Model, DataTypes } from "sequelize";
import { Environment } from "./types/environment.types";
import { FragranceAttributes } from "./types/fragrance.types";
import { env } from "./environment";

interface DbConfig {
  dialect: "postgres";
  host: string;
  port: number;
  username: string;
  password: string | undefined;
  database: string;
  logging: boolean | ((sql: string) => void);
  define: {
    underscored: boolean;
    timestamps: boolean;
  };
}

const dbConfig: DbConfig = {
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

class Fragrance
  extends Model<FragranceAttributes>
  implements FragranceAttributes
{
  public id!: number;
  public fragrance_id!: string;
  public name!: string;
  public description!: string;
  public category!: string;
  public image_url!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
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

interface Database {
  Fragrance: typeof Fragrance;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db: Database = {
  Fragrance,
  sequelize,
  Sequelize,
};

export default db;
