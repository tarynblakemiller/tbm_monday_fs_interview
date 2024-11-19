import { Model, DataTypes, Sequelize } from "sequelize";
import {
  IFragranceData,
  IFragranceComplete,
} from "@/migrations/types/fragrance";
export class Fragrance
  extends Model<IFragranceComplete, IFragranceData>
  implements IFragranceComplete
{
  declare id: string;
  declare fragrance_id: string;
  declare name: string;
  declare description: string;
  declare category: string;
  declare image_url: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  static generateIds(
    index: number
  ): Pick<IFragranceComplete, "id" | "fragrance_id"> {
    const paddedIndex = String(index + 1).padStart(3, "0");
    return {
      id: String(index + 1),
      fragrance_id: `FRAG-${paddedIndex}`,
    };
  }

  static initialize(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
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
        timestamps: true,
      }
    );
  }
}
