import { mondayService } from "../services/monday.service.js";
import { env } from "../config/environment.js";
import { Order } from "../models/order.model.js";
import { generateOrderId } from "../utils/generators.js";

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
      const { firstName, lastName, email, quantity, ...rest } = req.body;
      const mondayResponse = await mondayService.createItem({
        boardId: env.MONDAY_BOARD_ID,
        itemName: `${firstName} ${lastName}`,
        columnValues: rest,
      });

      // stores the order also locally to the db
      if (mondayResponse.data?.create_item?.id) {
        await Order.create({
          order_id: generateOrderId(),
          monday_item_id: mondayResponse.data.create_item.id,
          monday_board_id: env.MONDAY_BOARD_ID,
          client_first_name: firstName,
          client_last_name: lastName,
          client_email: email,
          quantity,
          order_status: "NEW",
          ...rest,
        });
      }

      res.json(mondayResponse);
    } catch (error) {
      handleError(res, error, "Failed to create order in Monday.com");
    }
  },

  async getOrders(req, res) {
    try {
      const boardId = env.MONDAY_BOARD_ID;
      if (!boardId) throw new Error("MONDAY_BOARD_ID not configured");

      // Get from Monday.com
      const mondayItems = await mondayService.getItems(boardId);
      if (!mondayItems.length) {
        return res.status(404).json({ error: "No items found" });
      }

      // Sync status with local DB
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
      // Update in Monday.com
      const mondayResponse = await mondayService.updateItem({
        boardId: env.MONDAY_BOARD_ID,
        itemId: req.params.id,
        columnValues: req.body.columnValues,
      });

      // Update local DB
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
      // Delete from Monday.com
      const mondayResponse = await mondayService.deleteItem(req.params.id);

      // Delete from local DB
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

  // New method to check local DB
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
