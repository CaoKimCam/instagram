import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://photos-sharing-website-backend-0e896e8a6dc9.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;