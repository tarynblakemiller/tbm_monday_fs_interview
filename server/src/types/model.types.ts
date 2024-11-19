import { Model, Optional, Sequelize } from "sequelize";
import { IFragrance } from "./fragrance.types";

export interface FragranceCreationAttributes
  extends Optional<
    IFragrance,
    "id" | "fragrance_id" | "created_at" | "updated_at"
  > {}

export interface FragranceModel
  extends Model<IFragrance, FragranceCreationAttributes>,
    IFragrance {}

export interface Database {
  Fragrance: typeof Model & {
    new (): FragranceModel;
    findOne: (args: any) => Promise<FragranceModel | null>;
    findAll: () => Promise<FragranceModel[]>;
    findByPk: (id: string) => Promise<FragranceModel | null>;
    create: (data: any) => Promise<FragranceModel>;
    update: (data: any, args: any) => Promise<[number]>;
    destroy: (args: any) => Promise<number>;
  };
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}
