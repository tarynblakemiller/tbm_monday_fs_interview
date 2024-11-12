import { fragranceData } from "../data/fragranceData.js";

export const seedFragrances = async (queryInterface) => {
  try {
    console.log("Seeding fragrances...");
    const fragrances = await queryInterface.bulkInsert(
      "fragrances",
      fragranceData,
      { returning: true }
    );
    console.log(`Seeded ${fragrances.length} fragrances`);
    return fragrances;
  } catch (error) {
    console.error("Error seeding fragrances:", error);
    throw error;
  }
};
