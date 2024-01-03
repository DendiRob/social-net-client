import axios from 'axios';
import type { regDto } from 'types/AuthService.types';

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URI,
    withCredentials: true
  });

  return instance;
}

const AuthApi = createAxiosInstance();

export async function registration(data: regDto) {
  return await AuthApi.post('/registration', data);
}
