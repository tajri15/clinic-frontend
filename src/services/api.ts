import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // URL base dari backend kita
});

// Ini adalah interceptor: kode yang berjalan SEBELUM setiap request dikirim
// Kita akan menggunakannya untuk menyisipkan token JWT secara otomatis
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error: any) => {
  return Promise.reject(error);
});

export default api;