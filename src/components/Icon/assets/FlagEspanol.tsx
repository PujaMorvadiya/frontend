import { IconInputProps } from '../types/icons';

const FlagEspanol = ({ className }: IconInputProps) => {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <g clipPath="url(#clip0_1149_55601)">
        <path
          d="M0.0629883 16.8745C0.0629883 18.8316 0.415051 20.7063 1.05818 22.4397L16.063 23.831L31.0678 22.4397C31.7109 20.7063 32.063 18.8316 32.063 16.8745C32.063 14.9173 31.7109 13.0426 31.0678 11.3093L16.063 9.91797L1.05818 11.3093C0.415051 13.0426 0.0629883 14.9173 0.0629883 16.8745H0.0629883Z"
          fill="#FFDA44"
        />
        <path
          d="M31.0677 11.3098C28.807 5.21706 22.9424 0.875 16.0629 0.875C9.18348 0.875 3.31879 5.21706 1.05811 11.3098H31.0677Z"
          fill="#D80027"
        />
        <path
          d="M1.05811 22.4414C3.31879 28.5342 9.18348 32.8762 16.0629 32.8762C22.9424 32.8762 28.807 28.5342 31.0677 22.4414H1.05811Z"
          fill="#D80027"
        />
      </g>
      <defs>
        <clipPath id="clip0_1149_55601">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.0629883 0.875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FlagEspanol;
