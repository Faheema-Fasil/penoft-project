import axios from "axios";
import server_url from "./server_url";
// import { useAuth } from "../reactContext/AuthContext";

const API = axios.create({
  baseURL: server_url,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
