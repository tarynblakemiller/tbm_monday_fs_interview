import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((request) => {
  console.log("Request Details:", {
    method: request.method?.toUpperCase(),
    url: request.url,
    data: request.data,
    headers: request.headers,
    baseURL: request.baseURL,
  });
  return request;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log("Response Details:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("API Error Details:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      stack: error.stack,
    });
    return Promise.reject(error);
  }
);

// export const orderService = {
//   create: async (orderData) => {
//     try {
//       const response = await apiClient.post("/orders", {
//         ...orderData,
//         boardId: parseInt(import.meta.env.VITE_MONDAY_BOARD_ID),
//         groupId: "topics",
//         itemName: `${orderData.firstName} ${orderData.lastName}`,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Order creation error:", error);
//       throw new Error(error.response?.data?.error || "Failed to create order");
//     }
//   },

//   getAll: async () => {
//     try {
//       const response = await apiClient.get("/orders");
//       return response.data;
//     } catch (error) {
//       console.error("Get all orders error:", error);
//       throw error;
//     }
//   },

//   getById: async (id) => {
//     try {
//       const response = await apiClient.get(`/orders/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Get order by ID error:", error);
//       throw error;
//     }
//   },

//   update: async (id, columnValues) => {
//     try {
//       const response = await apiClient.put(`/orders/${id}`, {
//         columnValues:
//           typeof columnValues === "string"
//             ? columnValues
//             : JSON.stringify(columnValues),
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Update order error:", error);
//       throw error;
//     }
//   },

//   delete: async (id) => {
//     try {
//       const response = await apiClient.delete(`/orders/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Delete order error:", error);
//       throw error;
//     }
//   },
// };

export const orderService = {
  create: (payload) => axios.post("/api/orders", payload),
  update: (id, payload) => axios.put(`/api/orders/${id}`, payload),
  delete: (id) => axios.delete(`/api/orders/${id}`),
  getFragrances: () => axios.get("/api/fragrances"),
};

export const fragranceApi = {
  getAll: () => apiClient.get("/fragrances"),
  getById: (id) => apiClient.get(`/fragrances/${id}`),
  create: (data) => apiClient.post("/fragrances", data),
  update: (id, data) => apiClient.put(`/fragrances/${id}`, data),
  delete: (id) => apiClient.delete(`/fragrances/${id}`),
};

export default {
  api: apiClient,
  orders: orderService,
  fragrances: fragranceApi,
};
