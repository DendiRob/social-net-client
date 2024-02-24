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
        <div class="reg__input reg__input_img" @click="imageInput?.click">
          <img
            :src="avatarUrl"
            alt="avatar"
            :class="{ defaultAvatar: !selectedAvatar }"
          />
          <div
            @click.stop="deleteAvatar"
            :class="['deleteAvatar', { showDeleteAvatar: selectedAvatar }]"
          >
            <SvgIcon name="close" />
          </div>
          <input
            class="input-hidden"
            type="file"
            accept=".png,.jpg,.jpeg"
            ref="imageInput"
            alt="set avatar"
            @change="setAvatar"
          />
        </div>
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
  <CustomLoader v-if="isLoading" />
  <ToastrModal />
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Form } from 'vee-validate';
import * as yup from 'yup';

import InputPassword from 'shared/ui/InputPassword';
import ToastrModal from 'shared/ui/toastrModel';
import InputText from 'shared/ui/InputText';
import addPhoto from 'shared/ui/assets/add-photo.svg';
import useToastr from 'shared/lib/useToastr';
import { SessionModel, SessionApi } from 'entities/session';

const router = useRouter();
const sessionStore = SessionModel.useSessionStore();
const toastr = useToastr();

const isLoading = ref(false);
const imageInput = ref<any>();
const selectedAvatar = ref<unknown>(null);

const avatarUrl = computed(() => {
  if (selectedAvatar.value === null) {
    return addPhoto;
  } else {
    return URL.createObjectURL(selectedAvatar.value as Blob | MediaSource);
  }
});

function setAvatar(e: Event) {
  const inputTarget = e.target as HTMLInputElement;
  if (inputTarget?.files === null) return;

  selectedAvatar.value = inputTarget.files[0];
}

function deleteAvatar() {
  if (imageInput.value === undefined) return;
  const list = new DataTransfer();

  imageInput.value.files = list.files;
  selectedAvatar.value = null;
}

async function onSubmit(value: Record<string, any>) {
  try {
    isLoading.value = true;

    let formData = new FormData();

    for (let key in value) {
      formData.append(key, value[key]);
    }

    formData.append('file', selectedAvatar.value as Blob);

    const response = await SessionApi.registration(formData);
    const tokens = response.data;

    sessionStore.setAccessToken(tokens.access);
    sessionStore.setViewer(response.data);
    await router.push({ name: 'home' });

    toastr.success(
      {
        status: 'Регистрация',
        text: 'Регистрация прошла успешно!'
      },
      3000
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiErrors = error.response?.data;
      const errorText = apiErrors?.payload[0] ?? 'Что-то пошло не так!';
      return toastr.error({ text: errorText });
    }
    return toastr.error({ text: 'Что-то пошло не так' });
  } finally {
    isLoading.value = false;
  }
}

// TODO: Указывать сообщения об ошибке сверху поля
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
</script>
<style lang="scss" scoped>
.reg {
  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
  }
  &__form {
    width: 100%;
    max-width: 320px;
    padding: 24px;
    background-color: #fff;
    border-radius: 15px;
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
      overflow: hidden;
      position: relative;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      &:hover {
        .showDeleteAvatar {
          display: flex;
        }
      }
      .defaultAvatar {
        width: auto;
        height: auto;
      }
      .deleteAvatar {
        width: 100%;
        height: 100%;
        background-color: rgba(199, 0, 0, 0.5);
        position: absolute;
        display: none;
        justify-content: center;
        align-items: center;
        svg {
          color: #f2f3f5;
          width: 40px;
          height: 40px;
        }
      }
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
.input-hidden {
  opacity: 0;
  margin: 0;
  padding: 0;
  height: 0;
  width: 0;
  line-height: 0;
  overflow: hidden;
}
</style>
shared/ui/toastrModel
