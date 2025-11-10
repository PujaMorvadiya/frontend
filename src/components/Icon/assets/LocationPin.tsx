import { IconInputProps } from '../types/icons';

const LocationPin = ({ className }: IconInputProps) => {
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
        d="M15.5 16.966C17.6539 16.966 19.4 15.2199 19.4 13.066C19.4 10.9121 17.6539 9.16602 15.5 9.16602C13.3461 9.16602 11.6 10.9121 11.6 13.066C11.6 15.2199 13.3461 16.966 15.5 16.966Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.025 10.7912C7.4875 -0.0337862 23.525 -0.0212859 25.975 10.8037C27.4125 17.1537 23.4625 22.5287 20 25.8537C17.4875 28.2787 13.5125 28.2787 10.9875 25.8537C7.5375 22.5287 3.5875 17.1412 5.025 10.7912Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default LocationPin;
