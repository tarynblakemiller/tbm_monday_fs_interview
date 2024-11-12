// models/order_fragrances.js
import { Model, DataTypes } from "sequelize";

export class OrderFragrances extends Model {
  static initialize(sequelize) {
    return super.init(
      {
        order_id: {
          type: DataTypes.UUID,
          references: {
            model: "orders",
            key: "id",
          },
        },
        fragrance_id: {
          type: DataTypes.STRING,
          references: {
            model: "fragrances",
            key: "id",
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },
        price_at_time: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "OrderFragrances",
        tableName: "order_fragrances",
        underscored: true,
        timestamps: true,
      }
    );
  }
}
