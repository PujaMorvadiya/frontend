import { IconInputProps } from '../types/icons';

const BookMarkBlock = ({ className }: IconInputProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? ''}
    >
      <path
        d="M16.5 1.5L1.5 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.51 6.53247V14.7825C15.51 16.29 14.43 16.9275 13.11 16.1925L8.25 13.155"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.48828 14.9625V4.395C2.48828 2.805 3.78578 1.5 5.38328 1.5H12.6208C13.5283 1.5 14.3383 1.92 14.8708 2.58"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookMarkBlock;
