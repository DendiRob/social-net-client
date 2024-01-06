<template>
  <div class="reg-wrapper">
    <form name="reg-form" class="reg__form" @submit.prevent="onSubmit">
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
        <AuthInput
          @keydown.space.prevent
          @input="emailInputChecker = false"
          :class="['reg__input', { reg__input_warning: emailInputChecker }]"
          v-model="emailInput"
          placeholder="Email"
        />
        <AuthInput
          @keydown.space.prevent
          @input="nameInputChecker = false"
          :class="['reg__input', { reg__input_warning: nameInputChecker }]"
          v-model="nameInput"
          placeholder="Name"
        />
        <AuthInput
          @keydown.space.prevent
          @input="passInputChecker = false"
          :class="['reg__input', { reg__input_warning: passInputChecker }]"
          v-model="passInput"
          placeholder="Password"
        />
        <AuthInput
          @keydown.space.prevent
          @input="confirmInputChecker = false"
          :class="['reg__input', { reg__input_warning: confirmInputChecker }]"
          v-model="confirmPassInput"
          placeholder="Repeat password"
        />
      </div>
      <button class="reg__btn" type="submit">Registration</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { registration } from 'services/AuthService.js';
import AuthInput from 'components/AuthInput.vue';
import addPhotoUrl from 'assets/add-photo.svg';
import axios from 'axios';

const emailInput = ref('');
const emailInputChecker = ref(false);

const nameInput = ref('');
const nameInputChecker = ref(false);

const passInput = ref('');
const passInputChecker = ref(false);

const confirmPassInput = ref('');
const confirmInputChecker = ref(false);

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
    { value: nameInput.value, checker: nameInputChecker },
    { value: passInput.value, checker: passInputChecker },
    { value: confirmPassInput.value, checker: confirmInputChecker }
  ];

  const emptyFields = fieldsToValidate.map(({ value, checker }) =>
    validateField(value, checker)
  );

  if (emptyFields.includes(false)) return false;

  if (passInput.value !== confirmPassInput.value) {
    confirmInputChecker.value = true;
    return false;
  }

  return true;
}

async function onSubmit() {
  try {
    const regDto = {
      email: emailInput.value,
      name: nameInput.value,
      password: passInput.value
    };
    if (validateForm()) await registration(regDto);
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
<style lang="scss">
.reg {
  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  &__form {
    height: 100%;
    max-height: 370px;
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
    margin-top: 28px;
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
}
</style>
