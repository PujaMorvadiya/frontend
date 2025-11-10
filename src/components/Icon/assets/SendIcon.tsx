import { IconInputProps } from '../types/icons';

const SendIcon = ({ className }: IconInputProps) => {
  return (
    <>
      <svg
        width="68"
        height="62"
        viewBox="0 0 68 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={` ${className ?? ''}`}
      >
        <path
          d="M61.9789 5.09531L15.6547 40.0344L24.0668 60.3848C24.7121 61.952 27.0629 61.6063 27.2011 59.9238L28.5609 44.6668C28.5609 44.4824 28.6301 44.3441 28.7453 44.2059L61.9789 5.09531Z"
          fill="currentColor"
        />
        <path
          d="M64.7906 0.716406L1.91873 27.6813C0.72029 28.2113 0.582009 29.8477 1.68826 30.5621L14.7097 38.859L65.459 0.532032C65.2285 0.601173 64.998 0.624218 64.7906 0.716406Z"
          fill="currentColor"
        />
        <path
          d="M66.957 1.54609L30.543 44.4133C38.3328 47.7781 46.0996 51.143 53.8895 54.5078C54.8344 54.9227 55.9176 54.3695 56.125 53.3555L67.0492 2.53711C67.0953 2.21445 67.0723 1.86875 66.957 1.54609Z"
          fill="currentColor"
        />
        <path
          d="M28.7452 59.3938L41.2597 50.7051L29.9437 45.8422L28.7452 59.3938Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
};

export default SendIcon;
