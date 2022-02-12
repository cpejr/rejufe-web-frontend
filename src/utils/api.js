import axios from 'axios';

const api = axios.create({
  baseURL: process.env.DB_URL,
});

export default api;
