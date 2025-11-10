import { IconInputProps } from '../types/icons';

const ShareArrow = ({ className }: IconInputProps) => {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M10.25 8.25156L16.4 2.10156"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9999 5.1V1.5H13.3999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 1.5H7.25C3.5 1.5 2 3 2 6.75V11.25C2 15 3.5 16.5 7.25 16.5H11.75C15.5 16.5 17 15 17 11.25V9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShareArrow;
