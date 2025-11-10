import {
  LoginSchemaError,
  UserSchemaErrorMessage,
} from 'constant/formErrorMessage.constant';
import TLDs from 'global-tld-list/dist/index.js';
import * as yup from 'yup';

const {
  first_name,
  last_name,
  password,
  //  phone,
  email,
  birth_date,
} = UserSchemaErrorMessage;

const globalEmailTestValidate = (v: string | null | undefined): boolean => {
  const tld = (v || '').split('.').pop()?.toLowerCase() || '';
  return Array.isArray(TLDs) && TLDs.includes(tld);
};

export const basicInfoSchema = {
  first_name: yup
    .string()
    .trim()
    .required(first_name)
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters'),
  last_name: yup
    .string()
    .trim()
    .required(last_name)
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters'),
  password: yup
    .string()
    .required(password.required)
    .min(8, password.minLengthReq)
    .matches(/[A-Z]/, password.upperReq)
    .matches(/[a-z]/, password.lowerReq)
    .matches(/\d/, password.numberReq)
    .matches(/[\W_]/, password.specialCharReq),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], password.matchReq)
    .required(password.confirm_required),
  // phone: yup
  //   .string()
  //   .test('mobile', phone.valid, (value) => {
  //     if (value !== undefined && value && value.split(' ').length > 1) {
  //       const countryCode: string | undefined = value
  //         ?.split(' ')[0]
  //         .substring(1, value?.split(' ')[0].length)
  //         .toString();
  //       let countryShortCode: CountryCode | CountryCode[] = 'IN';
  //       if (countryCode) countryShortCode = phoneCountryJson[countryCode];

  //       return yup.string().phone(countryShortCode).isValid(value);
  //     }
  //     return true;
  //   })
  //   .nullable(true)
  //   .transform((value, originalVal) => {
  //     if (originalVal && value.split(' ').length === 1) {
  //       return null;
  //     }
  //     return originalVal;
  //   }),
  email: yup
    .string()
    .required(email.required)
    .lowercase()
    .email(email.valid)
    .test('email', email.valid, globalEmailTestValidate),
  birth_date: yup.string().required(birth_date),
  // stringAndNumber: yup.lazy((value) => {
  //   switch (typeof value) {
  //     case 'number':
  //       return yup.number();
  //     case 'string':
  //       return yup.string();
  //     default:
  //       return yup.mixed();
  //   }
  // }),
};

export const registerSchema = yup
  .object({
    first_name: basicInfoSchema.first_name,
    last_name: basicInfoSchema.last_name,
    password: basicInfoSchema.password,
    confirmPassword: basicInfoSchema.confirmPassword,
    // phone: basicInfoSchema.phone,
    email: basicInfoSchema.email,
    birth_date: basicInfoSchema.birth_date,
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required(LoginSchemaError.email.required)
      .email(LoginSchemaError.email.valid)
      .lowercase(),
    password: yup.string().required(LoginSchemaError.password),
  })
  .required();

export const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .required(LoginSchemaError.email.required)
      .email(LoginSchemaError.email.valid)
      .lowercase(),
  })
  .required();

export const resetPasswordSchema = yup
  .object({
    password: basicInfoSchema.password,
    confirmPassword: basicInfoSchema.confirmPassword,
  })
  .required();
