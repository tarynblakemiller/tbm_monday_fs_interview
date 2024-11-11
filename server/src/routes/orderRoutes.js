import express from "express";
import { createItem } from "../services/monday.service.js";
const router = express.Router();
// import {
//   createOrderInBoard,
//   getOrdersFromBoard,
// } from "../services/orderService.js";
// import createItemOnBoard from "../services/monday.service.js";

router.post("/create", async (req, res) => {
  try {
    const result = await createItem(req.body);
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: error.message });
  }
});

// router.post("/orders", createItem);
// router.get("/orders", getOrdersFromBoard);
// router.get("/orders/:id", getOrderById);
// router.put("/orders/:id", updateOrder);
// router.delete("/orders/:id", deleteOrder);

export default router;
