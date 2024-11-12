import express from "express";
import {
  getFragrances,
  getFragrance,
  createFragrance,
  updateFragrance,
  // syncCategoriesToMonday,
  deleteFragrance,
} from "../controllers/fragrance.controller.js";

const router = express.Router();

// router.get("/", fragranceController.getFragrances);
// router.get("/:id", fragranceController.getFragrance);
// router.post("/", fragranceController.createFragrance);
// router.put("/:id", fragranceController.updateFragrance);
// router.delete("/:id", fragranceController.deleteFragrance);

router.get("/", getFragrances);
router.get("/:id", getFragrance);
router.post("/", createFragrance);
router.put("/:id", updateFragrance);
// router.post("/sync-categories", syncCategoriesToMonday);
router.delete("/:id", deleteFragrance);

export default router;
