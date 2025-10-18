import axios from 'axios';
import { Platform } from 'react-native';
import { API_URL } from '../constants/api';
import { getItem } from './storage';

// If running on Android emulator, replace localhost with 10.0.2.2 so the emulator can reach host machine
const getBaseUrl = () => {
  if (Platform.OS === 'android' && API_URL.includes('localhost')) {
    return API_URL.replace('localhost', '10.0.2.2');
  }
  return API_URL;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from MMKV for every request if present
api.interceptors.request.use(
  async (config) => {
    try {
      const token = getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
