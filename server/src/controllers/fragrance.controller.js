import db from "../config/database.js";
const { Fragrance } = db;

export const getFragrances = async (req, res) => {
  try {
    const fragrances = await Fragrance.findAll();
    res.json(fragrances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFragrance = async (req, res) => {
  try {
    const fragrance = await Fragrance.findByPk(req.params.id);
    if (fragrance) {
      res.json(fragrance);
    } else {
      res.status(404).json({ error: "Fragrance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createFragrance = async (req, res) => {
  try {
    const fragrance = await Fragrance.create(req.body);
    res.status(201).json(fragrance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateFragrance = async (req, res) => {
  try {
    const fragrance = await Fragrance.findByPk(req.params.id);
    if (fragrance) {
      await fragrance.update(req.body);
      res.json(fragrance);
    } else {
      res.status(404).json({ error: "Fragrance not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteFragrance = async (req, res) => {
  try {
    const fragrance = await Fragrance.findByPk(req.params.id);
    if (fragrance) {
      await fragrance.destroy();
      res.json({ message: "Fragrance deleted successfully" });
    } else {
      res.status(404).json({ error: "Fragrance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
