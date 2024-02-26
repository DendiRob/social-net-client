<template>
  <div class="settings">
    <SidebarTitle>Настройки</SidebarTitle>
    <ProfileSidePanel :user="profileStore.profile" />
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
import { onMounted, ref } from 'vue';
import { isAxiosError } from 'axios';
import { useRouter } from 'vue-router';

import ProfileSidePanel from 'entities/profile/ui/ProfileSidePanel';
import { useSessionStore } from 'entities/session/model';
import { profileModel } from 'entities/profile';
import { sidebar_profile_types } from 'entities/profile/profile.types';
import ConfirmModal from 'shared/ui/confirmModal';
import SidebarNavItem from 'shared/ui/sidebarNavItem';
import SidebarNav from 'shared/ui/sidebarNav';
import useToastr from 'shared/lib/useToastr';

const router = useRouter();
const viewerStore = useSessionStore();
const profileStore = profileModel.useProfileStore();
const toastr = useToastr();

const isLoading = ref(false);

async function logout() {
  try {
    isLoading.value = true;

    await viewerStore.logout();

    router.push({ name: 'login' });
  } catch (error) {
    if (isAxiosError(error)) {
      const apiErrors = error.response?.data;
      const errorText = apiErrors?.payload[0] ?? 'Что-то пошло не так!';
      return toastr.error({ text: errorText });
    }
  } finally {
    isLoading.value = false;
  }
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
entities/profile/ui/ProfileSidePanel
