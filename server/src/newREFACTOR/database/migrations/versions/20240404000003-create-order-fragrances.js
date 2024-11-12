import { orderFragranceSchema } from "../../schemas/orderFragranceSchema.js";

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("order_fragrances", orderFragranceSchema);

  await queryInterface.addIndex("order_fragrances", ["order_id"]);
  await queryInterface.addIndex("order_fragrances", ["fragrance_id"]);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("order_fragrances");
};
