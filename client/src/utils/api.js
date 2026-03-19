import axios from 'axios';

// In production, API is on same domain (served by same Express server)
// In development, use localhost
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001';

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
};

export const booksAPI = {
  getBooks: (params) => API.get('/books', { params }),
  getBook: (id) => API.get(`/books/${id}`),
  getGenres: () => API.get('/books/filters/genres'),
  getLanguages: () => API.get('/books/filters/languages'),
};

export const ordersAPI = {
  createOrder: (data) => API.post('/orders', data),
  getOrders: () => API.get('/orders'),
  getOrder: (id) => API.get(`/orders/${id}`),
};

export default API;
