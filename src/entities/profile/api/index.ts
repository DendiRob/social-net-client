import { api_service } from 'shared/api/server';

export async function getUserProfileByUuid(uuid: string) {
  return await api_service.post('profile/get-user-profile', uuid); //TODO: сделать на сервере
}
