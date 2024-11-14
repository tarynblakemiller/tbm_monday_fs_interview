import app from "./src/app.js";
import dotenv from "dotenv";
import db from "./src/config/database.js";
import mondaySdk from "monday-sdk-js";
import { runMigrations } from "./src/migrations/index.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

export const mondayClient = mondaySdk();
mondayClient.setToken(process.env.MONDAY_API_TOKEN);
mondayClient.setApiVersion("2024-10");

const startServer = async () => {
  try {
    await db.sequelize.query("DROP SCHEMA public CASCADE;");
    await db.sequelize.query("CREATE SCHEMA public;");
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: true });
    await runMigrations(db.sequelize, true);

    app.listen(PORT, () => {
      console.log("\n🚀 Server is ready!");
      console.log(`Running on port ${PORT}`);
      console.log("\nAvailable endpoints:");
      console.log(`- http://localhost:${PORT}/`);
      console.log(`- http://localhost:${PORT}/health`);
      console.log(`- http://localhost:${PORT}/api/fragrances`);
      console.log(`- http://localhost:${PORT}/api/orders`);
      console.log(`- http://localhost:${PORT}/api/orders/local`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
