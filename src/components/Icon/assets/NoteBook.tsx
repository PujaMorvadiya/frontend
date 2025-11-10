import { IconInputProps } from '../types/icons';

const NoteBook = ({ className }: IconInputProps) => {
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
        d="M4 18V7C4 3 5 2 9 2H16C20 2 21 3 21 7V17C21 17.14 21 17.28 20.99 17.42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.85 15H21V18.5C21 20.43 19.43 22 17.5 22H7.5C5.57 22 4 20.43 4 18.5V17.85C4 16.28 5.28 15 6.85 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 7H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10.5H13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NoteBook;
