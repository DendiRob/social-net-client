<template>
  <div class="reg-wrapper">
    <form name="reg-form" class="reg__form" @submit.prevent="onSubmit">
      <div class="reg__title">New account</div>
      <div class="reg__inputs">
          <label class="reg__input reg__input_img" for="addPhoto">
            <input id="addPhoto" name="addPhoto" type="image" :src=addPhotoUrl  alt="add photo" />
          </label>
        <AuthInput
          class="reg__input"
          v-model="emailInput"
          placeholder="Email"
        />
        <AuthInput
          class="reg__input"
          v-model="passInput"
          placeholder="Password"
        />
        <AuthInput
          class="reg__input"
          v-model="confirmPassInput"
          placeholder="Repeat password"
        />
      </div>
      <button class="reg__btn" type="submit">Registration</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AuthInput from '@/components/AuthInput.vue';
import addPhotoUrl from "@/assets/add-photo.svg";

const emailInput = ref('');
const passInput = ref('');
const confirmPassInput = ref('');

function onSubmit() {}
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
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 28px;
    max-width: 320px;
  }
  &__input {
    width: 100%;
    &_img {
      margin: 0 auto;
      cursor: pointer;
      width: 96px;
      height: 96px;
      background-color: #F2F3F5;
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
    background-color: #248BF2;
    color: #FFF;
    border-radius: 8px;
    font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: 24px;

  }
}
</style>
