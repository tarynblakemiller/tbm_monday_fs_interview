import { initializeMondayClient } from "../src/services/monday/monday.service.js";

const mondayService = initializeMondayClient({
  apiToken: process.env.MONDAY_API_TOKEN,
  boardId: process.env.MONDAY_BOARD_ID,
});

const handleControllerError = (res, error) => {
  console.error("Controller Error:", error);
  res.status(error.code === "VALIDATION_ERROR" ? 400 : 500).json({
    error: error.message,
    code: error.code,
    timestamp: new Date().toISOString(),
  });
};

export const orderController = {
  getOrders: async (req, res) => {
    try {
      const mondayOrders = await mondayService.getItems();
      res.json({
        orders: mondayOrders?.boards?.[0]?.items || [],
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(res, error);
    }
  },

  createOrder: async (req, res) => {
    try {
      const { itemName, columnValues, groupId } = req.body;

      const mondayResponse = await mondayService.createItem({
        itemName,
        columnValues,
        groupId,
      });

      res.status(201).json({
        message: "Order created successfully",
        orderId: mondayResponse?.create_item?.id,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(res, error);
    }
  },

  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const { columnValues } = req.body;

      const mondayResponse = await mondayService.updateItemName({
        itemId: id,
        columnValues,
      });

      res.json({
        message: "Order updated successfully",
        order: mondayResponse,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(res, error);
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      await mondayService.deleteItem(id);

      res.json({
        message: "Order deleted successfully",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(res, error);
    }
  },
};
