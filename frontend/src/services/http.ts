import axios from "axios";

// Backend 5000 portunda, burayı sabitledik.
const http = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
});

// Her isteğe otomatik Token ekleyen güvenlik kontrolü (Interceptor)
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;