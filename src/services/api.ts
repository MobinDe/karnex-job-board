import axios from 'axios';

const api = axios.create({
  baseURL: 'https://karnex-backend.onrender.com/api', // ✅ آدرس بک‌اند Render شما
});

// اضافه کردن خودکار توکن به هدر درخواست‌ها
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('karnex_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;