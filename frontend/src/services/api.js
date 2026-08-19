import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export const prayerAPI = {
  getTimes: (lat, lng) => 
    api.get(`/prayer/times?lat=${lat}&lng=${lng}`)
};

export const weatherAPI = {
  getCurrent: (lat, lng) => 
    api.get(`/weather/current?lat=${lat}&lng=${lng}`),
  getForecast: (lat, lng) => 
    api.get(`/weather/forecast?lat=${lat}&lng=${lng}`)
};

export const qiblaAPI = {
  getDirection: (lat, lng) => 
    api.get(`/qibla/direction?lat=${lat}&lng=${lng}`)
};

export const mosqueAPI = {
  getNearby: (lat, lng, radius = 5000) => 
    api.get(`/mosques/nearby?lat=${lat}&lng=${lng}&radius=${radius}`)
};

export const searchAPI = {
  search: (query) => 
    api.get(`/search?query=${encodeURIComponent(query)}`)
};

export default api;