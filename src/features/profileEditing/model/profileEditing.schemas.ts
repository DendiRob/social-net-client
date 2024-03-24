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
  username: yup.string().required('Это поле не может быть пустым'),
  years: yup
    .number()
    .transform((v: number) => (isNaN(v) ? undefined : v))
    .min(1900, 'Год рождения должен быть в диапазоне от 1900 до 2006')
    .max(2006, 'Год рождения должен быть в диапазоне от 1900 до 2006')
    .notRequired()
});
