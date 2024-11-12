export async function up(queryInterface, { DataTypes }) {
  await queryInterface.createTable("order_fragrances", {
    order_id: {
      type: DataTypes.STRING,
      references: {
        model: "orders",
        key: "id",
      },
    },
    fragrance_id: {
      type: DataTypes.STRING,
      references: {
        model: "fragrances",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: queryInterface.sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: queryInterface.sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("order_fragrances");
}
