import { IconInputProps } from '../types/icons';

const Logout = ({ className }: IconInputProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M8.8999 7.55828C9.2099 3.95828 11.0599 2.48828 15.1099 2.48828H15.2399C19.7099 2.48828 21.4999 4.27828 21.4999 8.74828V15.2683C21.4999 19.7383 19.7099 21.5283 15.2399 21.5283H15.1099C11.0899 21.5283 9.2399 20.0783 8.9099 16.5383"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0001 12H3.62012"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.85 8.64844L2.5 11.9984L5.85 15.3484"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logout;
