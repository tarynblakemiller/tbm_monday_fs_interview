// controllers/orderController.js
import { orderService } from "../services/orderService.js";

export const createOrder = async (req, res) => {
  try {
    console.log("Received order data:", req.body);
    const result = await orderService.create(req.body);
    console.log("Created order:", result);
    res.json(result);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const result = await orderService.update(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.error("Order update error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await orderService.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Order deletion error:", error);
    res.status(500).json({ error: error.message });
  }
};
