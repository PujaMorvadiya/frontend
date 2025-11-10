import { IconInputProps } from '../types/icons';

const InstagramColor = ({ className }: IconInputProps) => {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M256 481C380.264 481 481 380.264 481 256C481 131.736 380.264 31 256 31C131.736 31 31 131.736 31 256C31 380.264 131.736 481 256 481Z"
        fill="url(#paint0_linear_1668_173)"
      />
      <path
        d="M303.8 131H208.3C165.7 131 131.1 165.6 131.1 208.2V303.7C131.1 346.3 165.7 380.9 208.3 380.9H303.8C346.4 380.9 381 346.3 381 303.7V208.2C381 165.6 346.4 131 303.8 131ZM353.1 303.8C353.1 331 331 353.2 303.7 353.2H208.2C181 353.2 158.8 331.1 158.8 303.8V208.3C158.8 181.1 180.9 158.9 208.2 158.9H303.7C330.9 158.9 353.1 181 353.1 208.3V303.8Z"
        fill="white"
      />
      <path
        d="M256 192.1C220.8 192.1 192.1 220.8 192.1 256C192.1 291.2 220.8 319.9 256 319.9C291.2 319.9 319.9 291.2 319.9 256C319.9 220.8 291.2 192.1 256 192.1ZM256 294.8C234.6 294.8 217.2 277.4 217.2 256C217.2 234.6 234.6 217.2 256 217.2C277.4 217.2 294.8 234.6 294.8 256C294.8 277.4 277.4 294.8 256 294.8Z"
        fill="white"
      />
      <path
        d="M324.774 199.106C330.661 198.147 334.657 192.597 333.698 186.71C332.739 180.823 327.189 176.828 321.302 177.786C315.415 178.745 311.42 184.295 312.379 190.182C313.337 196.069 318.887 200.064 324.774 199.106Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1668_173"
          x1="84.679"
          y1="427.321"
          x2="404.429"
          y2="107.571"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FEE411" />
          <stop offset="0.052" stopColor="#FEDB16" />
          <stop offset="0.138" stopColor="#FEC125" />
          <stop offset="0.248" stopColor="#FE983D" />
          <stop offset="0.376" stopColor="#FE5F5E" />
          <stop offset="0.5" stopColor="#FE2181" />
          <stop offset="1" stopColor="#9000DC" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default InstagramColor;
