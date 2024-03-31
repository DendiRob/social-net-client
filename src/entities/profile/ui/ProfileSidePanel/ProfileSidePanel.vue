<template>
  <div class="sidePanel__wrapper">
    <AvatarProfile :avatarId="user?.avatarId" />
    <div class="text__wrapper">
      <div class="text__name">{{ user?.email }}</div>
      <div class="text__email">{{ user?.nickname ?? 'Никнейм не указан' }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AvatarProfile from '../avatarProfile';
import type { IUserProfile } from 'entities/profile/profile.types';

interface IProps {
  user?: IUserProfile;
}

defineProps<IProps>();
</script>
<style scoped lang="scss">
.sidePanel {
  &__wrapper {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
    display: flex;
    align-items: center;
  }
}
.text {
  &__name {
    color: #171a1f;
    font-size: 17px;
    font-weight: 700;
  }
  &__email {
    color: #71747a;
    font-size: 15px;
    font-weight: 400;
    line-height: 24px;
  }
}
</style>
