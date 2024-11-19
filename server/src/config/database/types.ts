import { Options, Sequelize } from "sequelize";
import { Fragrance } from "@/models/fragrance.model";

export interface DatabaseConfig extends Options {
  dialect: "postgres";
  host: string;
  port: number;
  username: string;
  password?: string;
  database: string;
  logging: boolean | ((sql: string) => void);
  define: {
    underscored: boolean;
    timestamps: boolean;
  };
}

export interface ModelDefinition {
  name: string;
  attributes: Record<string, any>;
  options: Record<string, any>;
}

export interface Database {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  models: {
    Fragrance: typeof Fragrance;
  };
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
export interface DatabaseOperations extends Database {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  registerModel: (definition: ModelDefinition) => void;
}
