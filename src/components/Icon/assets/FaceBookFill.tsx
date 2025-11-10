import { IconInputProps } from '../types/icons';

const FaceBookFill = ({ className }: IconInputProps) => {
  return (
    <svg
      width="13"
      height="24"
      viewBox="0 0 13 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M8.06637 24V13.068H11.7564L12.3072 8.78765H8.06637V6.06366C8.06637 4.82526 8.41317 3.98766 10.1868 3.98766H12.4536V0.165674C11.3604 0.0528743 10.2624 -0.00232499 9.16317 7.50005e-05C5.90278 7.50005e-05 3.67919 1.98847 3.67919 5.64006V8.78765H0V13.068H3.68039V24H8.06637Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default FaceBookFill;
