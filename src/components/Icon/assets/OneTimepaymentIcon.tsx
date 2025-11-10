import { IconInputProps } from '../types/icons';

const OneTimepaymentIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      className={className || ''}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="14" r="6" fill="#908880" />
      <circle
        cx="10.8"
        cy="8"
        r="6.6"
        fill="#908880"
        stroke="#F2F2F2"
        strokeWidth="1.2"
      />
    </svg>
  );
};

export default OneTimepaymentIcon;
