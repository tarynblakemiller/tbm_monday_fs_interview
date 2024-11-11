export const seedOrders = async (client) => {
  console.log("Starting order seeding...");

  const generateOrderId = (index) => `ORD-${Date.now()}-${index + 1}`;

  const query = `
    INSERT INTO orders (
      order_id,
      sales_associate,
      inscription_request,
      order_status,
      order_number,
      quantity,
      order_creation_date,
      client_first_name,
      client_last_name,
      client_shipping_address,
      client_email,
      client_phone
    ) VALUES 
      (
        $1,
        'John Smith',
        'Happy Birthday Mom!',
        'pending',
        'ORD-2024-001',
        2,
        CURRENT_TIMESTAMP,
        'Alice',
        'Johnson',
        '123 Main St, Apt 4B, New York, NY 10001',
        'alice.j@email.com',
        '212-555-0101'
      ),
      (
        $2,
        'Sarah Wilson',
        'Congratulations on your graduation!',
        'processing',
        'ORD-2024-002',
        1,
        CURRENT_TIMESTAMP,
        'Michael',
        'Brown',
        '456 Oak Ave, Chicago, IL 60601',
        'mbrown@email.com',
        '312-555-0202'
      )
    RETURNING id, order_id, client_first_name, client_last_name;
  `;

  try {
    const values = [generateOrderId(0), generateOrderId(1)];
    const result = await client.query(query, values);
    console.log("Inserted orders:", result.rows);
    return result.rows;
  } catch (err) {
    console.error("Error in seedOrders:", err);
    throw err;
  }
};
