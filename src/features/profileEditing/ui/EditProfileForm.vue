<template>
  <Form @submit="onSubmit" :validation-schema="validateSchema">
    <InputText
      @keydown.space.prevent
      :maxLength="15"
      v-bind="inputsForm.fileds.firstName"
    />
    <InputText
      :maxLength="15"
      @keydown.space.prevent
      v-bind="inputsForm.fileds.secondName"
    />
  </Form>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';

const validateSchema = yup.object({
  firstName: yup
    .string()
    .notRequired()
    .min(2)
    .matches(/^[A-ZА-ЯЁ]+$/i, 'Нельзя использовать цифры')
    .nullable()
    .transform((value) => (value ? value : null)),
  secondName: yup
    .string()
    .notRequired()
    .min(2)
    .matches(/^[A-ZА-ЯЁ]+$/i, 'Нельзя использовать цифры')
    .nullable()
    .transform((value) => (value ? value : null))
});

async function onSubmit(value: Record<string, any>) {}

const inputsForm = ref({
  fileds: {
    firstName: {
      name: 'firstName',
      placeholder: 'Имя'
    },
    secondName: {
      name: 'secondName',
      placeholder: 'Фамилия'
    }
  }
});
</script>
<style scoped lang="scss"></style>
