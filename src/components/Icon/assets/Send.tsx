import { IconInputProps } from '../types/icons';

const Send = ({ className }: IconInputProps) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M7.89969 7.22659L16.3897 4.39659C20.1997 3.12659 22.2697 5.20659 21.0097 9.01659L18.1797 17.5066C16.2797 23.2166 13.1597 23.2166 11.2597 17.5066L10.4197 14.9866L7.89969 14.1466C2.18969 12.2466 2.18969 9.13659 7.89969 7.22659Z"
        stroke="currentCOlor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6104 14.5566L14.1904 10.9666"
        stroke="currentCOlor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Send;
