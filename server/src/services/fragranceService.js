import db from "../config/database";
// import { Fragrance } from "../models";

export const getFragrances = async () => {
  return await db.Fragrance.findAll();
};

export const fragranceService = {
  async createFragrance(fragranceData) {
    return await Fragrance.create(fragranceData);
  },

  async getAllFragrances() {
    return await Fragrance.findAll({
      where: { isActive: true },
    });
  },

  async getFragranceById(id) {
    return await Fragrance.findByPk(id);
  },

  async updateFragrance(id, updateData) {
    const fragrance = await Fragrance.findByPk(id);
    if (!fragrance) throw new Error("Fragrance not found");
    return await fragrance.update(updateData);
  },

  async deleteFragrance(id) {
    const fragrance = await Fragrance.findByPk(id);
    if (!fragrance) throw new Error("Fragrance not found");
    return await fragrance.update({ isActive: false });
  },
};
