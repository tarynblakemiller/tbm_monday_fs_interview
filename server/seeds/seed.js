// seed.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
import { seedFragrances } from "./fragranceSeeder.js";
import { seedOrders } from "./seedOrders.js";
import { seedOrderFragrance } from "./seedOrderFragrance.js";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "fragrance_db",
});

const createTables = async (client) => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS fragrances (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        fragrance_id VARCHAR UNIQUE NOT NULL,
        name VARCHAR NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR NOT NULL,
        image_url VARCHAR,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id VARCHAR UNIQUE NOT NULL,  
        sales_associate VARCHAR,
        inscription_request TEXT,
        order_status VARCHAR DEFAULT 'NEW',  
        order_number VARCHAR,
        quantity INTEGER NOT NULL,
        order_creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        client_first_name VARCHAR NOT NULL, 
        client_last_name VARCHAR NOT NULL,
        client_shipping_address TEXT,
        client_email VARCHAR NOT NULL,
        client_phone VARCHAR,
        monday_item_id VARCHAR,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
  CREATE TABLE IF NOT EXISTS order_fragrances (
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    fragrance_id UUID REFERENCES fragrances(id) ON DELETE CASCADE,  
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id, fragrance_id)
  );
`);

    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};

const seedDatabase = async () => {
  const client = await pool.connect();

  try {
    console.log("Starting database seeding...");

    await client.query("BEGIN");

    await createTables(client);

    console.log("Clearing existing data...");
    // Clear in correct order due to foreign key constraints
    await client.query("DELETE FROM order_fragrances;"); // Updated table name
    await client.query("DELETE FROM orders;");
    await client.query("DELETE FROM fragrances;");
    console.log("Tables cleared");

    console.log("Seeding fragrances...");
    const fragrances = await seedFragrances(client);
    const fragranceCheck = await client.query(
      "SELECT id, name FROM fragrances ORDER BY id"
    );
    console.log("Fragrances in database:", fragranceCheck.rows);

    console.log("Seeding orders...");
    const orders = await seedOrders(client);
    const orderCheck = await client.query("SELECT id FROM orders ORDER BY id");
    console.log("Orders in database:", orderCheck.rows);

    if (orderCheck.rows.length > 0 && fragranceCheck.rows.length > 0) {
      console.log("Seeding order_fragrances relationship...");
      await seedOrderFragrance(client);

      const relationshipCheck = await client.query(`
        SELECT o.id as order_id, f.name as fragrance_name
        FROM orders o
        JOIN order_fragrances of ON o.id = of.order_id
        JOIN fragrances f ON of.fragrance_id = f.id
        ORDER BY o.id;
      `);
      console.log(
        "Order-Fragrance relationships created:",
        relationshipCheck.rows
      );
    }

    await client.query("COMMIT");
    console.log("All changes committed successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error seeding database:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
};

seedDatabase()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
