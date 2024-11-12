import { Router } from "express";
import orderRouter from "./order.routes.js";
import fragranceRouter from "./fragrances.routes.js";

const router = Router();

router.use("/orders", orderRouter);
router.use("/fragrances", fragranceRouter);

router.use((err, _req, res, _next) => {
  console.error("API Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default router;
