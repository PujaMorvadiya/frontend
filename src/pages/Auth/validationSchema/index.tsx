import { subYears } from 'date-fns';
import { getDateDifference } from 'pages/utils';
import * as Yup from 'yup';

// Email Validation
export const emailValidation = () => {
  return Yup.string()
    .trim()
    .email('Invalid Email')
    .max(255, 'Email should not exceed 255 characters')
    .required('Email is required')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
      'Invalid Email'
    );
};

// Password Validation
export const passwordValidation = (isLogin?: boolean) => {
  return Yup.string()
    .trim()
    .required('Password is required')
    .min(
      8,
      isLogin
        ? 'Invalid Credentials'
        : 'Password must contains at least 8 characters'
    )
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,

      isLogin
        ? 'Invalid Credentials'
        : 'Password must contain uppercase and lowercase letters'
    )
    .matches(
      /\d/,
      isLogin
        ? 'Invalid Credentials'
        : 'Password must contains a number'
    )
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      isLogin
        ? 'Invalid Credentials'
        : 'Password must contains a special character'
    );
};

// Confirm Password validation
export const confirmPasswordValidation = () => {
  return Yup.string()
    .required('Confirm Password is required')
    .oneOf(
      [Yup.ref('password')],
      'Passwords do not match'
    );
};

// Register Validation
// export const RegisterValidationSchema = () => {
//   return Yup.object().shape({
//     email: emailValidation(),
//     password: passwordValidation(),
//     confirm_password: confirmPasswordValidation(),
//     profile_image: Yup.string(),
//     first_name: Yup.string()
//       .trim()
//       .matches(/^[A-Za-z]+$/, 'First Name should contain only alphabets')
//       .required('First Name is required')
//       .min(2, 'First name must be at least 2 characters')
//       .max(15, 'First name must be less than 15 characters'),
//     last_name: Yup.string()
//       .trim()
//       .matches(/^[A-Za-z]+$/,'Last Name should contain only alphabets')
//       .required('Last Name is required')
//       .min(2,'Last name must be at least 2 characters')
//       .max(15, 'Last name must be less than 15 characters'),
//     language: Yup.string().required(),
//     date_of_birth: Yup.date()
//       .required('Date of Birth is required')
//       .max(subYears(new Date(), 3), 'Please enter a valid Date of Birth'),
//   });
// };

export const RegisterValidationSchema = () => {
  return Yup.object().shape({
    fname: Yup.string()
      .trim()
      .matches(/^[A-Za-z]+$/, 'First Name should contain only alphabets')
      .required('First Name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(15, 'First name must be less than 15 characters'),
    lname: Yup.string()
      .trim()
      .matches(/^[A-Za-z]+$/, 'Last Name should contain only alphabets')
      .required('Last Name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(15, 'Last name must be less than 15 characters'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'At least 6 chars')
      .required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    // date_of_birth: Yup.date()
    //   .required('Date of Birth is required')
    //   .max(subYears(new Date(), 3), 'Please enter a valid Date of Birth'),
    agree: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });
};


// Login Validation
export const LoginValidationSchema = () => {
  return Yup.object().shape({
    email: emailValidation(),
    password: passwordValidation(true),
    acceptTermsAndCondition: Yup.boolean(),
  });
};

// Forgot Password Validation
export const ForgotPasswordValidationSchema = () => {
  return Yup.object().shape({
    email: emailValidation(),
  });
};

// Reset Password Validation
export const ResetPasswordValidationSchema = () => {
  return Yup.object().shape({
    password: passwordValidation(),
    confirmPassword: confirmPasswordValidation(),
  });
};