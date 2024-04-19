import { defineStore } from 'pinia';
import { ref } from 'vue';

import { isAxiosError } from 'shared/utils';
import * as service from '../api';

const namespaced = 'profileStore';

export const useProfileStore = defineStore(namespaced, () => {
  const profileId = ref(null);
  const userId = ref(null);
  const firstName = ref('');
  const secondName = ref('');
  const thirdName = ref('');
  const aboutMe = ref('');
  const birthday = ref('');
  const avatarId = ref<number | null>(null);
  const email = ref('');
  const nickname = ref('');
  const userStatus = ref('');
  const userLocation = ref('');

  async function getUserProfile() {
    try {
      const res = await service.getUserProfile(); // TODO: доделать
      const data = res.data;

      profileId.value = data.id;
      nickname.value = data.nickname;
      userId.value = data.userId;
      firstName.value = data.firstName;
      secondName.value = data.secondName;
      thirdName.value = data.thirdName;
      aboutMe.value = data.aboutMe;
      birthday.value = data.birthday;
      avatarId.value = data.userProfileFiles[0]?.id ?? null;
      email.value = data.user.email ?? '';
      userLocation.value = data.userLocation ?? '';
      userStatus.value = data.userStatus ?? '';
    } catch (error) {
      isAxiosError(error);
    }
  }

  return {
    profileId,
    userId,
    firstName,
    secondName,
    thirdName,
    aboutMe,
    birthday,
    avatarId,
    email,
    nickname,
    userStatus,
    userLocation,

    getUserProfile
  };
});
