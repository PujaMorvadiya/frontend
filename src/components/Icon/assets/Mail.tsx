import { IconInputProps } from '../types/icons';

const Mail = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M11.3334 13.6668H4.66671C2.66671 13.6668 1.33337 12.6668 1.33337 10.3335V5.66683C1.33337 3.3335 2.66671 2.3335 4.66671 2.3335H11.3334C13.3334 2.3335 14.6667 3.3335 14.6667 5.66683V10.3335C14.6667 12.6668 13.3334 13.6668 11.3334 13.6668Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3333 6L9.24662 7.66667C8.55996 8.21333 7.43329 8.21333 6.74662 7.66667L4.66663 6"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Mail;
