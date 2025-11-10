import { IconInputProps } from '../types/icons';

const DollarSquare = ({ className }: IconInputProps) => {
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
        d="M6.50391 10.7464C6.50391 11.7139 7.24641 12.4939 8.16891 12.4939H10.0514C10.8539 12.4939 11.5064 11.8114 11.5064 10.9714C11.5064 10.0564 11.1089 9.73391 10.5164 9.52391L7.49391 8.47391C6.90141 8.26391 6.50391 7.94141 6.50391 7.02641C6.50391 6.18641 7.15641 5.50391 7.95891 5.50391H9.84141C10.7639 5.50391 11.5064 6.28391 11.5064 7.25141"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 4.5V13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 16.5H6.75C3 16.5 1.5 15 1.5 11.25V6.75C1.5 3 3 1.5 6.75 1.5H11.25C15 1.5 16.5 3 16.5 6.75V11.25C16.5 15 15 16.5 11.25 16.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DollarSquare;
