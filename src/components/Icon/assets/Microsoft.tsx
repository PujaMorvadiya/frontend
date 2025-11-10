import { IconInputProps } from '../types/icons';

const Microsoft = ({ className }: IconInputProps) => {
  return (
    <svg
      width="28"
      height="27"
      viewBox="0 0 28 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <g clipPath="url(#clip0_2120_68743)">
        <path
          d="M13.3375 13.0054H0.666016V0.333931H13.3375V13.0054Z"
          fill="#F1511B"
        />
        <path
          d="M27.3296 13.0054H14.657V0.333939H27.3285V13.0054H27.3296Z"
          fill="#80CC28"
        />
        <path
          d="M13.3375 27.0018H0.666016V14.3303H13.3375V27.0018Z"
          fill="#00ADEF"
        />
        <path
          d="M27.3296 27.0018H14.657V14.3303H27.3285V27.0018H27.3296Z"
          fill="#FBBC09"
        />
      </g>
      <defs>
        <clipPath id="clip0_2120_68743">
          <rect
            width="26.6636"
            height="26.6679"
            fill="white"
            transform="translate(0.666016 0.333931)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Microsoft;
