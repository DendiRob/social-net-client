import { type AxiosResponse } from 'axios';
import createAxiosInstance from 'shared/api/server';
import type { regDtoType, loginDtoType } from 'types/AuthService.types';

const AuthApi = createAxiosInstance();

async function registration(data: regDtoType): Promise<AxiosResponse> {
  return await AuthApi.post('/auth/registration', data);
}

async function login(data: loginDtoType): Promise<AxiosResponse> {
  return await AuthApi.post('/auth/login', data);
}

export const api = {
  registration,
  login
};
