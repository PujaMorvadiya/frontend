import { IconInputProps } from '../types/icons';

const Thumb = ({ className }: IconInputProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M5.60986 13.7609L7.93486 15.5609C8.23486 15.8609 8.90986 16.0109 9.35986 16.0109H12.2099C13.1099 16.0109 14.0849 15.3359 14.3099 14.4359L16.1099 8.96089C16.4849 7.91089 15.8099 7.01089 14.6849 7.01089H11.6849C11.2349 7.01089 10.8599 6.63589 10.9349 6.11089L11.3099 3.71089C11.4599 3.03589 11.0099 2.28589 10.3349 2.06089C9.73486 1.83589 8.98486 2.13589 8.68486 2.58589L5.60986 7.16089"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M1.78516 13.7633V6.41328C1.78516 5.36328 2.23516 4.98828 3.28516 4.98828H4.03516C5.08516 4.98828 5.53516 5.36328 5.53516 6.41328V13.7633C5.53516 14.8133 5.08516 15.1883 4.03516 15.1883H3.28516C2.23516 15.1883 1.78516 14.8133 1.78516 13.7633Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Thumb;
