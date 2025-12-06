import { OrganizationTypeEnum, Roles } from 'constant/common.constant';
import { RolesType } from 'reduxStore/types';
import * as Yup from 'yup';

export const getValidationSchema = (
  role: RolesType,
  regionalCenterTypeId: string | null
) => {

  const baseSchema = Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .min(3, "First name must be at least 3 characters")
      .required("First name is Required")
      .min(2, "First name must be at least 2 characters",)
      .max(50, "First name must be less than 15 characters"),
    last_name:
      role !== Roles.Organization
        ? Yup.string()
          .trim()
          .required("Last name is Required")
          .min(3, "Last name must be at least 3 characters")
        : Yup.string().optional(),
    email: Yup.string()
      .trim()
      .email("Invalid email format")
      .required("Email is Required"),
    profile_image: Yup.string().trim(),
  });

  switch (role) {
    case Roles.Organization:
      return baseSchema.shape({
        organizationType: Yup.string().required(
          "Organization Type is required",
        ),
        payment_portal_url: Yup.string()
          .nullable()
          .when('organizationType', {
            is: (organizationType: OrganizationTypeEnum) =>
              organizationType === regionalCenterTypeId,
            then: () =>
              Yup.string()
                .url(
                  "Link must be a valid URL",
                )
                .required(
                  "Payment portal Url is required",
                ),
          }),
        vender_number: Yup.string()
          .nullable()
          .when('organizationType', {
            is: (organizationType: OrganizationTypeEnum) =>
              organizationType === regionalCenterTypeId,
            then: () =>
              Yup.string().required(
                "Vender number is required",
              ),
          }),


      });


    case Roles.User:
      return baseSchema.shape({
        organizationIds: Yup.array().of(Yup.string()),
      });

    default:
      return baseSchema;
  }
};
