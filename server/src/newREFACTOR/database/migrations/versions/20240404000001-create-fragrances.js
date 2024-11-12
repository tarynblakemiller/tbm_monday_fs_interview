import { fragranceSchema } from "../../schemas/fragranceSchema.js";

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("fragrances", fragranceSchema);

  // Add indexes
  await queryInterface.addIndex("fragrances", ["category"]);
  await queryInterface.addIndex("fragrances", ["fragrance_id"], {
    unique: true,
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("fragrances");
};
