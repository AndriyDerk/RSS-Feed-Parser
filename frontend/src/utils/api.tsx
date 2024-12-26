import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        await axios.post(`${baseURL}/user/refresh`, {}, { withCredentials: true });

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
