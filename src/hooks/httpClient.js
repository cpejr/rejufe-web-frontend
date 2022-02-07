import axios from 'axios';

const URL_BASE = process.env.REACT_APP_BASE_URL || 'http://localhost:3333';

const httpClient = axios.create({
  baseURL: URL_BASE,
});

const requestHandler = (request) => {
  const token = localStorage.getItem('user');
  if (token) {
    const user = JSON.parse(token);
    request.headers.Authorization = `Bearer ${user.acessToken}`;
  }
  return request;
};

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const token = localStorage.getItem('user');
    if (error.response?.status === 403 && token) {
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return error.response;
  },
);

httpClient.interceptors.request.use((request) => requestHandler(request));
export default httpClient;
