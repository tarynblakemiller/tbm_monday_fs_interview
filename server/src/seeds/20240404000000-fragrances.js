// 20240404000000-fragrances.js
function generateFragranceData(index) {
  const paddedIndex = String(index + 1).padStart(3, "0");
  return {
    id: String(index + 1),
    fragrance_id: `FRAG-${paddedIndex}`,
  };
}

export async function up(queryInterface, Sequelize) {
  const fragranceData = [
    {
      name: "Vanilla Dreams",
      description:
        "A warm and sweet vanilla fragrance with hints of amber and musk",
      category: "Sweet",
      image_url: "https://example.com/images/vanilla-dreams.jpg",
    },
    {
      name: "Ocean Breeze",
      description:
        "Fresh aquatic scent with notes of sea salt and coastal flowers",
      category: "Fresh",
      image_url: "https://example.com/images/ocean-breeze.jpg",
    },
    {
      name: "Cedar Grove",
      description: "Rich woody fragrance with cedar and sandalwood notes",
      category: "Woody",
      image_url: "https://example.com/images/cedar-grove.jpg",
    },
    {
      name: "Rose Garden",
      description: "Classic floral blend with rose, jasmine and lily",
      category: "Floral",
      image_url: "https://example.com/images/rose-garden.jpg",
    },
    {
      name: "Mediterranean Citrus",
      description: "Bright blend of lemon, bergamot and orange zest",
      category: "Citrus",
      image_url: "https://example.com/images/citrus-blend.jpg",
    },
    {
      name: "Smoky Oud",
      description: "Deep, mysterious blend of oud wood and smoked vanilla",
      category: "Smokey",
      image_url: "https://example.com/images/smoky-oud.jpg",
    },
    {
      name: "Berry Bouquet",
      description: "Sweet blend of strawberry, raspberry and blackberry",
      category: "Fruity",
      image_url: "https://example.com/images/berry-bouquet.jpg",
    },
    {
      name: "Garden Herbs",
      description: "Fresh blend of basil, rosemary and thyme",
      category: "Herbaceous",
      image_url: "https://example.com/images/garden-herbs.jpg",
    },
    {
      name: "Pine Forest",
      description: "Crisp blend of pine needles and forest air",
      category: "Woody",
      image_url: "https://example.com/images/pine-forest.jpg",
    },
    {
      name: "Wild Herbs",
      description: "Complex blend of wild sage, lavender and mint",
      category: "Herbaceous",
      image_url: "https://example.com/images/wild-herbs.jpg",
    },
  ];

  const fragrancesWithIds = fragranceData.map((fragrance, index) => ({
    ...generateFragranceData(index),
    ...fragrance,
    created_at: new Date(),
    updated_at: new Date(),
  }));

  await queryInterface.bulkInsert("fragrances", fragrancesWithIds);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("fragrances", null, {});
}
