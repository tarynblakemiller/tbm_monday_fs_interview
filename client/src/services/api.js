import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const orderService = {
  create: (payload) => axios.post("/api/orders", payload),
  update: (id, payload) => axios.put(`/api/orders/${id}`, payload),
  delete: (id) => axios.delete(`/api/orders/${id}`),
  getFragrances: () => axios.get("/api/fragrances"),
};

export const fragranceApi = {
  getAll: () => apiClient.get("api/fragrances"),
  getById: (id) => apiClient.get(`api/fragrances/${id}`),
  create: (data) => apiClient.post("api/fragrances", data),
  update: (id, data) => apiClient.put(`api/fragrances/${id}`, data),
  delete: (id) => apiClient.delete(`api/fragrances/${id}`),
};

export default {
  api: apiClient,
  orders: orderService,
  fragrances: fragranceApi,
};
