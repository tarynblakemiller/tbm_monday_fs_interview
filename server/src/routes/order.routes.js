import express from "express";
import { orderController } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export default router;
