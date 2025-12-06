import { Roles } from 'constant/common.constant';
import { RolesType } from 'reduxStore/types';
import * as Yup from 'yup';

export const editUserValidationSchema = (role?: RolesType) => {

  return Yup.object().shape({
    ...(role === Roles.Organization
      ? { name: Yup.string().trim().min(3, 'Name must be at least 3 characters') }
      : {
        first_name: Yup.string()
          .trim()
          .min(3, 'First name must be at least 3 characters')
          .required("First name is Required")
          .min(2, "First name must be at least 2 characters")
          .max(50, "First name must be less than 15 characters"),
        last_name: Yup.string()
          .trim()
          .required("Last name is Required")
          .min(3, "Last name must be at least 3 characters"),
      }),
    email: Yup.string()
      .trim()
      .email("Invalid email format")
      .required("Email is Required"),
  });
};
