import { up as createFragrances } from "./20240404000000-create-fragrances.js";
import { up as seedFragrances } from "../../seeds/20240404000000-fragrances.js";

export const runMigrations = async (sequelize, runSeeders = false) => {
  const queryInterface = sequelize.getQueryInterface();

  try {
    // Run migrations
    console.log("Running migrations...");
    await createFragrances(queryInterface, sequelize);
    console.log("Migrations completed successfully");

    if (runSeeders) {
      // Run seeders
      console.log("Running seeders...");
      await seedFragrances(queryInterface);
      console.log("Seeders completed successfully");
    }
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
};
