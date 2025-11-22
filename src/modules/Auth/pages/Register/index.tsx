import { Link, useNavigate } from "react-router";
import { Formik, Form } from "formik";
import { useAxiosPost } from "hooks/useAxios";
import { PUBLIC_NAVIGATION } from "constant/navigation.constant";
import { RegisterValidationSchema } from "modules/Auth/validationSchema";
import InputField from "components/FormElement/InputField";
import Checkbox from "components/FormElement/CheckBox";
import Button from "components/Button/Button";
import { useState } from "react";
import Icon from "components/Icon";


export default function SignUpForm() {
  const [createUserApi, { isLoading }] = useAxiosPost();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm_password: "",
    agree: false,
  };

  const onSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("first_name", values.fname.trim());
    formData.append("last_name", values.lname.trim());
    formData.append("email", values.email.trim());
    formData.append("password", values.password.trim());

    const { data, error } = await createUserApi("/auth/register", formData);

    if (data && !error) {
      navigate(PUBLIC_NAVIGATION.login);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <div className="flex flex-col justify-center w-full max-w-lg mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            Enter your email and password to sign up!
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={RegisterValidationSchema}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, setFieldTouched, handleBlur }) => (
              <Form>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <InputField
                    parentClass="mb-5"
                    name="fname"
                    label="First Name"
                    placeholder="Enter your first name"
                    type="text"
                    value={values.fname}
                    isCompulsory
                  />
                  <InputField
                    parentClass="mb-5"
                    name="lname"
                    label="Last Name"
                    placeholder="Enter your last name"
                    type="text"
                    value={values.lname}
                    isCompulsory
                  />
                </div>


                <InputField
                  parentClass="mb-5"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="text"
                  value={values.email}
                  isCompulsory
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <InputField
                    parentClass="mb-5"
                    name="password"
                    label="password"
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    icon={
                      <Button
                        className="cursor-pointer w-5 h-5 text-grayText"
                        onClickHandler={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          className="w-full h-full"
                          name={showPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                        />
                      </Button>
                    }
                    onChange={(e) => {
                      if (e.target.value.includes('#')) {
                        e.target.value = e.target.value.replace('#', '');
                      }
                      handleChange(e);
                    }}
                    isCompulsory
                  />
                  <InputField
                    parentClass="mb-5"
                    name="confirm_password"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={values.confirm_password}
                    icon={
                      <Button
                        className="cursor-pointer w-5 h-5 text-grayText"
                        onClickHandler={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Icon
                          className="w-full h-full"
                          name={showConfirmPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                        />
                      </Button>
                    }
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldTouched('confirm_password', true); // Manually marking as touched
                      if (e.target.value.includes('#')) {
                        e.target.value = e.target.value.replace('#', '');
                      }
                      handleChange(e);
                    }}
                    isCompulsory
                  />
                </div>

                <Checkbox
                  text={<p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">Terms and Conditions</span> and{" "}
                    <span className="text-gray-800 dark:text-white">Privacy Policy</span>
                  </p> as any}
                  name="agree"
                  check={values.agree}
                />


                <Button
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  type="submit"
                  isLoading={isLoading}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>

          <p className="mt-5 text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
