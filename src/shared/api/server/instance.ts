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

export const api_service = createAxiosInstance();
api_service.interceptors.request.use((config) => {
  config.headers['access-token'] = localStorage.getItem(accessTokenName);
  return config;
});

api_service.interceptors.response.use(
  (response) => response,
  async (error) => {
    const instance = createAxiosInstance();
    if (error.response.status === 401) {
      try {
        const ok = await instance.post('/auth/refresh');

        setAccessToken(ok.data.access);

        return await api_service(error.config);
      } catch (error) {
        router.push({ name: 'login' });
      }
    }
    return Promise.reject(error);
  }
);
