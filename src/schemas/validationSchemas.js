import * as Yup from 'yup';

const EMAIL_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PASSWORD_PATTERN = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;

export const registerSchema = Yup.object({
  name: Yup.string().trim().required("Ім'я обов'язкове"),
  email: Yup.string().matches(EMAIL_PATTERN, 'Некоректний email').required("Email обов'язковий"),
  password: Yup.string()
    .matches(PASSWORD_PATTERN, 'Пароль має містити мінімум 6 літер та 1 цифру, 7+ символів')
    .required("Пароль обов'язковий"),
});

export const loginSchema = Yup.object({
  email: Yup.string().matches(EMAIL_PATTERN, 'Некоректний email').required("Email обов'язковий"),
  password: Yup.string().matches(PASSWORD_PATTERN, 'Некоректний пароль').required("Пароль обов'язковий"),
});
