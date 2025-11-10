import { IconInputProps } from '../types/icons';

const BarChart = ({ className }: IconInputProps) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M2.5 22H22.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.25 4V22H14.75V4C14.75 2.9 14.3 2 12.95 2H12.05C10.7 2 10.25 2.9 10.25 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 10V22H7.5V10C7.5 8.9 7.1 8 5.9 8H5.1C3.9 8 3.5 8.9 3.5 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 15V22H21.5V15C21.5 13.9 21.1 13 19.9 13H19.1C17.9 13 17.5 13.9 17.5 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BarChart;
