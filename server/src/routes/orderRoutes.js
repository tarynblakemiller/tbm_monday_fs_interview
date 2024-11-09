// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Remove /orders from these paths since they'll be added in the app mounting
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

// Add logging middleware to debug incoming requests
router.use((req, res, next) => {
  console.log("Order Route:", {
    method: req.method,
    path: req.path,
    body: req.body,
  });
  next();
});

export default router;
