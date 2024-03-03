<template>
  <div class="profile-wrapper">
    <div class="profile__title">Редактирование профиля</div>
    <SetAvatar class="profile__avatar" />
    <EditProfileForm />
  </div>
</template>
<script setup lang="ts">
import { SetAvatar, EditProfileForm } from 'features/profileEditing';

// TODO: запрос делаем на сервер за фоткой
</script>
<style scoped lang="scss">
.profile {
  &-wrapper {
    width: 550px;
    padding: 1rem;
    margin: 0 auto;
  }
  &__title {
    font-size: 1.714rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
  &__avatar {
    margin: 0 auto;
    margin-bottom: 20px;
  }
}
</style>
