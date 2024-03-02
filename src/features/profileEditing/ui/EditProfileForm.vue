<template>
  <Form @submit="onSubmit" :validation-schema="validateEditProfileForm">
    <InputText @keydown.space.prevent v-bind="inputsForm.fileds.firstName" />
    <InputText @keydown.space.prevent v-bind="inputsForm.fileds.secondName" />
    <InputText @keydown.space.prevent v-bind="inputsForm.fileds.userStatus" />
    <InputText @keydown.space.prevent v-bind="inputsForm.fileds.userLocation" />
  </Form>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { validateEditProfileForm } from '../model/profileEditing.schemas.';

async function onSubmit(value: Record<string, any>) {}

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
</script>
<style scoped lang="scss"></style>
../model/profileEditing.schemas.
