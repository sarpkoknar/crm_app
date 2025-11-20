import axios from 'axios';

// Ortak ayarlı axios instance
const http = axios.create({
  baseURL: 'http://localhost:5000', // Backend portu
  timeout: 10000,                   // 10 saniye timeout
});

export default http;
