<template>
  <div class="settings__sidebar">
    <SidebarTitle>Настройки</SidebarTitle>
    <ProfileSidePanel :user="profileStore.profile" />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import ProfileSidePanel from 'entities/profile/ui';
import { useSessionStore } from 'entities/session/model';
import { profileModel } from 'entities/profile';

const viewerStore = useSessionStore();
const profileStore = profileModel.useProfileStore();

onMounted(async () => {
  await profileStore.getUserProfile(viewerStore.userUuid);
});
</script>
<style scoped lang="scss"></style>
