// src/scripts/initDb.js
import { createDatabaseConnection } from "../config/database/database.providers.js";
import { runMigrations } from "../database/migrations/index.js";
import { runSeeders } from "../database/seeders/index.js";

const initializeDatabase = async () => {
  let sequelize;

  try {
    // Create database connection
    sequelize = await createDatabaseConnection();

    // Run migrations
    console.log("Running migrations...");
    await runMigrations(sequelize);

    // Run seeders
    console.log("Running seeders...");
    await runSeeders(sequelize);

    console.log("Database initialization completed successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  } finally {
    if (sequelize) {
      await sequelize.close();
    }
  }
};

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  initializeDatabase()
    .then(() => {
      console.log("Database setup completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Database setup failed:", error);
      process.exit(1);
    });
}

export default initializeDatabase;
