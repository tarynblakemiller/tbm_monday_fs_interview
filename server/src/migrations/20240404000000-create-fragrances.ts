import { QueryInterface, DataTypes } from "sequelize";

interface IMigration {
  up: (
    queryInterface: QueryInterface,
    Sequelize: { DataTypes: typeof DataTypes }
  ) => Promise<void>;
  down: (
    queryInterface: QueryInterface,
    Sequelize: { DataTypes: typeof DataTypes }
  ) => Promise<void>;
}

const migration: IMigration = {
  up: async (queryInterface: QueryInterface) => {
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
        allowNull: false,
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
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("fragrances");
  },
};

export default migration;
