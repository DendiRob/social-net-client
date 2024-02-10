<template>
  <div class="login-wrapper">
    <Form name="login-form" class="login__form" @submit="onSubmit">
      <div class="login__title">Sign in</div>
      <div class="login__inputs">
        <InputText
          @keydown.space.prevent
          :class="['login__input']"
          v-bind="inputsForm.fileds.email"
        />
        <InputPassword
          class="login__input"
          v-bind="inputsForm.fileds.password"
        />
      </div>
      <button class="login__btn" type="submit">Login</button>
      <RouterLink :to="{ name: 'reg' }" class="login__loginLink"
        >Sign up</RouterLink
      >
    </Form>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { isAxiosError } from 'axios';
import { useRouter } from 'vue-router';
import { Form } from 'vee-validate';

import { SessionModel, SessionApi } from 'entities/session';
import { UserModel } from 'entities/user';
import InputText from 'shared/ui/InputText';
import InputPassword from 'shared/ui/InputPassword';
import { string } from 'yup';

const router = useRouter();
const sessionStore = SessionModel.useSessionStore();
const userStore = UserModel.useUserStore();

const urlHistory = userStore.userUrlHistory;

const inputsForm = ref({
  fileds: {
    email: {
      name: 'email',
      placeholder: 'Email',
      rules: string().email('Неправильный формат почты!').required()
    },
    password: {
      name: 'password',
      placeholder: 'Password',
      rules: string().required('Введите пароль')
    }
  }
});

async function onSubmit(values: Record<string, any>) {
  try {
    const response = await SessionApi.login(values);
    const tokens = response.data;

    sessionStore.setAccessToken(tokens.access);
    sessionStore.setViewer(response.data);

    const routeToPush =
      urlHistory && urlHistory !== '/login' ? urlHistory : '/';
    router.push({ path: `${routeToPush}` });
  } catch (error) {
    // заменить на тостер
    if (isAxiosError(error)) {
      const apiErrors = error.response?.data;
      const newErrors = apiErrors.errors.join('\n');
      alert(newErrors);
    }
    console.log(error);
  }
}
</script>
<style lang="scss" scoped>
.login {
  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  &__form {
    height: 100%;
    max-height: 280px;
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
    height: 120px;
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
shared/ui/InputText
