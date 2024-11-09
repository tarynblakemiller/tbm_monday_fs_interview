// frontend/src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

// Create single axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Single order service
export const orderService = {
  async create(orderData) {
    try {
      console.log("Sending create request with data:", orderData);
      const response = await apiClient.post("/api/orders", orderData); // Add /api prefix
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Order creation failed:", {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
      throw error;
    }
  },

  async update(itemId, orderData) {
    try {
      const response = await apiClient.put(`/api/orders/${itemId}`, orderData); // Add /api prefix
      return response.data;
    } catch (error) {
      console.error("Order update failed:", error);
      throw error;
    }
  },

  async delete(itemId) {
    try {
      const response = await apiClient.delete(`/api/orders/${itemId}`); // Add /api prefix
      return response.data;
    } catch (error) {
      console.error("Order deletion failed:", error);
      throw error;
    }
  },
};

export const fragranceApi = {
  getAll: () => apiClient.get("/api/fragrances"),
  getById: (id) => apiClient.get(`/api/fragrances/${id}`),
  create: (data) => apiClient.post("/api/fragrances", data),
  update: (id, data) => apiClient.put(`/api/fragrances/${id}`, data),
  delete: (id) => apiClient.delete(`/api/fragrances/${id}`),
};
// // Fragrance service
// export const fragranceService = {
//   async getAll() {
//     const response = await apiClient.get("/fragrances");
//     return response.data;
//   },

//   async getById(id) {
//     const response = await apiClient.get(`/fragrances/${id}`);
//     return response.data;
//   },
//   // ... other fragrance methods
// };

export default {
  orders: orderService,
  fragrances: fragranceApi,
};
