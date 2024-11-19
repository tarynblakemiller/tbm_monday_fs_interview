import { mondayService } from "../services/monday.service.js";

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
      console.log("MONDAY RESPONSE BACKEND", mondayResponse);

      res.json(mondayResponse);
    } catch (error) {
      handleError(res, error, "Failed to create order in Monday.com");
    }
  },

  async getOrders(req, res) {
    try {
      const boardId = process.env.MONDAY_BOARD_ID;
      if (!boardId) throw new Error("MONDAY_BOARD_ID not configured");

      const mondayItems = await mondayService.getItems(boardId);
      if (!mondayItems.length) {
        return res.status(404).json({ error: "No items found" });
      }

      for (const item of mondayItems) {
        await Order.update(
          {
            order_status: item.column_values.status?.text || "NEW",
          },
          {
            where: { monday_item_id: item.id },
          }
        );
      }

      res.json(mondayItems);
    } catch (error) {
      handleError(res, error, "Failed to fetch orders from Monday.com");
    }
  },

  async updateOrder(req, res) {
    try {
      const mondayResponse = await mondayService.updateItem({
        boardId: env.MONDAY_BOARD_ID,
        itemId: req.params.id,
        columnValues: req.body.columnValues,
      });

      if (mondayResponse.data) {
        await Order.update(req.body, {
          where: { monday_item_id: req.params.id },
        });
      }

      res.json(mondayResponse);
    } catch (error) {
      handleError(res, error, "Failed to update order in Monday.com");
    }
  },

  async deleteOrder(req, res) {
    try {
      const mondayResponse = await mondayService.deleteItem(req.params.id);

      if (mondayResponse.data) {
        await Order.destroy({
          where: { monday_item_id: req.params.id },
        });
      }

      res.json(mondayResponse);
    } catch (error) {
      handleError(res, error, "Failed to delete order from Monday.com");
    }
  },

  async getLocalOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: ["fragrances"],
      });
      res.json(orders);
    } catch (error) {
      handleError(res, error, "Failed to fetch orders from local database");
    }
  },
};
