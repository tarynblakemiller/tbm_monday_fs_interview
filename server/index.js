import app from "./src/app.js";
import dotenv from "dotenv";
import { initializeDatabase } from "./src/config/database.js";
import db from "./src/config/database.js";
import mondaySdk from "monday-sdk-js";

dotenv.config();
const PORT = process.env.PORT || 8080;

export const mondayClient = mondaySdk();
mondayClient.setToken(process.env.MONDAY_API_TOKEN);
mondayClient.setApiVersion("2024-10");

const startServer = async () => {
  try {
    await initializeDatabase();

    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");

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
