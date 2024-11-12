import { DataTypes } from "sequelize";
import { up as createBaseSchema } from "./schemas/20240404000000-create-base-schema.js";
import { up as createOrders } from "./schemas/20240404000001-create-orders.js";
import { up as createOrderFragrances } from "./schemas/20240404000002-create-order-fragrances.js"; // Add this
import { up as seedFragrances } from "../seeds/20240404000000-fragrances.js";
import { up as seedOrders } from "../seeds/20240404000001-orders.js";
import { up as seedOrderFragrances } from "../seeds/20240404000002-order-fragrances.js";

export const runMigrations = async (sequelize, runSeeders = false) => {
  const queryInterface = sequelize.getQueryInterface();
  const Sequelize = { DataTypes };

  try {
    // Run migrations in order
    await createBaseSchema(queryInterface, Sequelize);
    await createOrders(queryInterface, Sequelize);
    await createOrderFragrances(queryInterface, Sequelize); // Add this
    console.log("Base schema migrations completed successfully");

    if (runSeeders) {
      console.log("Running seeders...");
      await seedFragrances(queryInterface, Sequelize);
      await seedOrders(queryInterface, Sequelize);
      await seedOrderFragrances(queryInterface, Sequelize);
      console.log("Seeders completed successfully");
    }
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
};
