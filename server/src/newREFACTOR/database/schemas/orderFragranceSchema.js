import { DataTypes } from "sequelize";

export const orderFragranceSchema = {
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "orders",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  fragrance_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "fragrances",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price_at_time: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};
