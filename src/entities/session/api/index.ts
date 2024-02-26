import { type AxiosResponse } from 'axios';
import createAxiosInstance, { api_service } from 'shared/api/server';

export type regDtoType = {
  email: string;
  password: string;
  name: string;
};

export type loginDtoType = {
  email: string;
  password: string;
};

const AuthApi = createAxiosInstance();

async function registration(data: Record<string, any>): Promise<AxiosResponse> {
  return await AuthApi.post('/auth/registration', data);
}

async function login(data: FormData): Promise<AxiosResponse> {
  return await AuthApi.post('/auth/login', data);
}

async function logout() {
  return await api_service.post('/auth/logout');
}

async function getViewer() {
  return await api_service.get('/users/viewer');
}

export const api = {
  registration,
  login,
  getViewer,
  logout
};
