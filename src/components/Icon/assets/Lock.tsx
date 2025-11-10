import { IconInputProps } from '../types/icons';

const Lock = ({ className }: IconInputProps) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M6.58398 11.0833V9C6.58398 5.55208 7.62565 2.75 12.834 2.75C18.0423 2.75 19.084 5.55208 19.084 9V11.0833"
        stroke="currentColor"
        strokeWidth="1.07143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8337 19.9375C14.2719 19.9375 15.4378 18.7716 15.4378 17.3334C15.4378 15.8951 14.2719 14.7292 12.8337 14.7292C11.3954 14.7292 10.2295 15.8951 10.2295 17.3334C10.2295 18.7716 11.3954 19.9375 12.8337 19.9375Z"
        stroke="currentColor"
        strokeWidth="1.07143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.042 23.5834H7.62533C3.45866 23.5834 2.41699 22.5417 2.41699 18.375V16.2917C2.41699 12.125 3.45866 11.0834 7.62533 11.0834H18.042C22.2087 11.0834 23.2503 12.125 23.2503 16.2917V18.375C23.2503 22.5417 22.2087 23.5834 18.042 23.5834Z"
        stroke="currentColor"
        strokeWidth="1.07143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Lock;
