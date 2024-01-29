import axios from 'axios';
import { accessTokenName } from 'shared/config';

export function createAxiosInstance() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URI,
    withCredentials: true
  });

  return instance;
}

export const api_service = createAxiosInstance(); // вот на это api нужно накинуть интерсепторы, которые будут проверять аутентификацию
api_service.interceptors.request.use((config) => {
  config.headers['access-token'] = localStorage.getItem(accessTokenName);
  return config;
});
