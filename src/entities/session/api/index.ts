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

async function registration(data: regDtoType): Promise<AxiosResponse> {
  return await AuthApi.post('/auth/registration', data);
}

async function login(data: loginDtoType): Promise<AxiosResponse> {
  return await AuthApi.post('/auth/login', data);
}

async function getViewer() {
  return await api_service.get('/users/viewer');
}

export const api = {
  registration,
  login,
  getViewer
};
