import { createItemInBoard } from "../services/orderService";

createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const response = await createItemInBoard(orderData);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

// export const getOrders = async (req, res) => {
//   try {
//     const boardId = process.env.MONDAY_BOARD_ID;
//   }
// }
