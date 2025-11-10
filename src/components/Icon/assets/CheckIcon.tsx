import { IconInputProps } from '../types/icons';

const CheckIcon = ({ className }: IconInputProps) => {
  return (
    <>
      <svg
        width="44"
        height="45"
        viewBox="0 0 44 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={` ${className ?? ''}`}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M37.7916 10.8561C38.5614 11.5297 38.6312 12.7032 37.9465 13.4632L18.671 34.8578C17.9827 35.6217 16.8009 35.6703 16.0522 34.9656L4.89815 24.465C4.20255 23.8101 4.13596 22.7189 4.73277 21.9729C5.3913 21.1498 6.61763 21.0365 7.40136 21.7414L16.0554 29.5255C16.8075 30.202 17.9654 30.1415 18.6429 29.3904L35.2227 11.0078C35.8935 10.2639 37.0377 10.1964 37.7916 10.8561Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
};

export default CheckIcon;
