import * as Yup from 'yup';

// Patterns copied verbatim from the ТЗ
const EMAIL_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PASSWORD_PATTERN = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;
const EN_PATTERN = /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/;
const UA_PATTERN = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u;

export const registerSchema = Yup.object({
  name: Yup.string().trim().required("Ім'я обов'язкове"),
  email: Yup.string()
    .matches(EMAIL_PATTERN, 'Некоректний email')
    .required("Email обов'язковий"),
  password: Yup.string()
    .matches(
      PASSWORD_PATTERN,
      'Пароль має містити мінімум 6 літер та 1 цифру, 7+ символів'
    )
    .required("Пароль обов'язковий"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(EMAIL_PATTERN, 'Некоректний email')
    .required("Email обов'язковий"),
  password: Yup.string()
    .matches(PASSWORD_PATTERN, 'Некоректний пароль')
    .required("Пароль обов'язковий"),
});

export const addWordSchema = Yup.object({
  category: Yup.string().required("Категорія обов'язкова"),
  isIrregular: Yup.boolean().nullable(),
  en: Yup.string()
    .matches(EN_PATTERN, 'Використовуйте латинські літери')
    .required("Поле обов'язкове"),
  ua: Yup.string()
    .matches(UA_PATTERN, 'Використовуйте кириличні літери')
    .required("Поле обов'язкове"),
});

export const editWordSchema = Yup.object({
  en: Yup.string()
    .matches(EN_PATTERN, 'Використовуйте латинські літери')
    .required("Поле обов'язкове"),
  ua: Yup.string()
    .matches(UA_PATTERN, 'Використовуйте кириличні літери')
    .required("Поле обов'язкове"),
});
