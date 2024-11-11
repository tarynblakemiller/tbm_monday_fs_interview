import { seedFragrances } from "./fragranceSeeder.js";
import { seedOrders } from "./orderSeeder.js";
import { seedOrderFragrances } from "./orderFragranceSeeder.js";

async function runSeeders(sequelize) {
  try {
    await seedFragrances(sequelize);
    await seedOrders(sequelize);
    await seedOrderFragrances(sequelize);
    console.log("Seeders completed successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  }
}

export { runSeeders };
