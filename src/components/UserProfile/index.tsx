import Image from 'components/Image';
import ToolTip from 'components/Tooltip';
import { useNavigate } from 'react-router-dom';

type User = {
  first_name: string;
  last_name: string;
  profile_image?: string;
  email?: string;
  id?: string;
  user_role?: {
    role: {
      role: string;
    };
  };
};

const UserProfile = ({
  user,
  imageClass,
  textClass,
  isTooltip = true,
  isTeacherSide,
}: {
  user: User;
  imageClass?: string;
  textClass?: string;
  isTooltip?: boolean;
  isTeacherSide?: boolean;
}) => {
  if (!user?.first_name && !user?.last_name) {
    return <>-</>;
  }
  const navigate = useNavigate();

  const onClickHandler = (user: User) => {
    if (user.id && user.user_role) {
      const userRole = user?.user_role?.role.role.toLowerCase();
      navigate(`/admin/manage-users/${user.id}/${userRole}`);
    }
  };

  return (
    <div
      className={`flex gap-2 items-center w-full ${isTooltip ? 'justify-center' : 'justify-start'} cursor-pointer`}
      onClick={() => {
        if (!isTeacherSide) onClickHandler(user);
      }}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${imageClass}`}
      >
        <Image
          key={user?.profile_image}
          imgClassName={`w-full h-full rounded-full object-cover ${imageClass}`}
          src={user?.profile_image}
          isFromDataBase={!!user?.profile_image}
          serverPath={!!user?.profile_image}
          firstName={user?.first_name}
        />
      </div>
      {isTooltip ? (
        <ToolTip
          position="top"
          value={`${user?.first_name ?? ''} ${user?.last_name ?? ''}`}
          spanClass={`w-0 flex-1 ${textClass}`}
        />
      ) : (
        <span className={textClass}>
          {user?.first_name ?? ''} {user?.last_name ?? ''}
        </span>
      )}
    </div>
  );
};

export default UserProfile;
