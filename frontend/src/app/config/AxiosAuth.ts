import axios from 'axios';

const authInstance = axios.create();

const checkAuthToken = () => {
  const tokenStorage = localStorage.getItem('token');
  return tokenStorage ? `Bearer ${JSON.parse(tokenStorage)}` : '';
};

authInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = checkAuthToken();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export const axiosAuth = authInstance;
