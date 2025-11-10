import { IconInputProps } from '../types/icons';

const ImageIcon2 = ({ className }: IconInputProps) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M21.6809 17.1745L18.5509 9.86448C17.4909 7.38448 15.5409 7.28448 14.2309 9.64448L12.3409 13.0545C11.3809 14.7845 9.5909 14.9345 8.3509 13.3845L8.1309 13.1045C6.8409 11.4845 5.0209 11.6845 4.0909 13.5345L2.3709 16.9845C1.1609 19.3845 2.9109 22.2145 5.5909 22.2145H18.3509C20.9509 22.2145 22.7009 19.5645 21.6809 17.1745Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.9707 8.21484C8.62756 8.21484 9.9707 6.8717 9.9707 5.21484C9.9707 3.55799 8.62756 2.21484 6.9707 2.21484C5.31385 2.21484 3.9707 3.55799 3.9707 5.21484C3.9707 6.8717 5.31385 8.21484 6.9707 8.21484Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ImageIcon2;
