import { createOrderFragranceRelations } from "../data/orderFragranceData.js";

export const seedOrderFragrances = async (
  queryInterface,
  orders,
  fragrances
) => {
  try {
    console.log("Seeding order-fragrance relations...");
    const relations = createOrderFragranceRelations(orders, fragrances);

    const orderFragrances = await queryInterface.bulkInsert(
      "order_fragrances",
      relations,
      { returning: true }
    );

    console.log(`Seeded ${orderFragrances.length} order-fragrance relations`);
    return orderFragrances;
  } catch (error) {
    console.error("Error seeding order-fragrance relations:", error);
    throw error;
  }
};
