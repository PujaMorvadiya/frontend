import { ErrorMessage as FormikErrorMessage } from 'formik';

const ErrorMessage = ({ name }: { name: string }) => {
  return (
    <FormikErrorMessage name={name}>
      {(msg) => {
        return (
          <span className="error-message text-sm font-medium block text-red-600 mt-1">
            {msg}
          </span>
        );
      }}
    </FormikErrorMessage>
  );
};

export default ErrorMessage;
