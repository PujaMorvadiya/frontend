import { IconInputProps } from '../types/icons';

const HeadPhone = ({ className }: IconInputProps) => {
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
        d="M4.09504 13.8691V11.6791C4.09504 10.9516 4.66504 10.2991 5.47504 10.2991C6.20254 10.2991 6.85504 10.8691 6.85504 11.6791V13.7866C6.85504 15.2491 5.64004 16.4641 4.17754 16.4641C2.71504 16.4641 1.50004 15.2416 1.50004 13.7866V9.16656C1.41754 4.95156 4.74754 1.53906 8.96254 1.53906C13.1775 1.53906 16.5 4.95156 16.5 9.08406V13.7041C16.5 15.1666 15.285 16.3816 13.8225 16.3816C12.36 16.3816 11.145 15.1666 11.145 13.7041V11.5966C11.145 10.8691 11.715 10.2166 12.525 10.2166C13.2525 10.2166 13.905 10.7866 13.905 11.5966V13.8691"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HeadPhone;
