export async function up(queryInterface, { DataTypes }) {
  await queryInterface.createTable("fragrances", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    fragrance_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
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

  await queryInterface.addIndex("fragrances", ["category"], {
    name: "fragrances_category_idx",
  });
}

export async function down(queryInterface) {
  await queryInterface.removeIndex("fragrances", "fragrances_category_idx");
  await queryInterface.dropTable("fragrances");
}
