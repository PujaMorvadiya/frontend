import { IconInputProps } from '../types/icons';

const LinkIcon = ({ className }: IconInputProps) => {
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
        d="M9.24727 9.93422L7.39477 11.7867C6.36727 12.8142 6.36727 14.4717 7.39477 15.4992C8.42227 16.5267 10.0798 16.5267 11.1073 15.4992L14.0248 12.5817C16.0723 10.5342 16.0723 7.20422 14.0248 5.15672C11.9773 3.10922 8.64727 3.10922 6.59977 5.15672L3.41977 8.33672C1.66477 10.0917 1.66477 12.9417 3.41977 14.7042"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LinkIcon;
