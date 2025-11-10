import { IconInputProps } from '../types/icons';

const Notification = ({ className }: IconInputProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M9.01494 2.17969C6.53244 2.17969 4.51494 4.19719 4.51494 6.67969V8.84719C4.51494 9.30469 4.31994 10.0022 4.08744 10.3922L3.22494 11.8247C2.69244 12.7097 3.05994 13.6922 4.03494 14.0222C7.26744 15.1022 10.7549 15.1022 13.9874 14.0222C14.8949 13.7222 15.2924 12.6497 14.7974 11.8247L13.9349 10.3922C13.7099 10.0022 13.5149 9.30469 13.5149 8.84719V6.67969C13.5149 4.20469 11.4899 2.17969 9.01494 2.17969Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M10.4024 2.39812C10.1699 2.33062 9.92994 2.27812 9.68244 2.24812C8.96244 2.15812 8.27244 2.21062 7.62744 2.39812C7.84494 1.84312 8.38494 1.45312 9.01494 1.45312C9.64494 1.45312 10.1849 1.84312 10.4024 2.39812Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2651 14.2969C11.2651 15.5344 10.2526 16.5469 9.01514 16.5469C8.40014 16.5469 7.83014 16.2919 7.42514 15.8869C7.02014 15.4819 6.76514 14.9119 6.76514 14.2969"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default Notification;
