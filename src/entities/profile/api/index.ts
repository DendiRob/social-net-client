import type { IUserProfileUpdate } from 'features/profileEditing/model/types';
import { api_service } from 'shared/api/server';

export async function getUserProfile() {
  return await api_service.get('userProfiles/get-own-profile');
}

export async function getUserAvatar(avatarId: number) {
  return await api_service.get(`userProfiles/get-profile-avatar/${avatarId}`, {
    responseType: 'blob'
  });
}

export const updateUserProfile = async (data: IUserProfileUpdate) => {
  return await api_service.post('userProfiles/update-user-profile', data);
};

export const deleteProfileAvatar = async (fileId: number) => {
  return await api_service.post(`userProfiles/delete-profile-avatar/${fileId}`);
};

export const setProfileAvatar = async (data: FormData) => {
  return await api_service.post('userProfiles/set-profile-avatar', data);
};
