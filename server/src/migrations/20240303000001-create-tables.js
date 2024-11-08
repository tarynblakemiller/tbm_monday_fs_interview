async function createTables(sequelize) {
  try {
    // Create fragrances table with string ID
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS fragrances (
        id VARCHAR(255) PRIMARY KEY,
        fragrance_id VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        image_url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create orders table with string ID
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(255) PRIMARY KEY,
        order_id VARCHAR(255) UNIQUE NOT NULL,
        sales_associate VARCHAR(255),
        inscription_request TEXT,
        order_status VARCHAR(255) DEFAULT 'NEW',
        order_number VARCHAR(255),
        quantity INTEGER NOT NULL,
        order_creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        client_first_name VARCHAR(255) NOT NULL,
        client_last_name VARCHAR(255) NOT NULL,
        client_shipping_address TEXT,
        client_email VARCHAR(255) NOT NULL,
        client_phone VARCHAR(255),
        monday_item_id VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create junction table with string references
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS order_fragrances (
        order_id VARCHAR(255) REFERENCES orders(id) ON DELETE CASCADE,
        fragrance_id VARCHAR(255) REFERENCES fragrances(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 1,
        price_at_time DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (order_id, fragrance_id)
      );

      CREATE INDEX IF NOT EXISTS idx_order_fragrances_order_id ON order_fragrances(order_id);
      CREATE INDEX IF NOT EXISTS idx_order_fragrances_fragrance_id ON order_fragrances(fragrance_id);
    `);

    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
}

export { createTables };
