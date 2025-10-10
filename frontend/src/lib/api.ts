import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  timeout: 120000,
  headers: {
    'Content-type': 'application/json',
  },
});

const getTokenByPathname = () => {
  if (typeof window !== 'undefined') {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    return getCookie('token') || null;
  }
  return null;
};

api.interceptors.request.use(
  (config) => {
    const token = getTokenByPathname();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
