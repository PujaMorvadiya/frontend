import { IconInputProps } from '../types/icons';

const ShareIcon2 = ({ className }: IconInputProps) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M7.39969 7.0975L15.8897 4.2675C19.6997 2.9975 21.7697 5.0775 20.5097 8.8875L17.6797 17.3775C15.7797 23.0875 12.6597 23.0875 10.7597 17.3775L9.91969 14.8575L7.39969 14.0175C1.68969 12.1175 1.68969 9.0075 7.39969 7.0975Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1104 14.4274L13.6904 10.8374"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShareIcon2;
