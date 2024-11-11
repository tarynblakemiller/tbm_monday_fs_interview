import db from "../config/database.js";
const { Fragrance } = db;
// import { mondayService } from "../services/monday.service.js";

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

// export const syncCategoriesToMonday = async (req, res) => {
//   try {
//     const fragrances = await Fragrance.findAll();

//     // Check if fragrances exist
//     if (!fragrances || !Array.isArray(fragrances)) {
//       throw new Error("No fragrances found or invalid data");
//     }

//     // Check if each fragrance has a category before mapping
//     const categories = [
//       ...new Set(
//         fragrances
//           .filter((f) => f && f.category) // Only process fragrances with categories
//           .map((f) => f.category)
//       ),
//     ];

//     // Verify we have categories before calling the service
//     if (!categories.length) {
//       throw new Error("No valid categories found");
//     }

//     const result = await mondayService.updateDropdownOptions(
//       process.env.MONDAY_BOARD_ID,
//       "dropdown",
//       categories
//     );

//     res.json({
//       success: true,
//       categories,
//       mondayResult: result,
//     });
//   } catch (error) {
//     console.error("Error syncing categories:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
