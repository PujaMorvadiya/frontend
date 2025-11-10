import { IconInputProps } from '../types/icons';

const NoteRounded = ({ className }: IconInputProps) => {
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
        d="M10.6094 15.75H19.3594"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6094 20.75H16.0844"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1094 8H18.1094C20.6094 8 20.6094 6.75 20.6094 5.5C20.6094 3 19.3594 3 18.1094 3H13.1094C11.8594 3 10.6094 3 10.6094 5.5C10.6094 8 11.8594 8 13.1094 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.6094 5.52502C24.7719 5.75002 26.8594 7.28752 26.8594 13V20.5C26.8594 25.5 25.6094 28 19.3594 28H11.8594C5.60938 28 4.35938 25.5 4.35938 20.5V13C4.35938 7.30002 6.44688 5.75002 10.6094 5.52502"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NoteRounded;
