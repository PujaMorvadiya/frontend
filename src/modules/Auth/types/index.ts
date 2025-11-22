export type LoginFormFields = {
  email: string;
  password: string;
  remember?: boolean;
};

export enum loginMethod {
  LOGIN = 'login',
}

export type RegistervalueType = {
  fname: string;
  lname: string;
  email: string;
  // date_of_birth: Date | undefined;
  password: string;
  confirm_password: string;
  agree?:boolean;
};


export type ResetPasswordFormFields = {
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordFormFields = {
  email: string;
};

export interface AuthCardProps {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  showBackBtn?: boolean;
  onBackBtnClicked?: () => void;
  showHeader?: React.ReactNode;
  children: React.ReactNode;
}


export interface RegisterFormField {
  key: string;
  value: string | File | undefined;
}