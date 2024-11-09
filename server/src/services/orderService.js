import { mondayService } from "./mondayService.js";

export const orderService = {
  async create(orderData) {
    try {
      console.log("Creating order with data:", orderData);
      const result = await mondayService.createItem(orderData);
      console.log("Order created on Monday:", result);
      return result;
    } catch (error) {
      console.error("Order creation failed:", error);
      throw error;
    }
  },

  async update(itemId, orderData) {
    return mondayService.updateItem(itemId, orderData);
  },

  async delete(itemId) {
    return mondayService.deleteItem(itemId);
  },

  async getAll() {
    return mondayService.getOrders();
  },
};
