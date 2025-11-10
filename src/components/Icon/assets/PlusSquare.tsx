import { IconInputProps } from '../types/icons';

const PlusSquare = ({ className }: IconInputProps) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M5.83594 8H11.1693"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.50391 10.6663V5.33301"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5026 14.6663H10.5026C13.8359 14.6663 15.1693 13.333 15.1693 9.99967V5.99967C15.1693 2.66634 13.8359 1.33301 10.5026 1.33301H6.5026C3.16927 1.33301 1.83594 2.66634 1.83594 5.99967V9.99967C1.83594 13.333 3.16927 14.6663 6.5026 14.6663Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusSquare;
