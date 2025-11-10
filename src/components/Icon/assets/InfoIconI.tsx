import { IconInputProps } from '../types/icons';

const InfoIconI = ({ className }: IconInputProps) => {
  return (
    <svg
      className={className || ''}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 22.5V10"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle
        cx="2.5"
        cy="2.5"
        r="2.5"
        transform="matrix(1 0 0 -1 10 5)"
        fill="currentColor"
      />
    </svg>
  );
};

export default InfoIconI;
