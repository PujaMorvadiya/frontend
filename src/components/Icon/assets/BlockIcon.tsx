import { IconInputProps } from '../types/icons';

const BlockIcon = ({ className }: IconInputProps) => {
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
        d="M9 17.1836C13.14 17.1836 16.5 13.8236 16.5 9.68359C16.5 5.54359 13.14 2.18359 9 2.18359C4.86 2.18359 1.5 5.54359 1.5 9.68359C1.5 13.8236 4.86 17.1836 9 17.1836Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1748 4.43359L3.6748 14.9336"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BlockIcon;
