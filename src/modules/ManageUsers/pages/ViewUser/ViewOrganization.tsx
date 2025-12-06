import Image from 'components/Image';
import { Roles } from 'constant/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { User } from 'modules/ManageUsers/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';

const ViewOrganization = () => {
  const [getApi, { isLoading }] = useAxiosGet();
  const { userId: user_id } = useParams();
  const [orgData, setOrgData] = useState<User>();

  const user = useSelector(getCurrentUser);

  const getOrgData = async () => {
    const { data, error } = await getApi('/users/view', {
      params: {
        user_id,
        isOrganization: true,
      },
    });
    if (data && !error) {
      setOrgData(data);
    }
  };
  useEffect(() => {
    getOrgData();
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
      {orgData && (
        <div className="content-base">
          <div
            className={` org-bar gap-10 p-5 rounded-5px grid grid-cols-[112px_1fr] items-center mb-5 ${user?.role?.role === Roles.Admin ? 'bg-LightWood' : ''}`}
          >
            <div className="img-wrap w-28 h-28 rounded-full">
              <Image
                key={orgData.profile_image}
                src={orgData.profile_image ?? ''}
                imgClassName="w-full h-full rounded-full object-cover text-4xl"
                isFromDataBase={Boolean(orgData.profile_image)}
                serverPath={Boolean(orgData.profile_image)}
                firstName={orgData.first_name}
              />
            </div>
            <div className="">
              <div className="text-[28px] font-semibold text-primary mb-2">
                {orgData.first_name}
              </div>
              <p className="items-center text-base text-PrimaryWood grid grid-cols-[18px_1fr] gap-1 mb-2">
                <Image iconName="mail" iconClassName="w-[18px] h-[18px]" />
                <span>{orgData.email}</span>
              </p>

            </div>
          </div>
          <div className="org-box-wrap grid grid-cols-2 gap-5 mt-5">
            <div className="org-box-item grid grid-cols-[30px_1fr] gap-2 px-2.5 py-4 bg-LightGray rounded-10px">
              <div className="org-box-item-icon w-30px h-30px">
                <Image
                  iconName="building"
                  iconClassName=" text-PrimaryWood w-full h-full"
                />
              </div>
              <div className="org-box-item-content">
                <span className=" uppercase text-black text-sm">
                  Type of Organization
                </span>
                {orgData.organization?.organization_type ? (
                  <p className=" text-xl text-PrimaryWood mt-1">
                    {orgData.organization?.organization_type?.type}
                  </p>
                ) : (
                  <p className=" text-xl text-PrimaryWood mt-1">
                    Not Specified
                  </p>
                )}
              </div>
            </div>
            <div className="org-box-item grid grid-cols-[30px_1fr] gap-2 px-2.5 py-4 bg-LightGray rounded-10px">
              <div className="org-box-item-icon w-30px h-30px">
                <Image
                  iconName="locationPin"
                  iconClassName=" text-PrimaryWood w-full h-full"
                />
              </div>
              <div className="org-box-item-content">
                <span className=" uppercase text-black text-sm">
                  Address
                </span>
                {orgData.address ? (
                  <p className=" text-xl text-PrimaryWood mt-1">{orgData.address}</p>
                ) : (
                  <p className=" text-xl text-PrimaryWood mt-1">
                    Not Specified
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrganization;
