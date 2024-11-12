// src/database/seeders/index.js
import { seedFragrances } from "./runners/fragranceSeeder.js";
import { seedOrders } from "./runners/orderSeeder.js";
import { seedOrderFragrances } from "./runners/orderFragranceSeeder.js";

export const runSeeders = async (sequelize) => {
  const queryInterface = sequelize.getQueryInterface();

  try {
    await sequelize.transaction(async (transaction) => {
      console.log("Starting database seeding...");

      // Clear existing data
      await queryInterface.bulkDelete("order_fragrances", null, {
        transaction,
      });
      await queryInterface.bulkDelete("orders", null, { transaction });
      await queryInterface.bulkDelete("fragrances", null, { transaction });

      // Run seeders in order
      const fragrances = await seedFragrances(queryInterface, { transaction });
      const orders = await seedOrders(queryInterface, { transaction });
      await seedOrderFragrances(queryInterface, orders, fragrances, {
        transaction,
      });

      console.log("Database seeding completed successfully");
    });
  } catch (error) {
    console.error("Database seeding failed:", error);
    throw error;
  }
};

// Utility to run seeders from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const sequelize = await createDatabaseConnection();

  runSeeders(sequelize)
    .then(() => {
      console.log("Seeding completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}
