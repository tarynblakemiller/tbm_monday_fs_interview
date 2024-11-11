import { createItemInBoard } from "../services/orderService";

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    console.log("Received order data:", req.body);
    console.log("Formatted column values:", columnValues);

    // Validate required fields
    if (
      !orderData.firstName ||
      !orderData.lastName ||
      !orderData.quantity ||
      !orderData.fragranceCategories
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const formattedOrderData = {
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      quantity: parseInt(orderData.quantity),
      fragranceCategories: Array.isArray(orderData.fragranceCategories)
        ? orderData.fragranceCategories
        : [orderData.fragranceCategories],
    };

    const response = await createItemInBoard(formattedOrderData);
    res.status(201).json(response);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
};
