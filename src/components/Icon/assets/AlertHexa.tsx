import { IconInputProps } from '../types/icons';

const AlertHexa = ({ className }: IconInputProps) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M8.65039 5.5733V9.0733"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7037 6.12662V10.6866C14.7037 11.4333 14.3037 12.1266 13.657 12.5066L9.69702 14.7933C9.05035 15.1666 8.25034 15.1666 7.597 14.7933L3.637 12.5066C2.99034 12.1333 2.59033 11.4399 2.59033 10.6866V6.12662C2.59033 5.37995 2.99034 4.68659 3.637 4.30659L7.597 2.01993C8.24367 1.6466 9.04369 1.6466 9.69702 2.01993L13.657 4.30659C14.3037 4.68659 14.7037 5.37329 14.7037 6.12662Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.65039 11.2066V11.2733"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AlertHexa;
