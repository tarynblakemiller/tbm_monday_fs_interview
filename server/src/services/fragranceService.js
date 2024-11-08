import db from "../config/database";

export const getFragrances = async () => {
  return await db.Fragrance.findAll();
};
