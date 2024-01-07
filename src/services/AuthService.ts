import axios, { type AxiosResponse } from 'axios';
import type { regDtoType, loginDtoType } from 'types/AuthService.types';

export function createAxiosInstance() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URI,
    withCredentials: true
  });

  return instance;
}

const AuthApi = createAxiosInstance();

export async function registration(data: regDtoType): Promise<AxiosResponse> {
  return await AuthApi.post('/auth/registration', data);
}

export async function login(data: loginDtoType): Promise<AxiosResponse> {
  return await AuthApi.post('/auth/login', data);
}
