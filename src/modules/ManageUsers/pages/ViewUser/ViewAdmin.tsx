import Image from 'components/Image';
import StatusLabel from 'components/StatusLabel';
import { useAxiosGet } from 'hooks/useAxios';
import { User } from 'modules/ManageUsers/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewAdmin = () => {
  const [fetchUserData, { isLoading }] = useAxiosGet();
  const [user, setUser] = useState<User>();
  const { userId } = useParams();
  const getUserData = async () => {
    const { data } = await fetchUserData(`/users/view`, {
      params: {
        user_id: userId,
        isAdmin: true,
      },
    });
    setUser(data);
  };
  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 p-5">
        <div className="lazy w-full h-40" />
        <div className="flex flex-row gap-4">
          <span className="lazy !w-1/2 h-24" />
          <span className="lazy !w-1/2 h-24" />
        </div>
        <div className="grid grid-cols-2 gap-30px">
          <div className="lazy h-[140px]" />
          <div className="lazy h-[140px]" />
          <div className="lazy h-[140px]" />
          <div className="lazy h-[140px]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="content-base">
        <div className="org-bar gap-10 p-5 rounded-5px grid grid-cols-[112px_1fr] items-center mb-5">
          <div className="img-wrap w-28 h-28 rounded-full">
            <Image
              key={user?.profile_image}
              src={user?.profile_image ?? ''}
              imgClassName="w-full h-full rounded-full object-cover text-4xl"
              isFromDataBase={Boolean(user?.profile_image)}
              serverPath={Boolean(user?.profile_image)}
              firstName={user?.first_name}
            />
          </div>
          <div className="">
            <StatusLabel text={user?.user_role.role?.role} variants="yellow" />
            <div className="text-[28px] font-semibold text-primary mb-2">
              {user?.first_name}
            </div>
            <p className="items-center text-base text-PrimaryWood grid grid-cols-[18px_1fr] gap-1 mb-2">
              <Image iconName="mail" iconClassName="w-[18px] h-[18px]" />
              <span>{user?.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmin;
