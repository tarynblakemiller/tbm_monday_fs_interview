import { Sequelize, QueryInterface } from "sequelize";
import { up as seedFragrances } from "../migrations/seeders/20240404000000-fragrances";

interface MigrationRunner {
  sequelize: Sequelize;
  runSeeders?: boolean;
}

export const runMigrations = async ({
  sequelize,
  runSeeders = false,
}: MigrationRunner): Promise<void> => {
  const queryInterface: QueryInterface = sequelize.getQueryInterface();

  try {
    if (runSeeders) {
      console.log("Running seeders...");
      await seedFragrances(queryInterface);
      console.log("Seeders completed successfully");
    }
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
};
