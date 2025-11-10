import { IconInputProps } from '../types/icons';

const DNDIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="13"
      height="21"
      viewBox="0 0 13 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <g>
        <circle cx="2.5" cy="2.5" r="2" fill="currentColor" />
        <circle cx="2.5" cy="10.5" r="2" fill="currentColor" />
        <circle cx="2.5" cy="18.5" r="2" fill="currentColor" />
        <circle cx="10.5" cy="2.5" r="2" fill="currentColor" />
        <circle cx="10.5" cy="10.5" r="2" fill="currentColor" />
        <circle cx="10.5" cy="18.5" r="2" fill="currentColor" />
      </g>
    </svg>
  );
};

export default DNDIcon;
