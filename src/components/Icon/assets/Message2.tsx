import { IconInputProps } from '../types/icons';

const Message2 = ({ className }: IconInputProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M7.08325 9.15234H12.9166"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83341 15.4484H9.16675L12.8751 17.7976C13.4251 18.1468 14.1667 17.7738 14.1667 17.1389V15.4484C16.6667 15.4484 18.3334 13.8611 18.3334 11.4802V6.71825C18.3334 4.3373 16.6667 2.75 14.1667 2.75H5.83341C3.33341 2.75 1.66675 4.3373 1.66675 6.71825V11.4802C1.66675 13.8611 3.33341 15.4484 5.83341 15.4484Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Message2;
