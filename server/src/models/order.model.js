import { Model, DataTypes } from "sequelize";

export class Order extends Model {
  static initialize(sequelize) {
    return super.init(
      {
        order_id: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        monday_item_id: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: true,
        },
        monday_board_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        client_first_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        client_last_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        client_email: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            isEmail: true,
          },
        },
        client_phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        client_shipping_address: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        // Order Details
        order_status: {
          type: DataTypes.STRING,
          defaultValue: "NEW",
        },
        order_number: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: true,
          validate: {
            min: 1,
            max: 3,
          },
        },
        order_creation_date: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        // Additional Info
        sales_associate: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        inscription_request: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        underscored: true,
        timestamps: true,
        indexes: [
          {
            fields: ["monday_item_id"],
          },
          {
            fields: ["order_status"],
          },
          {
            fields: ["order_number"],
          },
        ],
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Fragrance, {
      through: models.OrderFragrances,
      foreignKey: "order_id",
      otherKey: "fragrance_id",
    });
  }
}
