// src/db/seed.js
import sequelize from "../src/config/database";

const seedFragrances = async () => {
  try {
    // First, drop existing table if it exists and create new one
    await sequelize.query(`
      DROP TABLE IF EXISTS fragrances CASCADE;
      
      CREATE TABLE fragrances (
        id SERIAL PRIMARY KEY,
        fragrance_id VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        category VARCHAR(50),
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert seed data
    const result = await sequelize.query(`
      INSERT INTO fragrances (
        fragrance_id,
        name,
        description,
        category,
        image_url
      ) VALUES
        (
          'FRAG-001',
          'Vanilla Dreams',
          'A warm and sweet vanilla fragrance with hints of amber and musk',
          'Oriental',
          'https://example.com/images/vanilla-dreams.jpg'
        ),
        (
          'FRAG-002',
          'Ocean Breeze',
          'Fresh aquatic scent with notes of sea salt and coastal flowers',
          'Marine',
          'https://example.com/images/ocean-breeze.jpg'
        ),
        (
          'FRAG-003',
          'Forest Pine',
          'Woody fragrance featuring pine needles and cedar',
          'Woody',
          'https://example.com/images/forest-pine.jpg'
        ),
        (
          'FRAG-004',
          'Lavender Fields',
          'Calming lavender blend with bergamot and chamomile',
          'Floral',
          'https://example.com/images/lavender-fields.jpg'
        ),
        (
          'FRAG-005',
          'Citrus Burst',
          'Energizing blend of lemon, orange, and grapefruit',
          'Citrus',
          'https://example.com/images/citrus-burst.jpg'
        )
      RETURNING id, fragrance_id, name;
    `);

    console.log("Seeded fragrances:", result.rows);

    // Create orders table
    await sequelize.query(`
      DROP TABLE IF EXISTS orders CASCADE;
      
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        fragrance_id VARCHAR(20) NOT NULL,
        quantity INTEGER NOT NULL,
        status VARCHAR(50) NOT NULL,
        monday_item_id VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (fragrance_id) REFERENCES fragrances(fragrance_id)
      );
    `);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection
    await sequelize.end();
  }
};

// Run the seed function
seedFragrances();
