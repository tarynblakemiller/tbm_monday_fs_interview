import { apiClient } from "./api.js";

export const formatColumnValues = (data) => {
  const { firstName, lastName, quantity, labels = [] } = data;

  return {
    status: { label: "New Order" },
    text: { text: firstName || "" },
    text6: { text: lastName || "" },
    numbers: { number: parseInt(quantity) || 0 },
    dropdown: {
      settings_str: JSON.stringify({
        limit_select: false,
        hide_footers: false,
        labels: labels.map((id) => ({ id: id.toString() })),
      }),
    },
    date_1: { date: new Date().toISOString().split("T")[0] },
  };
};

export const orderService = {
  create: async (orderData) => {
    try {
      const columnValues = formatColumnValues(orderData);
      const payload = {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        quantity: orderData.quantity,
        label: orderData.labels,
        columnValues: JSON.stringify(columnValues),
      };

      console.log("Sending payload:", payload);
      const response = await apiClient.post("/orders", payload);
      return response.data;
    } catch (error) {
      console.error("Order creation error:", error);
      throw new Error(error.response?.data?.error || "Failed to create order");
    }
  },

  getAll: async () => {
    try {
      const response = await apiClient.get("/orders");
      return response.data;
    } catch (error) {
      console.error("Get orders error:", error);
      throw new Error(error.response?.data?.error || "Failed to fetch orders");
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error("Get order error:", error);
      throw new Error(error.response?.data?.error || "Failed to fetch order");
    }
  },

  update: async (id, orderData) => {
    try {
      const columnValues = formatColumnValues(orderData);
      const payload = {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        quantity: orderData.quantity,
        labels: orderData.labels,
        columnValues: JSON.stringify(columnValues),
      };

      const response = await apiClient.put(`/orders/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Update order error:", error);
      throw new Error(error.response?.data?.error || "Failed to update order");
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error("Delete order error:", error);
      throw new Error(error.response?.data?.error || "Failed to delete order");
    }
  },
};

export const fragranceService = {
  getAll: async () => {
    try {
      const response = await apiClient.get("/fragrances");
      return response.data;
    } catch (error) {
      console.error("Get fragrances error:", error);
      throw new Error(
        error.response?.data?.error || "Failed to fetch fragrances"
      );
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/fragrances/${id}`);
      return response.data;
    } catch (error) {
      console.error("Get fragrance error:", error);
      throw new Error(
        error.response?.data?.error || "Failed to fetch fragrance"
      );
    }
  },

  create: async (data) => {
    try {
      const response = await apiClient.post("/fragrances", data);
      return response.data;
    } catch (error) {
      console.error("Create fragrance error:", error);
      throw new Error(
        error.response?.data?.error || "Failed to create fragrance"
      );
    }
  },

  update: async (id, data) => {
    try {
      const response = await apiClient.put(`/fragrances/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Update fragrance error:", error);
      throw new Error(
        error.response?.data?.error || "Failed to update fragrance"
      );
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/fragrances/${id}`);
      return response.data;
    } catch (error) {
      console.error("Delete fragrance error:", error);
      throw new Error(
        error.response?.data?.error || "Failed to delete fragrance"
      );
    }
  },
};

export default {
  orders: orderService,
  fragrances: fragranceService,
};
