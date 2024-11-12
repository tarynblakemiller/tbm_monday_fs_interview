import { DataTypes } from "sequelize";

export const orderSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  sales_associate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inscription_request: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  order_status: {
    type: DataTypes.STRING,
    defaultValue: "NEW",
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  client_first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  client_shipping_address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  monday_item_id: {
    type: DataTypes.STRING,
    allowNull: true,
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
