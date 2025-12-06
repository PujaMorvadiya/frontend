import * as Yup from 'yup';

export const EmailValidationSchema = (emails: string[]) => {

  return Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .test(
        'email-duplicate',
        "Email already present",
        (value) => {
          if (value && emails.includes(value)) {
            return false;
          }
          return true;
        }
      ),
  });
};
