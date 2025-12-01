import { IconTypes } from 'components/Icon/types';
import { ReactNode } from 'react';

export interface TabComponentProps {
  current: string;
  className?: string;
  children: ReactNode;
  scrollable?: boolean;
  searchable?: boolean;
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTabChange?: (tabIndex: string) => void;
  sideComponent?: JSX.Element | null;
  isUpdateImmediately?: boolean;
  hideContent?: boolean;
}
export interface TabProps {
  title?: string;
  icon?: IconTypes;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  variant?: 'fill' | null;
  uniqueKey: string;
}

export type TabColumnProps = {
  title: string;
  component: JSX.Element;
  icon?: IconTypes;
  uniqueKey: string;
  count?: number;
};
