import db from "../config/database";

export const getFragrances = async () => {
  return await db.Fragrance.findAll();
};

// export const createFragranceService = (model) => {
//   const findAll = () => model.findAll();

//   const findById = (id) => model.findByPk(id);

//   const create = (data) => model.create(data);

//   const update = async (id, data) => {
//     const fragrance = await findById(id);
//     return fragrance ? fragrance.update(data) : null;
//   };

//   const remove = async (id) => {
//     const fragrance = await findById(id);
//     return fragrance ? (await fragrance.destroy(), true) : false;
//   };

//   return Object.freeze({
//     findAll,
//     findById,
//     create,
//     update,
//     remove,
//   });
// };
