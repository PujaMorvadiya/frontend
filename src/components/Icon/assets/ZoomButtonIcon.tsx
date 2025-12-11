import { IconInputProps } from '../types/icons';

const ZoomButtonIcon = ({ className, ariaLabel }: IconInputProps) => {
  return (
    <svg
      width="26px"
      height="26px"
      viewBox="0 0 6.24 6.24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className || ''}
      aria-label={ariaLabel ?? ''}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.3899025}
        d="M0.547 1.982v1.75c0.001 0.396 0.353 0.713 0.781 0.713h2.776c0.078 0 0.143 -0.058 0.143 -0.13V2.565c-0.001 -0.396 -0.355 -0.713 -0.781 -0.713H0.691c-0.078 0 -0.141 0.058 -0.141 0.129m3.878 0.684 1.145 -0.769c0.1 -0.077 0.176 -0.058 0.176 0.079v2.346c0 0.156 -0.095 0.138 -0.176 0.079l-1.145 -0.767z"
      />
    </svg>
  );
};

export default ZoomButtonIcon;
