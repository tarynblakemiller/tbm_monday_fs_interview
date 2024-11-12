import express from "express";
import { orderController } from "../controllers/order.controller.js";
import { mondayService } from "../services/monday.service.js";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const result = await mondayService.createItem(req.body);
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: error.message });
  }
});
router.get("/", orderController.getOrders);
// router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export default router;
