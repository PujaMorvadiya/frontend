import { IconInputProps } from '../types/icons';

const CheckListRounded = ({ className }: IconInputProps) => {
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
        d="M15.9609 11.6H22.5234"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.47656 11.6L9.41406 12.5375L12.2266 9.72498"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9609 20.35H22.5234"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.47656 20.35L9.41406 21.2875L12.2266 18.475"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.75 28H19.25C25.5 28 28 25.5 28 19.25V11.75C28 5.5 25.5 3 19.25 3H11.75C5.5 3 3 5.5 3 11.75V19.25C3 25.5 5.5 28 11.75 28Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckListRounded;
