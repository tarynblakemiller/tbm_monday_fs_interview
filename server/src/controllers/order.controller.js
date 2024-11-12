import { mondayService } from "../services/monday.service.js";
import { env } from "../config/environment.js";

const handleError = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({
    error: message,
    details: error.message,
  });
};

export const orderController = {
  async createOrder(req, res) {
    try {
      const { firstName, lastName, ...rest } = req.body;
      const response = await mondayService.createItem({
        boardId: parseInt(env.MONDAY_BOARD_ID),
        itemName: `${firstName} ${lastName}`,
        columnValues: rest,
      });
      res.json(response);
    } catch (error) {
      handleError(res, error, "Failed to create order in Monday.com");
    }
  },

  async getOrders(req, res) {
    try {
      const boardId = env.MONDAY_BOARD_ID;
      if (!boardId) throw new Error("MONDAY_BOARD_ID not configured");

      const items = await mondayService.getItems(boardId);
      if (!items.length) {
        return res.status(404).json({ error: "No items found" });
      }

      res.json(items);
    } catch (error) {
      handleError(res, error, "Failed to fetch orders from Monday.com");
    }
  },

  async updateOrder(req, res) {
    try {
      const response = await mondayService.updateItem({
        boardId: env.MONDAY_BOARD_ID,
        itemId: req.params.id,
        columnValues: req.body.columnValues,
      });
      res.json(response);
    } catch (error) {
      handleError(res, error, "Failed to update order in Monday.com");
    }
  },

  async deleteOrder(req, res) {
    try {
      const response = await mondayService.deleteItem(req.params.id);
      res.json(response);
    } catch (error) {
      handleError(res, error, "Failed to delete order from Monday.com");
    }
  },
};
