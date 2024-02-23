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
    <CustomLoader v-if="isLoading" />
  </div>
  <ToastrModal />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { isAxiosError } from 'axios';
import { useRouter } from 'vue-router';
import { Form } from 'vee-validate';
import { string } from 'yup';

import { SessionModel, SessionApi } from 'entities/session';
import { UserModel } from 'entities/user';
import ToastrModal from 'shared/ui/toastrModel';
import InputText from 'shared/ui/InputText';
import InputPassword from 'shared/ui/InputPassword';
import useToastr from 'shared/lib/useToastr';

const router = useRouter();
const sessionStore = SessionModel.useSessionStore();
const userStore = UserModel.useUserStore();
const toastr = useToastr();

const urlHistory = userStore.userUrlHistory;
const isLoading = ref(false);

const inputsForm = ref({
  fileds: {
    email: {
      name: 'email',
      placeholder: 'Email',
      rules: string().required().email('Неправильный формат почты!')
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
    isLoading.value = true;
    const response = await SessionApi.login(values);
    const tokens = response.data;

    sessionStore.setAccessToken(tokens.access);
    sessionStore.setViewer(response.data);
    // TODO: Надо сделать страницу 404 ,потом поставить ограничения,иначе будет после логинки на неё перекидывать
    const routeToPush =
      urlHistory && urlHistory !== '/login' ? urlHistory : '/';
    await router.push({ path: routeToPush });
    toastr.success(
      { status: 'Вход', text: 'Вы успешно вошли в аккаунт!' },
      3000
    );
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
</script>
<style lang="scss" scoped>
.login {
  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
  }
  &__form {
    padding: 24px;
    border-radius: 15px;
    overflow: hidden;
    width: 100%;
    max-width: 320px;
    position: relative;
    background-color: #fff;
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
