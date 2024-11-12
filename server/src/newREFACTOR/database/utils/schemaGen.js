// src/database/migrations/utils/schemaHelper.js
export const createInitialSchema = async (queryInterface) => {
  await queryInterface.sequelize.query("BEGIN");

  try {
    // These will only run if tables don't exist (safety check)
    await queryInterface.sequelize.query(`
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

    await queryInterface.sequelize.query(`
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

    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS order_fragrances (
        order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
        fragrance_id UUID REFERENCES fragrances(id) ON DELETE CASCADE,  
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (order_id, fragrance_id)
      );
    `);

    await queryInterface.sequelize.query("COMMIT");
  } catch (error) {
    await queryInterface.sequelize.query("ROLLBACK");
    throw error;
  }
};
