import axios from 'axios';
import { accessTokenName } from 'shared/config';
import { setAccessToken } from 'shared/lib/jwt';
import { useRouter } from 'vue-router';

const router = useRouter();

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

api_service.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const ok = await api_service.post('/auth/refresh');
      setAccessToken(ok.data.access);
      console.log(error.config);
      if (ok) {
        return await api_service(error.config);
      } else {
        router.push({ name: 'login' });
      }
    }
  }
);
