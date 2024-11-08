export const seedOrderFragrance = async (client) => {
  console.log("Starting order-fragrance association seeding...");

  try {
    // Get available fragrances and orders
    const fragrancesResult = await client.query(
      "SELECT id FROM fragrances ORDER BY id"
    );
    const ordersResult = await client.query(
      "SELECT id FROM orders ORDER BY id"
    );

    console.log("Available fragrances:", fragrancesResult.rows);
    console.log("Available orders:", ordersResult.rows);

    if (fragrancesResult.rows.length === 0 || ordersResult.rows.length === 0) {
      throw new Error("Missing required data in fragrances or orders tables");
    }

    const firstOrderId = ordersResult.rows[0].id;
    const secondOrderId = ordersResult.rows[1]?.id; // Added optional chaining

    // Verify we have enough orders
    if (!secondOrderId) {
      throw new Error("Need at least 2 orders for seeding relationships");
    }

    const fragranceIds = fragrancesResult.rows.slice(0, 3).map((row) => row.id);

    // Verify we have enough fragrances
    if (fragranceIds.length < 3) {
      throw new Error("Need at least 3 fragrances for seeding relationships");
    }

    const query = `
      INSERT INTO order_fragrances (order_id, fragrance_id)
      VALUES 
        ($1, $2),
        ($3, $4),
        ($5, $6)
      ON CONFLICT (order_id, fragrance_id) DO NOTHING
      RETURNING *;
    `;

    const values = [
      firstOrderId,
      fragranceIds[0],
      firstOrderId,
      fragranceIds[1],
      secondOrderId,
      fragranceIds[2],
    ];

    console.log("Inserting associations with values:", values);

    const result = await client.query(query, values);
    console.log("Created associations:", result.rows);

    // Verify the relationships were created
    const verificationQuery = `
      SELECT 
        o.id as order_id,
        f.id as fragrance_id,
        f.name as fragrance_name
      FROM orders o
      JOIN order_fragrances of ON o.id = of.order_id
      JOIN fragrances f ON of.fragrance_id = f.id
      WHERE o.id IN ($1, $2)
      ORDER BY o.id, f.id;
    `;

    const verification = await client.query(verificationQuery, [
      firstOrderId,
      secondOrderId,
    ]);
    console.log("Verified relationships:", verification.rows);

    return result.rows;
  } catch (err) {
    console.error("Error in seedOrderFragrance:", err);
    throw err;
  }
};
