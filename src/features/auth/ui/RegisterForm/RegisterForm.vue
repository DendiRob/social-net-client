<template>
  <div class="reg-wrapper">
    <Form
      name="reg-form"
      class="reg__form"
      @submit="onSubmit"
      :validation-schema="comparePassSchema"
    >
      <div class="reg__title">New account</div>
      <div class="reg__inputs">
        <label class="reg__input reg__input_img" for="addPhoto">
          <input
            id="addPhoto"
            name="addPhoto"
            type="image"
            :src="addPhotoUrl"
            alt="add photo"
            @click.prevent
          />
        </label>
        <InputText
          @keydown.space.prevent
          class="reg__input"
          v-bind:="inputsForm.fileds.email"
        />
        <InputText
          @keydown.space.prevent
          class="reg__input"
          v-bind:="inputsForm.fileds.name"
        />
        <InputPassword
          class="reg__input"
          v-bind:="inputsForm.fileds.password"
        />
        <InputPassword
          class="reg__input"
          v-bind:="inputsForm.fileds.confPassword"
        />
      </div>
      <button class="reg__btn" type="submit">Registration</button>
      <RouterLink :to="{ name: 'login' }" class="reg__loginLink"
        >Sign in</RouterLink
      >
    </Form>
  </div>
</template>
<script setup lang="ts">
// TODO: переделать валидацию поля и скрыть пароли
import { ref, type Ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Form } from 'vee-validate';

import InputPassword from 'shared/ui/InputPassword';
import InputText from 'shared/ui/InputText';
import addPhotoUrl from 'shared/ui/assets/add-photo.svg';
import { SessionModel, SessionApi } from 'entities/session';
import * as yup from 'yup';

const router = useRouter();
const sessionStore = SessionModel.useSessionStore();

const comparePassSchema = yup.object({
  password: yup.string().required('Введите пароль!'),
  confPassword: yup
    .string()
    .required('Введите пароль ещё раз!')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
  email: yup
    .string()
    .required('Введите почту')
    .email('Неправильный формат почты!'),
  name: yup.string().required('Укажите ваш ник!')
});

const inputsForm = ref({
  fileds: {
    email: {
      name: 'email',
      placeholder: 'Почта'
    },
    name: {
      name: 'name',
      placeholder: 'Ваш ник'
    },
    password: {
      name: 'password',
      placeholder: 'Пароль'
    },
    confPassword: {
      name: 'confPassword',
      placeholder: 'Подтвердите пароль'
    }
  }
});

async function onSubmit(value: Record<string, any>) {
  try {
    const response = await SessionApi.registration(value);
    const tokens = response.data;

    sessionStore.setAccessToken(tokens.access);
    sessionStore.setViewer(response.data);
    router.push({ name: 'home' });
  } catch (error) {
    // заменить на тостер
    if (axios.isAxiosError(error)) {
      const apiErrors = error.response?.data;
      const newErrors = apiErrors.errors.join('\n');
      alert(newErrors);
    }
  }
}
</script>
<style lang="scss" scoped>
.reg {
  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  &__form {
    height: 100%;
    max-height: 470px;
    width: 100%;
    max-width: 320px;
  }
  &__title {
    color: #171a1f;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
  }
  &__inputs {
    height: 330px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
    max-width: 320px;
  }
  &__input {
    width: 100%;
    &_warning {
      border: 1px solid #ff0000;
    }
    &_img {
      margin: 0 auto;
      cursor: pointer;
      width: 96px;
      height: 96px;
      background-color: #f2f3f5;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__btn {
    display: block;
    margin: 0 auto;
    margin-top: 32px;
    cursor: pointer;
    border: none;
    padding: 8px 24px;
    background-color: #248bf2;
    color: #fff;
    border-radius: 8px;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  &__loginLink {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    color: #248bf2;
    text-transform: uppercase;
  }
}
</style>
