import { IconInputProps } from '../types/icons';

const X = ({ className }: IconInputProps) => {
  return (
    <svg
      width="15"
      height="13"
      viewBox="0 0 15 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.51415 0H0L5.35215 7.06956L0.342388 13H2.65705L6.44614 8.51459L9.81069 12.9587H14.3248L8.81715 5.68373L8.82692 5.69628L13.5691 0.0825543H11.2544L7.73276 4.25141L4.51415 0ZM2.49174 1.23811H3.89706L11.8331 11.7206H10.4278L2.49174 1.23811Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default X;
