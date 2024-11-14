import express from "express";
import orderRouter from "./routes/order.routes.js";
import fragranceRouter from "./routes/fragrance.routes.js";

const router = express.Router();

router.use("/orders", orderRouter);
router.use("/fragrances", fragranceRouter);

export default router;
