import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để gắn token vào mỗi yêu cầu
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Giả sử token được lưu trong localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;