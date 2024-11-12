import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readdirSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const runMigrations = async (sequelize, options = {}) => {
  const queryInterface = sequelize.getQueryInterface();
  const migrationsPath = join(__dirname, "versions");

  try {
    console.log("Running migrations...");
    const migrationFiles = readdirSync(migrationsPath)
      .filter((file) => file.endsWith(".js"))
      .sort();

    for (const file of migrationFiles) {
      const { up, down } = await import(join(migrationsPath, file));
      const migrationName = file.replace(".js", "");

      console.log(`Running migration: ${migrationName}`);

      if (options.direction === "down") {
        await down(queryInterface, sequelize);
        console.log(`Reverted migration: ${migrationName}`);
      } else {
        await up(queryInterface, sequelize);
        console.log(`Applied migration: ${migrationName}`);
      }
    }

    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
};
