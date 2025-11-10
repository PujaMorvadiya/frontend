import { IconInputProps } from '../types/icons';

const Reply = ({ className }: IconInputProps) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M5.34766 13.7969H11.3477C13.4177 13.7969 15.0977 12.1169 15.0977 10.0469C15.0977 7.97688 13.4177 6.29688 11.3477 6.29688H3.09766"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.82234 8.16813L2.90234 6.24812L4.82234 4.32812"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Reply;
