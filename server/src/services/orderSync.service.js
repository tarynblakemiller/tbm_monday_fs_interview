// services/orderSync.service.js
import { Order } from "../models/order.js";
import { mondayService } from "./monday.service.js";
import { generateOrderId } from "../utils/generators.js";

export class OrderSyncService {
  static async createOrder(orderData) {
    try {
      // First create in Monday.com
      const mondayResponse = await mondayService.createItem({
        boardId: process.env.MONDAY_BOARD_ID,
        itemName: `${orderData.client_first_name} ${orderData.client_last_name}`,
        columnValues: {
          text: orderData.client_first_name,
          text6: orderData.client_last_name,
          email: {
            email: orderData.client_email,
            text: orderData.client_email,
          },
          numbers: orderData.quantity,
          status: { label: "NEW" },
        },
      });

      // Then create in local DB with Monday.com ID
      const order = await Order.create({
        order_id: generateOrderId(),
        monday_item_id: mondayResponse.data.create_item.id,
        ...orderData,
      });

      return order;
    } catch (error) {
      console.error("Order sync failed:", error);
      throw error;
    }
  }

  static async updateOrderStatus(orderId, newStatus) {
    try {
      const order = await Order.findByPk(orderId);
      if (!order) throw new Error("Order not found");

      // Update Monday.com
      await mondayService.updateItem({
        boardId: process.env.MONDAY_BOARD_ID,
        itemId: order.monday_item_id,
        columnValues: {
          status: { label: newStatus },
        },
      });

      // Update local DB
      order.order_status = newStatus;
      await order.save();

      return order;
    } catch (error) {
      console.error("Status update failed:", error);
      throw error;
    }
  }

  static async syncFromMonday(mondayItemId) {
    try {
      const mondayItem = await mondayService.getItems(
        process.env.MONDAY_BOARD_ID
      );
      const item = mondayItem.find((i) => i.id === mondayItemId);

      if (!item) throw new Error("Monday.com item not found");

      await Order.update(
        {
          order_status: item.column_values.status?.text || "NEW",
          // Add other fields you want to sync from Monday.com
        },
        {
          where: { monday_item_id: mondayItemId },
        }
      );
    } catch (error) {
      console.error("Monday sync failed:", error);
      throw error;
    }
  }
}
