<template>
  <div class="avatar-wrapper">
    <AvatarInput
      v-model="image"
      @delete="deleteAvatar"
      @setAvatar="setAvatar"
    />
  </div>
</template>
<script setup lang="ts">
import { AvatarInput, profileModel } from 'entities/profile';
import {
  deleteProfileAvatar,
  getUserAvatar,
  setProfileAvatar
} from 'entities/profile/api';
import { isAxiosError } from 'shared/utils';
import { onMounted, ref } from 'vue';

const profileStore = profileModel.useProfileStore();

const image = ref();

onMounted(async () => {
  if (profileStore.avatarId !== null) {
    const res = await getUserAvatar(profileStore.avatarId);
    image.value = res.data;
  }
});

async function setAvatar(avatar: File) {
  try {
    let formData = new FormData();
    formData.append('avatar', avatar);
    if (profileStore.profileId !== null) {
      formData.append('profileId', profileStore.profileId);
    }
    const res = await setProfileAvatar(formData);
    profileStore.avatarId = res.data.avatarId;
  } catch (error) {
    isAxiosError(error);
  }
}

async function deleteAvatar() {
  try {
    const avatarId = profileStore.avatarId;
    if (avatarId !== null) {
      await deleteProfileAvatar(avatarId);
      profileStore.avatarId = null;
    }
  } catch (error) {
    isAxiosError(error);
  }
}
</script>
<style scoped lang="scss">
.avatar {
  &-wrapper {
    width: 120px;
    height: 120px;
  }
}
</style>
