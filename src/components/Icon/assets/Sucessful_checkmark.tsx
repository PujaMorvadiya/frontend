import { IconInputProps } from '../types/icons';

const SuccessfulCheckmark = ({ className }: IconInputProps) => {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className ?? ''}`}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="5"
        strokeDasharray="251.2"
        strokeDashoffset="251.2"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="251.2"
          to="0"
          dur="0.7s"
          fill="freeze"
        />
      </circle>

      <path
        d="M32 52 L45 65 L68 38"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="50"
        strokeDashoffset="50"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="50"
          to="0"
          dur="0.5s"
          fill="freeze"
          begin="0.7s"
        />
      </path>
    </svg>
  );
};

export default SuccessfulCheckmark;
