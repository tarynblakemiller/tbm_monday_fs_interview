import { mondayService } from "../services/monday.service.js";
import Order from "../models/Order.js";

export const orderController = {
  getOrders: async (req, res) => {
    try {
      // const orders = await Order.findAll();
      const mondayOrders = await mondayService.getItems(
        process.env.MONDAY_BOARD_ID
      );
      res.json({ orders, mondayOrders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { boardId, itemName, columnValues, groupId } = req.body;

      console.log("Received request:", {
        boardId,
        itemName,
        columnValues,
        groupId,
      });

      const mondayResponse = await mondayService.createItem({
        boardId,
        itemName,
        columnValues: JSON.stringify(columnValues),
        groupId,
      });

      console.log("Monday API Response:", mondayResponse); // Let's see what we get back

      if (!mondayResponse?.data?.create_item?.id) {
        throw new Error(
          "Failed to create item on Monday.com: No item ID returned"
        );
      }

      res.status(201).json({
        message: "Order created successfully",
        mondayItemId: mondayResponse.data.create_item.id,
      });
    } catch (error) {
      console.error("Create order error:", error);
      res.status(500).json({
        error: error.message,
        details: error.response?.data || error,
      });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      // const order = await Order.update(req.body, { where: { id } });

      const mondayResponse = await mondayService.updateItemName({
        boardId: process.env.MONDAY_BOARD_ID,
        itemId: req.body.mondayItemId,
        columnValues: JSON.stringify(req.body.columnValues),
      });

      res.json({ mondayResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      // await Order.destroy({ where: { id } });
      await mondayService.deleteItem(req.body.mondayItemId);
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
