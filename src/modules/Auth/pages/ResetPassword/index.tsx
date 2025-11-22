import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button/Button';
import FormField from 'components/FormField';
import { ResetPasswordFormFields } from 'modules/Auth/types';
import { resetPasswordSchema } from 'modules/Auth/validationSchema/index2';
import { useForm } from 'react-hook-form';

const ResetPassword = () => {
  const formMethods = useForm<ResetPasswordFormFields>({
    resolver: yupResolver(resetPasswordSchema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const OnSubmit = handleSubmit((data) => {
    console.log('🚀 ~ ResetPassword ~ data:', data);
  });

  return (
    <div>
      <form onSubmit={OnSubmit}>
        <div className="mx-[-10px] flex flex-wrap">
          <div className="px-[10px] w-1/2 sm:w-full">
            <FormField<ResetPasswordFormFields>
              required
              type="password"
              name="password"
              label="Password"
              labelClass="if__label__blue"
              placeholder="Enter Your Password"
              autoComplete="new-password"
              register={register}
              fieldLimit={50}
              error={errors?.password}
            />
          </div>
          <div className="px-[10px] w-1/2 sm:w-full">
            <FormField<ResetPasswordFormFields>
              required
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              labelClass="if__label__blue"
              placeholder="Enter Your Confirm Password"
              autoComplete="new-password"
              register={register}
              fieldLimit={50}
              error={errors?.confirmPassword}
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-[30px]">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
