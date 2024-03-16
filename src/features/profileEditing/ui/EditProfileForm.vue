<template>
  <div class="profile__subtitle">Информция</div>
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
      v-bind="inputsForm.fileds.aboutMe"
      v-model="inputsForm.fileds.aboutMe.value"
    />
    <div class="profile__subtitle">Имя пользователя</div>
    <InputText
      class="profile__input"
      @keydown.space.prevent
      :options="{ validateOnValueUpdate: false }"
      v-bind="inputsForm.fileds.username"
    />
    <div class="profile__subtitle">День рождения</div>
    <div class="profile__birthday">
      <CustomDropdown
        class="days"
        v-bind="inputsForm.fileds.days"
        v-model="inputsForm.fileds.days.value"
        :disabled="inputsForm.fileds.month.value === '' || isYearFilled"
      />
      <CustomDropdown
        class="months"
        v-bind="inputsForm.fileds.month"
        v-model="inputsForm.fileds.month.value"
        :disabled="isYearFilled"
      />
      <InputNumber
        class="years"
        @keydown.space.prevent
        v-bind="inputsForm.fileds.years"
        v-model="inputsForm.fileds.years.value"
      />
    </div>
    <CustomBtn type="submit" size="large">Сохранить изменения</CustomBtn>
  </Form>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { computed, ref } from 'vue';

import CustomTextarea from 'shared/ui/customTextarea';
import CustomDropdown from 'shared/ui/customDropdown';

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
    },
    username: {
      name: 'username',
      placeholder: 'Введите имя пользователя ',
      maxLength: 30
    },
    years: {
      value: undefined,
      name: 'years',
      placeholder: 'Год',
      maxLength: 4
    },
    aboutMe: {
      value: '',
      placeholder: 'Обо мне',
      maxLength: 430
    },
    days: {
      value: '',
      placeholder: 'День',
      maxHeight: 200
    },
    month: {
      value: '',
      placeholder: 'Месяц',
      maxHeight: 200
    }
  }
});

const isYearFilled = computed(() => {
  // console.log(inputsForm.value.fileds.years.value);
  return (
    inputsForm.value.fileds.years.value === undefined ||
    String(inputsForm.value.fileds.years.value).length <
      inputsForm.value.fileds.years.maxLength
  );
});
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
  &__subtitle {
    font-weight: 700;
    font-size: 1.214rem;
    color: #171a1f;
    margin-bottom: 12px;
  }
  &__birthday {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    .days {
      min-width: 100px;
    }
    .months {
      margin: 0 16px;
      min-width: 190px;
    }
  }
}
</style>
