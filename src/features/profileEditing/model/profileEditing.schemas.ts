import * as yup from 'yup';

export const validateEditProfileForm = yup.object({
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
    .transform((value) => (value ? value : null)),
  thirdName: yup
    .string()
    .notRequired()
    .min(2)
    .matches(/^[A-ZА-ЯЁ]+$/i, 'Нельзя использовать цифры')
    .nullable()
    .transform((value) => (value ? value : null)),
  userStatus: yup
    .string()
    .notRequired()
    .nullable()
    .transform((value) => (value ? value : null)),
  userLocation: yup
    .string()
    .notRequired()
    .nullable()
    .transform((value) => (value ? value : null)),
  nickname: yup
    .string()
    .notRequired()
    .nullable()
    .transform((value) => (value ? value : null)),
  year: yup
    .number()
    .notRequired()
    .min(1900, 'Год рождения должен быть больше, чем 1899')
    .max(2005, 'Год рождения должен быть меньше, чем 2006')
    .nullable()
    .transform((value) => (value ? value : null))
});
