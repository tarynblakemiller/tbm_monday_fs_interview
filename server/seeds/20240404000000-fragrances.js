export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("fragrances", [
    {
      fragrance_id: "FRAG-001",
      name: "Vanilla Dreams",
      description:
        "A warm and sweet vanilla fragrance with hints of amber and musk",
      category: "Sweet",
      image_url: "https://example.com/images/vanilla-dreams.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-002",
      name: "Ocean Breeze",
      description:
        "Fresh aquatic scent with notes of sea salt and coastal flowers",
      category: "Marine",
      image_url: "https://example.com/images/ocean-breeze.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-003",
      name: "Forest Pine",
      description: "Woody fragrance featuring pine needles and cedar",
      category: "Woody",
      image_url: "https://example.com/images/forest-pine.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-004",
      name: "Lavender Fields",
      description: "Calming lavender blend with bergamot and chamomile",
      category: "Floral",
      image_url: "https://example.com/images/lavender-fields.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-005",
      name: "Citrus Burst",
      description: "Energizing blend of lemon, orange, and grapefruit",
      category: "Citrus",
      image_url: "https://example.com/images/citrus-burst.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("fragrances", null, {});
}
