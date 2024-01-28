<template>
  <div class="settings__sidebar">
    <SidebarTitle>Настройки</SidebarTitle>
    <ProfileSidePanel :user="profileStore.profile" />
    <SidebarNav :menuItems="sidebar_profile_types" />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import ProfileSidePanel from 'entities/profile/ui';
import SidebarNav from 'shared/ui/sidebarNav';
import { useSessionStore } from 'entities/session/model';
import { profileModel } from 'entities/profile';
import { sidebar_profile_types } from 'entities/profile/profile.types';

const viewerStore = useSessionStore();
const profileStore = profileModel.useProfileStore();

onMounted(async () => {
  await profileStore.getUserProfile(viewerStore.userUuid);
});
</script>
<style scoped lang="scss"></style>
