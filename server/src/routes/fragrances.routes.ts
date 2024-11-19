import express, { Router } from "express";
import { fragranceController } from "../controllers/fragrance.controller.js";

const router: Router = express.Router();

router.get("/", fragranceController.getFragrances);
router.get("/:id", fragranceController.getFragrance);
router.post("/", fragranceController.createFragrance);
router.put("/:id", fragranceController.updateFragrance);
router.delete("/:id", fragranceController.deleteFragrance);

export default router;
