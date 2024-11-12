// 20240404000001-orders.js
function generateOrderData(index) {
  const paddedIndex = String(index + 1).padStart(3, "0");
  return {
    id: `${index + 1}`.padStart(32, "1"), // Generate UUID-like string
    order_id: `ORD-${paddedIndex}`,
    order_number: `ON-${paddedIndex}`,
  };
}

export async function up(queryInterface, Sequelize) {
  const orderData = [
    {
      monday_item_id: "item_1",
      client_first_name: "John",
      client_last_name: "Doe",
      client_email: "john.doe@example.com",
      client_phone: "555-0100",
      client_shipping_address: "123 Main St, City, ST 12345",
      order_status: "NEW",
      quantity: 3,
      sales_associate: "Alice Smith",
      inscription_request: "Happy Birthday Mom!",
    },
    {
      monday_item_id: "item_2",
      client_first_name: "Jane",
      client_last_name: "Smith",
      client_email: "jane.smith@example.com",
      client_phone: "555-0200",
      client_shipping_address: "456 Oak Ave, City, ST 12345",
      order_status: "IN_PROGRESS",
      quantity: 2,
      sales_associate: "Bob Jones",
      inscription_request: "Congratulations on your new home!",
    },
  ];

  const ordersWithIds = orderData.map((order, index) => ({
    ...generateOrderData(index),
    ...order,
    order_creation_date: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  }));

  await queryInterface.bulkInsert("orders", ordersWithIds);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("orders", null, {});
}
