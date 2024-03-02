<template>
  <Form
    class="profile__form"
    @submit="onSubmit"
    :validation-schema="validateEditProfileForm"
  >
    <InputText
      class="profile__input"
      @keydown.space.prevent
      v-bind="inputsForm.fileds.firstName"
    />
    <InputText
      class="profile__input"
      @keydown.space.prevent
      v-bind="inputsForm.fileds.secondName"
    />
    <InputText
      class="profile__input"
      @keydown.space.prevent
      v-bind="inputsForm.fileds.userStatus"
    />
    <InputText
      class="profile__input"
      @keydown.space.prevent
      v-bind="inputsForm.fileds.userLocation"
    />
    <CustomTextarea
      class="profile__aboutMe"
      :placeholder="'Обо мне'"
      v-model="aboutMe"
      :maxLength="430"
    />
  </Form>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { ref } from 'vue';

import CustomTextarea from 'shared/ui/customTextarea';
import { validateEditProfileForm } from '../model/profileEditing.schemas.';

async function onSubmit(value: Record<string, any>) {
  // TODO: запрос на изменение данных
  console.log(value);
}

const inputsForm = ref({
  fileds: {
    firstName: {
      name: 'firstName',
      placeholder: 'Имя',
      maxLength: 15
    },
    secondName: {
      name: 'secondName',
      placeholder: 'Фамилия',
      maxLength: 15
    },
    userStatus: {
      name: 'userStatus',
      placeholder: 'Статус',
      maxLength: 30
    },
    userLocation: {
      name: 'userLocation',
      placeholder: 'Место проживания',
      maxLength: 30
    }
  }
});

const aboutMe = ref('');
</script>
<style scoped lang="scss">
.profile {
  &__input {
    margin-bottom: 1.142rem;
  }
  &__aboutMe {
    height: 200px;
    margin-bottom: 28px;
  }
}
</style>
