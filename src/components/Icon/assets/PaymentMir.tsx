import { IconInputProps } from '../types/icons';

const PaymentMir = ({ className }: IconInputProps) => {
  return (
    <svg
      width="40"
      height="12"
      viewBox="0 0 40 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M3.09998 1.2999H6.39998C6.69998 1.2999 7.59998 1.1999 7.99998 2.5999C8.29998 3.4999 8.69998 4.8999 9.29998 6.9999H9.49998C10.1 4.7999 10.6 3.2999 10.8 2.5999C11.2 1.1999 12.2 1.2999 12.6 1.2999H15.7V10.8999H12.5V5.1999H12.3L10.6 10.8999H8.19998L6.49998 5.1999H6.19998V10.8999H3.09998M17 1.2999H20.2V6.9999H20.5L22.6 2.2999C23 1.3999 23.9 1.2999 23.9 1.2999H26.9V10.8999H23.7V5.1999H23.5L21.4 9.8999C21 10.7999 20 10.8999 20 10.8999H17M31.2 7.9999V10.8999H28.2V5.8999H38C37.6 7.0999 36.2 7.9999 34.6 7.9999"
        fill="#0F754E"
      />
      <path
        d="M38.2 5.2998C38.6 3.4998 37.4 1.2998 34.8 1.2998H28C28.2 3.3998 30 5.2998 31.9 5.2998"
        fill="url(#paint0_linear_16544_85876)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_16544_85876"
          x1="37"
          y1="-0.000195265"
          x2="29"
          y2="-0.000195265"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F5CD7" />
          <stop offset="1" stopColor="#02AEFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PaymentMir;
