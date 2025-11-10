import { IconInputProps } from '../types/icons';

const ClockRound = ({ className }: IconInputProps) => {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M27.6094 15.5C27.6094 22.4 22.0094 28 15.1094 28C8.20938 28 2.60938 22.4 2.60938 15.5C2.60938 8.6 8.20938 3 15.1094 3C22.0094 3 27.6094 8.6 27.6094 15.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.7484 19.4752L15.8734 17.1627C15.1984 16.7627 14.6484 15.8002 14.6484 15.0127V9.8877"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClockRound;
