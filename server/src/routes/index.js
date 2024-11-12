import express from "express";
import orderRouter from "./routes/order.routes.js";
import fragranceRouter from "./routes/fragrance.routes.js";

const router = express.Router();

router.use("/orders", orderRouter);
router.use("/fragrances", fragranceRouter);

router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "API Server",
    monday: {
      connected: true,
      boardId: process.env.MONDAY_BOARD_ID,
    },
  });
});

export default router;
