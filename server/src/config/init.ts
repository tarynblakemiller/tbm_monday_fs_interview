import { db } from "./database";
import { runMigrations } from "../migrations";

export const initializeDatabase = async () => {
  try {
    await db.connect();
    await runMigrations({
      sequelize: db.sequelize,
      runSeeders: process.env.NODE_ENV !== "production",
    });
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
};
