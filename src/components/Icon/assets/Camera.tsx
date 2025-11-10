import { IconInputProps } from '../types/icons';

const Camera = ({ className }: IconInputProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M3.94311 12.8346H10.0564C11.6664 12.8346 12.3081 11.8488 12.3839 10.6471L12.6873 5.8288C12.7689 4.5688 11.7656 3.5013 10.4998 3.5013C10.1439 3.5013 9.81727 3.29714 9.65394 2.98214L9.23394 2.1363C8.96561 1.60547 8.26561 1.16797 7.67061 1.16797H6.33477C5.73394 1.16797 5.03394 1.60547 4.76561 2.1363L4.34561 2.98214C4.18227 3.29714 3.85561 3.5013 3.49977 3.5013C2.23394 3.5013 1.23061 4.5688 1.31227 5.8288L1.61561 10.6471C1.68561 11.8488 2.33311 12.8346 3.94311 12.8346Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.125 4.66797H7.875"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99984 10.4987C8.044 10.4987 8.89567 9.64703 8.89567 8.60286C8.89567 7.5587 8.044 6.70703 6.99984 6.70703C5.95567 6.70703 5.104 7.5587 5.104 8.60286C5.104 9.64703 5.95567 10.4987 6.99984 10.4987Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Camera;
