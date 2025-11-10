import { IconInputProps } from '../types/icons';

const CheckRound = ({ className }: IconInputProps) => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M15 28C21.875 28 27.5 22.375 27.5 15.5C27.5 8.625 21.875 3 15 3C8.125 3 2.5 8.625 2.5 15.5C2.5 22.375 8.125 28 15 28Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6875 15.5L13.225 19.0375L20.3125 11.9625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckRound;
