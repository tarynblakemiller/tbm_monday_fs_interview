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
      category: "Fresh",
      image_url: "https://example.com/images/ocean-breeze.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-003",
      name: "Cedar Grove",
      description: "Rich woody fragrance with cedar and sandalwood notes",
      category: "Woody",
      image_url: "https://example.com/images/cedar-grove.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-004",
      name: "Rose Garden",
      description: "Classic floral blend with rose, jasmine and lily",
      category: "Floral",
      image_url: "https://example.com/images/rose-garden.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-005",
      name: "Mediterranean Citrus",
      description: "Bright blend of lemon, bergamot and orange zest",
      category: "Citrus",
      image_url: "https://example.com/images/citrus-blend.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-006",
      name: "Smoky Oud",
      description: "Deep, mysterious blend of oud wood and smoked vanilla",
      category: "Smokey",
      image_url: "https://example.com/images/smoky-oud.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-007",
      name: "Berry Bouquet",
      description: "Sweet blend of strawberry, raspberry and blackberry",
      category: "Fruity",
      image_url: "https://example.com/images/berry-bouquet.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-008",
      name: "Garden Herbs",
      description: "Fresh blend of basil, rosemary and thyme",
      category: "Herbaceous",
      image_url: "https://example.com/images/garden-herbs.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-009",
      name: "Pine Forest",
      description: "Crisp blend of pine needles and forest air",
      category: "Woody",
      image_url: "https://example.com/images/pine-forest.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fragrance_id: "FRAG-010",
      name: "Wild Herbs",
      description: "Complex blend of wild sage, lavender and mint",
      category: "Herbaceous",
      image_url: "https://example.com/images/wild-herbs.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("fragrances", null, {});
}
