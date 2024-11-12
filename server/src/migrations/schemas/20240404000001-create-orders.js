export async function up(queryInterface, { DataTypes }) {
  await queryInterface.createTable("orders", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.STRING,
    },
    order_number: {
      type: DataTypes.STRING,
    },
    monday_item_id: {
      type: DataTypes.STRING,
    },
    client_first_name: {
      type: DataTypes.STRING,
    },
    client_last_name: {
      type: DataTypes.STRING,
    },
    client_email: {
      type: DataTypes.STRING,
    },
    client_phone: {
      type: DataTypes.STRING,
    },
    client_shipping_address: {
      type: DataTypes.TEXT,
    },
    order_status: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    sales_associate: {
      type: DataTypes.STRING,
    },
    inscription_request: {
      type: DataTypes.TEXT,
    },
    order_creation_date: {
      type: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: queryInterface.sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: queryInterface.sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  await queryInterface.addIndex("orders", ["monday_item_id"], {
    name: "orders_monday_item_id_idx",
  });
  await queryInterface.addIndex("orders", ["order_status"], {
    name: "orders_status_idx",
  });
  await queryInterface.addIndex("orders", ["order_number"], {
    name: "orders_number_idx",
  });
}

export async function down(queryInterface) {
  await queryInterface.removeIndex("orders", "orders_monday_item_id_idx");
  await queryInterface.removeIndex("orders", "orders_status_idx");
  await queryInterface.removeIndex("orders", "orders_number_idx");
  await queryInterface.dropTable("orders");
}
