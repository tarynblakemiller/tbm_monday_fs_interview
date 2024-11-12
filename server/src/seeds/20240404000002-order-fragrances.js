export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("order_fragrances", [
    {
      order_id: "1".padStart(32, "1"),
      fragrance_id: "1",
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      order_id: "1".padStart(32, "1"),
      fragrance_id: "2",
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      order_id: "1".padStart(32, "1"),
      fragrance_id: "3",
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      order_id: "2".padStart(32, "1"),
      fragrance_id: "4",
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      order_id: "2".padStart(32, "1"),
      fragrance_id: "5",
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("order_fragrances", null, {});
}
