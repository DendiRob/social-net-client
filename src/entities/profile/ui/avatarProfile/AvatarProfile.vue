<template>
  <div class="img">
    <img v-if="userIcon" :src="userIcon" alt="user image" />
    <img v-else :src="defaultUserIcon" alt="user image" />
  </div>
</template>
<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';

import { getUserAvatar } from 'entities/profile/api';
import { isAxiosError } from 'shared/utils';
import defaultUserIcon from 'shared/ui/assets/default-user.svg';

const props = defineProps<{ avatarId?: number | null }>();

const userIcon = ref<string | undefined>(undefined);

const avatarId = computed(() => {
  return props.avatarId;
});

watch(
  avatarId,
  async () => {
    try {
      if (props?.avatarId !== undefined && props?.avatarId !== null) {
        const res = await getUserAvatar(props.avatarId);
        userIcon.value = URL.createObjectURL(res.data);
      }
    } catch (error) {
      isAxiosError(error);
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (userIcon.value) {
    URL.revokeObjectURL(userIcon.value);
    userIcon.value = undefined;
  }
});
</script>
<style scoped lang="scss">
.img {
  img {
    width: 56px;
    height: 56px;
    margin-right: 5px;
    object-fit: cover;
    border-radius: 100%;
  }
}
</style>
