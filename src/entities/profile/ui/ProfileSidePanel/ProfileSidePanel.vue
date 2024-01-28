<template>
  <div class="sidePanel__wrapper">
    <img :src="userIcon" alt="user image" class="sidePanel__img" />
    <div class="text__wrapper">
      <div class="text__name">{{ userEmail }}</div>
      <div class="text__email">{{ userName }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IUserProfile } from '../../profile.types';
import defaultUserIcon from 'shared/ui/assets/default-user.svg';

interface IUserNotFound {
  email: string;
  name: string;
  image: string;
}

interface IProps {
  user: IUserProfile | IUserNotFound;
}

const props = withDefaults(defineProps<IProps>(), {
  user: () => ({
    email: 'Почта не указана',
    name: 'Имя не указано',
    image: defaultUserIcon
  })
});

const userIcon = props.user.image ? props.user.image : defaultUserIcon;
const userEmail = props.user.email ? props.user.email : 'Почта не указана';
const userName = props.user.name ? props.user.name : 'Имя не указано';
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
  &__img {
    width: 56px;
    height: 56px;
    margin-right: 5px;
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
