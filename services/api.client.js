
import axios from 'axios';
import { STORAGE_KEYS } from '@/utils/constants';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token to every request
apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.TOKEN) : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling — redirect to login on 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
