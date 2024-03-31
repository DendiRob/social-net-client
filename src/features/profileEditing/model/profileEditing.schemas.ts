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
    .date()
    .notRequired()
    .nullable()
    .transform((value) => (value ? value : null))
});
