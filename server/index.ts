import app from "@/app";
import dotenv from "dotenv";
import { db } from "./src/config/database/index";
const mondaySdk = require("monday-sdk-js/dist/monday-sdk-server");
import { initializeDatabase } from "@/config/init";
import { MondayClient } from "./src/types/monday.types";
import { env } from "@/types/environment.types";

dotenv.config();
const PORT = env.PORT;

export const mondayClient: MondayClient = mondaySdk();
mondayClient.setToken(process.env.MONDAY_API_TOKEN || "");
mondayClient.setApiVersion("2024-10");

const startServer = async (): Promise<void> => {
  try {
    await db.sequelize.query("DROP SCHEMA public CASCADE;");
    await db.sequelize.query("CREATE SCHEMA public;");
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: true });
    await initializeDatabase();

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
