import axios from "axios";

const api = axios.create({
  baseURL: "https://vehicle-management-system-6ovl.onrender.com"   // your render backend URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

