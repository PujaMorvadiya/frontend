// ** Component **
export type Props = {
  children: React.ReactNode;
  isSomethingWentWrong?: boolean;
};

const AuthLayout = ({ children, isSomethingWentWrong = true }: Props) => {
  return (
    <>
      {children}
    </>
  );
};

export default AuthLayout;
