import * as Yup from 'yup';

const EMAIL_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PASSWORD_PATTERN = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;

export const registerSchema = Yup.object({
  name: Yup.string().trim().required("Ім'я обов'язкове"),
  email: Yup.string().matches(EMAIL_PATTERN, 'Некоректний email').required("Email обов'язковий"),
  password: Yup.string()
    .matches(PASSWORD_PATTERN, 'Пароль має містити рівно 7 символів: 6 латинських літер поспіль та щонайменше 1 цифру')
    .required("Пароль обов'язковий"),
});

export const loginSchema = Yup.object({
  email: Yup.string().matches(EMAIL_PATTERN, 'Некоректний email').required("Email обов'язковий"),
  password: Yup.string().matches(PASSWORD_PATTERN, 'Некоректний пароль').required("Пароль обов'язковий"),
});

const EN_PATTERN = /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/;
const UA_PATTERN = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u;

export const addWordSchema = Yup.object({
  category: Yup.string().required("Категорія обов'язкова"),
  isIrregular: Yup.boolean().when('category', {
    is: 'verb',
    then: (schema) => schema.required("Оберіть тип дієслова"),
    otherwise: (schema) => schema.notRequired(),
  }),
  en: Yup.string().trim().matches(EN_PATTERN, 'Тільки латинські літери').required("Поле обов'язкове"),
  ua: Yup.string().trim().matches(UA_PATTERN, 'Тільки кириличні літери').required("Поле обов'язкове"),
});

export const editWordSchema = Yup.object({
  en: Yup.string().trim().matches(EN_PATTERN, 'Тільки латинські літери').required("Поле обов'язкове"),
  ua: Yup.string().trim().matches(UA_PATTERN, 'Тільки кириличні літери').required("Поле обов'язкове"),
});
