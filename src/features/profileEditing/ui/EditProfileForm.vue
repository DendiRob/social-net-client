<template>
  <div class="profile__subtitle">Информция</div>
  <Form
    class="profile__form"
    :validation-schema="validateEditProfileForm"
    @submit="onSubmit"
  >
    <InputText
      class="profile__input"
      @keydown.space.prevent
      v-bind="introductionInputs.firstName"
      v-model="introductionInputs.firstName.value"
    />
    <InputText
      class="profile__input"
      @keydown.space.prevent
      v-bind="introductionInputs.secondName"
      v-model="introductionInputs.secondName.value"
    />
    <InputText
      class="profile__input"
      @keydown.space.prevent
      v-bind="introductionInputs.thirdName"
      v-model="introductionInputs.thirdName.value"
    />
    <InputText
      class="profile__input"
      @keydown.space.prevent
      v-bind="introductionInputs.userStatus"
      v-model="introductionInputs.userStatus.value"
    />
    <InputText
      class="profile__input"
      @keydown.space.prevent
      v-bind="introductionInputs.userLocation"
      v-model="introductionInputs.userLocation.value"
    />
    <CustomTextarea
      class="profile__aboutMe"
      v-bind="introductionInputs.aboutMe"
      v-model="introductionInputs.aboutMe.value"
    />
    <div class="profile__subtitle">Имя пользователя</div>
    <InputText
      class="profile__input"
      @keydown.space.prevent
      :options="{ validateOnValueUpdate: false }"
      v-bind="introductionInputs.nickname"
      v-model="introductionInputs.nickname.value"
    />
    <div class="profile__subtitle">День рождения</div>
    <div class="profile__birthday">
      <CustomDropdown
        class="days"
        v-bind="birthdayInputs.day"
        v-model="birthdayInputs.day.value"
        :options="daysByMonth"
        :disabled="birthdayInputs.month.value === '' || !isYearFilled"
      />
      <CustomDropdown
        class="months"
        v-bind="birthdayInputs.month"
        v-model="birthdayInputs.month.value"
        :options="monthsOfYear"
        :disabled="!isYearFilled"
      />
      <InputNumber
        class="years"
        @keydown.space.prevent
        v-bind="birthdayInputs.year"
        v-model="birthdayInputs.year.value"
      />
    </div>
    <CustomBtn type="submit" size="large">Сохранить изменения</CustomBtn>
  </Form>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { computed, ref, watch } from 'vue';

import CustomTextarea from 'shared/ui/customTextarea';
import CustomDropdown from 'shared/ui/customDropdown';

import { validateEditProfileForm } from '../model/profileEditing.schemas';
import { monthsOfYear } from '../model/consts';
import useToastr from 'shared/lib/useToastr';
import { profileModel } from 'entities/profile';
import { storeToRefs } from 'pinia';
import type { IBirthdayInputs } from '../model/types';

const toastr = useToastr();
const profileStore = profileModel.useProfileStore();

const {
  firstName,
  secondName,
  thirdName,
  nickname,
  userStatus,
  userLocation,
  birthday,
  aboutMe
} = storeToRefs(profileStore);

const introductionInputs = ref({
  firstName: {
    name: 'firstName',
    placeholder: 'Имя',
    value: firstName,
    maxLength: 15
  },
  secondName: {
    name: 'secondName',
    placeholder: 'Фамилия',
    value: secondName,
    maxLength: 15
  },
  thirdName: {
    name: 'thirdName',
    placeholder: 'Отчество (если есть)',
    value: thirdName,
    maxLength: 15
  },
  userStatus: {
    name: 'userStatus',
    placeholder: 'Статус',
    maxLength: 30,
    value: userStatus
  },
  userLocation: {
    name: 'userLocation',
    placeholder: 'Место проживания',
    value: userLocation,
    maxLength: 30
  },
  nickname: {
    name: 'nickname',
    placeholder: 'Введите имя пользователя ',
    value: nickname,
    maxLength: 30
  },
  aboutMe: {
    value: aboutMe,
    placeholder: 'Обо мне',
    maxLength: 430
  }
});
// TODO: сделать дропдауны полями vee-validate
const birthdayInputs = ref<IBirthdayInputs>({
  year: {
    value: undefined,
    name: 'year',
    placeholder: 'Год',
    maxLength: 4
  },
  day: {
    value: '',
    placeholder: 'День',
    maxHeight: 200
  },
  month: {
    value: '',
    placeholder: 'Месяц',
    maxHeight: 200
  }
});

function getDaysInMonth(year: number, month: number) {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  return lastDayOfMonth.getDate();
}

const daysByMonth = computed(() => {
  const month = monthsOfYear.findIndex(
    (month) => month === birthdayInputs.value.month.value
  );
  if (birthdayInputs.value.year.value === undefined) return [];
  const years = +birthdayInputs.value.year.value;

  const finishDay = getDaysInMonth(years, month);

  const days = Array.from({ length: finishDay }, (_, index) => index + 1);
  return days;
});

async function onSubmit(value: Record<string, any>) {
  const years = value.year;
  const month = birthdayInputs.value.month.value;
  const day = birthdayInputs.value.day.value ?? '';

  if (years && (month === '' || day === '')) {
    toastr.error({
      text: 'Заполните дату рождения полностью!'
    });
    return;
  }

  const data = value;
  if (years) {
    const monthByIndex = monthsOfYear.findIndex((i) => i === month);
    const transformDate = new Date(years, monthByIndex, +day);
    data.birthday = transformDate.toISOString();
    delete value.year;
  }

  console.log(data);
}

const isYearFilled = computed(() => {
  if (birthdayInputs.value.year.maxLength === undefined) return;
  const isFilled =
    birthdayInputs.value.year.value === undefined ||
    String(birthdayInputs.value.year.value).length <
      birthdayInputs.value.year.maxLength;
  return !isFilled;
});

watch(birthday, () => {
  if (birthday.value !== null) {
    const splitBirthday = new Date(birthday.value);
    const year = splitBirthday.getFullYear();
    const month = splitBirthday.getMonth();
    const day = splitBirthday.getDate();

    birthdayInputs.value.year.value = year;
    birthdayInputs.value.month.value = monthsOfYear[month];
    birthdayInputs.value.day.value = day;
  }
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
