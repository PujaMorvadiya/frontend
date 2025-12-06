import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button/Button';
import FormField from 'components/FormField';
import { ForgotPasswordFormFields } from 'modules/Auth/types';
import { forgotPasswordSchema } from 'modules/Auth/validationSchema/index2';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const formMethods = useForm<ForgotPasswordFormFields>({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const OnSubmit = handleSubmit((userData: ForgotPasswordFormFields) => {
  });
  return (
    <div>
      <form onSubmit={OnSubmit}>
        <FormField<ForgotPasswordFormFields>
          type="text"
          name="email"
          label="Email"
          icon="mail"
          placeholder="Enter Your Email"
          register={register}
          error={errors.email}
          fieldLimit={60}
          required
        />
        <Button type="submit" className="w-full mt-[30px]">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
