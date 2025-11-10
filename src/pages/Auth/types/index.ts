export type LoginFormFields = {
  email: string;
  password: string;
  remember?: boolean;
};

export enum loginMethod {
  LOGIN = 'login',
}

export type RegistervalueType = {
  first_name: string;
  last_name: string;
  // phone?: string;
  // mobile?: string;
  email: string;
  birth_date: string;
  password: string;
  confirmPassword: string;
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
