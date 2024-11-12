import { orderSchema } from "../../schemas/orderSchema.js";

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("orders", orderSchema);

  // Add indexes
  await queryInterface.addIndex("orders", ["order_status"]);
  await queryInterface.addIndex("orders", ["client_email"]);
  await queryInterface.addIndex("orders", ["monday_item_id"]);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("orders");
};
