import { orderData } from "../data/orderData.js";

export const seedOrders = async (queryInterface) => {
  try {
    console.log("Seeding orders...");
    const orders = await queryInterface.bulkInsert("orders", orderData, {
      returning: true,
    });
    console.log(`Seeded ${orders.length} orders`);
    return orders;
  } catch (error) {
    console.error("Error seeding orders:", error);
    throw error;
  }
};
