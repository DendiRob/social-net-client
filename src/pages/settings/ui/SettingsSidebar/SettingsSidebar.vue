<template>
  <div class="settings">
    <SidebarTitle>Настройки</SidebarTitle>
    <ProfileSidePanel :user="profileSidePanelProps" />
    <SidebarNav :menuItems="sidebar_profile_types" />
    <ConfirmModal
      title="Вы дейтсвительно хотите выйти?"
      confirmBtn="Выйти"
      :isLoading="isLoading"
      @confirm="logout"
    >
      <SidebarNavItem iconName="logout" itemLabel="Выйти" />
    </ConfirmModal>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import ProfileSidePanel from 'entities/profile/ui/ProfileSidePanel';
import { useSessionStore } from 'entities/session/model';
import { profileModel } from 'entities/profile';
import {
  type IUserProfile,
  sidebar_profile_types
} from 'entities/profile/profile.types';
import ConfirmModal from 'shared/ui/confirmModal';
import SidebarNavItem from 'shared/ui/sidebarNavItem';
import SidebarNav from 'shared/ui/sidebarNav';
import { isAxiosError } from 'shared/utils';

const router = useRouter();
const viewerStore = useSessionStore();
const profileStore = profileModel.useProfileStore();

const isLoading = ref(false);
const profileSidePanelProps = computed<IUserProfile>(() => {
  return {
    nickname: profileStore.nickname,
    email: profileStore.email,
    avatarId: profileStore.avatarId
  };
});

async function logout() {
  try {
    isLoading.value = true;

    await viewerStore.logout();

    router.push({ name: 'login' });
  } catch (error) {
    isAxiosError(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<style scoped lang="scss">
.settings {
  height: 100%;
}
</style>
entities/profile/ui/ProfileSidePanel
