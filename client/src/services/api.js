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
