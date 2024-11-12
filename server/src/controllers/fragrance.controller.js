import db from "../config/database.js";
const { Fragrance } = db;

export const fragranceController = {
  getFragrances: async (req, res) => {
    try {
      const fragrances = await Fragrance.findAll();
      res.json(fragrances);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFragrance: async (req, res) => {
    try {
      const fragrance = await Fragrance.findByPk(req.params.id);
      if (!fragrance)
        return res.status(404).json({ error: "Fragrance not found" });
      res.json(fragrance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createFragrance: async (req, res) => {
    try {
      const fragrance = await Fragrance.create(req.body);
      res.status(201).json(fragrance);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateFragrance: async (req, res) => {
    try {
      const [updated] = await Fragrance.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated)
        return res.status(404).json({ error: "Fragrance not found" });
      const fragrance = await Fragrance.findByPk(req.params.id);
      res.json(fragrance);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteFragrance: async (req, res) => {
    try {
      const deleted = await Fragrance.destroy({
        where: { id: req.params.id },
      });
      if (!deleted)
        return res.status(404).json({ error: "Fragrance not found" });
      res.json({ message: "Fragrance deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
