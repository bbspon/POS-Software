// frontend/src/services/axiosInstance.js
import axios from "axios";

const API_BASE =
  import.meta?.env?.VITE_API_URL?.trim?.() || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE,
  // If you don't rely on HTTP-only cookies for admin auth, keep this false.
  // Using Bearer token only avoids strict CORS requirements.
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("admin_token");
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  // Optional storefront headers; leave out for admin-only endpoints
  const guest =
    localStorage.getItem("guest_key") ||
    `guest_${Math.random().toString(36).slice(2)}`;
  localStorage.setItem("guest_key", guest);
  config.headers["X-Guest-Key"] = guest;
  return config;
});

export default api;
