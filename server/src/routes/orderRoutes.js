import express from "express";
import { createItem, updateItemName } from "../services/monday.service.js";
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const result = await createItem(req.body);
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: error.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    const result = await updateItemName(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:itemId", async (req, res) => {
  try {
    const result = await deleteItem(req.params.itemId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.post("/orders", createItem);
// router.get("/orders", getOrdersFromBoard);
// router.get("/orders/:id", getOrderById);
// router.put("/orders/:id", updateOrder);
// router.delete("/orders/:id", deleteOrder);

export default router;
