import UserProfile from 'components/UserProfile';
import { CustomEventProps } from '../types';

const ManageTeacherComponent = ({ event, currentView }: CustomEventProps) => {
  const userColor = event?.user?.user_color || '#cccccc';

  return (
    <div
      className={`month-teacher-view-event ${currentView === 'day' ? '!mt-2' : ''}`}
      style={{
        backgroundColor: userColor,
        color: '#ffffff',
      }}
    >
      <UserProfile
        user={{
          profile_image: event?.user?.profile_image,
          first_name: event?.user?.first_name ?? '-',
          last_name: event?.user?.last_name ?? '-',
        }}
        imageClass="!w-5 !h-5 !bg-black"
        textClass="text-sm"
        isTooltip={false}
      />
    </div>
  );
};

export default ManageTeacherComponent;
