import { defineStore } from 'pinia';
import { reactive } from 'vue';

import { getUserProfileByUuid } from '../api';
import type { IUserProfile } from '../profile.types';

const namespaced = 'profileStore';

export const useProfileStore = defineStore(namespaced, () => {
  let profile = reactive<IUserProfile>({
    id: undefined,
    image: '',
    birthDate: '',
    name: '',
    about: '',
    email: ''
  });

  async function getUserProfile(uuid: string) {
    const res = await getUserProfileByUuid(uuid);
    profile = res.data;
  }

  return {
    profile,
    getUserProfile
  };
});
