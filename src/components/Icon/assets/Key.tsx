import { IconInputProps } from '../types/icons';

const Key = ({ className }: IconInputProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M14.8425 11.1958C13.2975 12.7333 11.085 13.2058 9.14249 12.5983L5.60999 16.1233C5.35499 16.3858 4.85249 16.5433 4.49249 16.4908L2.85749 16.2658C2.31749 16.1908 1.81499 15.6808 1.73249 15.1408L1.50749 13.5058C1.45499 13.1458 1.62749 12.6433 1.87499 12.3883L5.39999 8.86328C4.79999 6.91328 5.26499 4.70078 6.80999 3.16328C9.02249 0.950781 12.615 0.950781 14.835 3.16328C17.055 5.37578 17.055 8.98328 14.8425 11.1958Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.16748 13.1172L6.89248 14.8422"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.875 8.25C11.4963 8.25 12 7.74632 12 7.125C12 6.50368 11.4963 6 10.875 6C10.2537 6 9.75 6.50368 9.75 7.125C9.75 7.74632 10.2537 8.25 10.875 8.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Key;
