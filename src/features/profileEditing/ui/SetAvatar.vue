<template>
  <div class="avatar-wrapper">
    <AvatarInput v-model="image" @delete="deleteAvatar" />
  </div>
</template>
<script setup lang="ts">
import { AvatarInput, profileModel } from 'entities/profile';
import { deleteProfileAvatar, getUserAvatar } from 'entities/profile/api';
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
