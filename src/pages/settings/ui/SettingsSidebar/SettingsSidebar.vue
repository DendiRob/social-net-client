<template>
  <div class="settings">
    <SidebarTitle>Настройки</SidebarTitle>
    <ProfileSidePanel :user="profileStore.profile" />
    <SidebarNav :menuItems="sidebar_profile_types" />
    <SidebarNavItem iconName="logout" itemLabel="Выйти" @click="logout" />
    <ConfirmModal />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import ProfileSidePanel from 'entities/profile/ui';
import { useSessionStore } from 'entities/session/model';
import { profileModel } from 'entities/profile';
import { sidebar_profile_types } from 'entities/profile/profile.types';
import ConfirmModal from 'shared/ui/confirmModal';
import SidebarNavItem from 'shared/ui/sidebarNavItem';
import SidebarNav from 'shared/ui/sidebarNav';
import { useRouter } from 'vue-router';

const router = useRouter();
const viewerStore = useSessionStore();
const profileStore = profileModel.useProfileStore();
// TODO: нужна модалка,которая будет подтверждать,что точно ли пользователь хочет выйти
async function logout() {
  await viewerStore.logout();
  router.push({ name: 'login' });
}

onMounted(async () => {
  //TODO: сделать запрос
  await profileStore.getUserProfile(viewerStore.viewerUuid);
});
</script>
<style scoped lang="scss">
.settings {
  height: 100%;
}
</style>
