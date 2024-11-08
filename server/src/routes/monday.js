import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/monday.controller.js";
import { validateConnection } from "../../index.js";

const router = express.Router();

router.use(validateConnection);

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/orders", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

router.get("/monday-status", async (req, res) => {
  try {
    res.json({
      status: "connected",
      timestamp: new Date().toISOString(),
      message: "Monday.com integration is working",
    });
  } catch (error) {
    console.error("Monday.com connection error:", error);
    res.status(503).json({
      status: "error",
      message: "Unable to connect to Monday.com",
      timestamp: new Date().toISOString(),
    });
  }
});

router.use((err, req, res, next) => {
  console.error("Monday Router Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    timestamp: new Date().toISOString(),
  });
});

export default router;
