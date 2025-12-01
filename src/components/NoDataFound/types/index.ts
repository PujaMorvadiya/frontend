import { IconTypes } from 'components/Icon/types';

export interface INoDataFoundProps {
  message?: string;
  desc?: string;
  className?: string;
  iconName?: IconTypes;
  noDataClass?: string;
  imgClassName?: string;
  heading?: string;
  bulletPoints?: string[];
  footer?: string;
}
