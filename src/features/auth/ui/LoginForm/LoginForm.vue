<template>
  <div class="reg-wrapper">
    <form name="reg-form" class="reg__form" @submit.prevent="onSubmit">
      <div class="reg__title">Sign in</div>
      <div class="reg__inputs">
        <Input
          @keydown.space.prevent
          @input="emailInputChecker = false"
          :class="['reg__input', { reg__input_warning: emailInputChecker }]"
          v-model="emailInput"
          placeholder="Email"
        />
        <Input
          @keydown.space.prevent
          @input="passInputChecker = false"
          :class="['reg__input', { reg__input_warning: passInputChecker }]"
          v-model="passInput"
          placeholder="Password"
        />
      </div>
      <button class="reg__btn" type="submit">Login</button>
      <RouterLink :to="{ name: 'reg' }" class="reg__loginLink"
        >Sign up</RouterLink
      >
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { SessionModel, SessionApi } from 'entities/session';
import Input from 'shared/ui/Input';
import axios from 'axios';

const sessionStore = SessionModel.useSessionStore();

const emailInput = ref('');
const emailInputChecker = ref(false);

const passInput = ref('');
const passInputChecker = ref(false);

function validateField(value: string, inputChecker: Ref<Boolean>) {
  if (value == '') {
    inputChecker.value = true;
    return false;
  } else {
    inputChecker.value = false;
    return true;
  }
}

function validateForm() {
  const fieldsToValidate = [
    { value: emailInput.value, checker: emailInputChecker },
    { value: passInput.value, checker: passInputChecker }
  ];

  const emptyFields = fieldsToValidate.map(({ value, checker }) =>
    validateField(value, checker)
  );

  if (emptyFields.includes(false)) return false;

  return true;
}

async function onSubmit() {
  try {
    const loginDto = {
      email: emailInput.value,
      password: passInput.value
    };
    if (!validateForm()) return;
    const response = await SessionApi.login(loginDto);
    const tokens = response.data;

    sessionStore.setAccessToken(tokens.access);
    sessionStore.setUser(response.data);

    emailInput.value = '';
    passInput.value = '';
  } catch (error) {
    // заменить на тостер
    if (axios.isAxiosError(error)) {
      const apiErrors = error.response?.data;
      const newErrors = apiErrors.errors.join('\n');
      alert(newErrors);
    }
    console.log(error);
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
