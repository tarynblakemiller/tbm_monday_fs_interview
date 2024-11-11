import { env } from "../config/environment.js";
import { createItem } from "../services/monday.service.js";

export const createOrder = async (req, res) => {
  try {
    const columnValues = formatColumnValues(req.body);
    const response = await createItem({
      boardId: parseInt(env.MONDAY_BOARD_ID),
      groupId: "topics",
      itemName: `${req.body.firstName} ${req.body.lastName}`,
      columnValues,
    });
    res.json(response);
  } catch (error) {
    console.error("Error creating Monday.com order:", error);
    res.status(500).json({
      error: "Failed to create item on Monday.com",
      details: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const boardId = env.MONDAY_BOARD_ID;
    if (!boardId) {
      throw new Error("MONDAY_BOARD_ID not configured");
    }

    const response = await getBoardItems(boardId);
    if (!response?.boards?.[0]?.items) {
      return res.status(404).json({ error: "No items found" });
    }

    res.json(response.boards[0].items);
  } catch (error) {
    console.error("Error fetching Monday.com orders:", error);
    res.status(500).json({
      error: "Failed to fetch orders from Monday.com",
      details: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getItemById(id);

    if (!response.items?.[0]) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(response.items[0]);
  } catch (error) {
    console.error("Error fetching Monday.com order:", error);
    res.status(500).json({
      error: "Failed to fetch order from Monday.com",
      details: error.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { columnValues } = req.body;

    const response = await updateItemById(id, columnValues);
    res.json(response);
  } catch (error) {
    console.error("Error updating Monday.com order:", error);
    res.status(500).json({
      error: "Failed to update order on Monday.com",
      details: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteItemById(id);
    res.json(response);
  } catch (error) {
    console.error("Error deleting Monday.com order:", error);
    res.status(500).json({
      error: "Failed to delete order from Monday.com",
      details: error.message,
    });
  }
};
