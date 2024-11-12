import { Model, DataTypes } from "sequelize";

export class Fragrance extends Model {
  static initialize(sequelize) {
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
        underscored: true,
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Order, {
      through: models.OrderFragrances,
      foreignKey: "fragrance_id",
      otherKey: "order_id",
    });
  }
}
