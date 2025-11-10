import { IconInputProps } from '../types/icons';

const ClockDataNotFoundIcon = ({
  className,
  width,
  height,
}: IconInputProps & { width?: string; height?: string }) => {
  return (
    <svg
      width={width ?? '18'}
      height={height ?? '18'}
      viewBox={`0 0 ${width ?? '18'} ${height ?? '18'}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? ''}
    >
      <path
        d="M16.5 9C16.5 13.14 13.14 16.5 9 16.5C4.86 16.5 1.5 13.14 1.5 9C1.5 4.86 4.86 1.5 9 1.5C13.14 1.5 16.5 4.86 16.5 9Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7827 11.3853L9.45766 9.99781C9.05266 9.75781 8.72266 9.18031 8.72266 8.70781V5.63281"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClockDataNotFoundIcon;
