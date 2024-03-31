import { api_service } from 'shared/api/server';

export async function getUserProfile() {
  return await api_service.get('userProfiles/get-own-profile');
}

export async function getUserAvatar(avatarId: number) {
  return await api_service.get(`userProfiles/get-profile-avatar/${avatarId}`, {
    responseType: 'blob'
  });
}
