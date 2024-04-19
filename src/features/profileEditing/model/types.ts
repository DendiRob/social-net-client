import type { Ref } from 'vue';

interface Field {
  name?: string;
  placeholder: string;
  value: string | number | undefined | Ref<string>; // Тип значения может быть строкой, числом или undefined
  maxHeight?: number;
  maxLength?: number;
}

export interface IBirthdayInputs {
  year: Field;
  day: Field;
  month: Field;
}

export interface IUserProfileUpdate {
  birthday: Date | null;
  firstName: string | null;
  nickname: string | null;
  aboutMe: string | null;
  secondName: string | null;
  thirdName: string | null;
  userLocation: string | null;
  userStatus: string | null;
}
