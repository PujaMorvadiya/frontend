// ** Components **
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';

// ** Constants **
import { PRIVATE_NAVIGATION } from 'constant/navigation.constant';
import { Roles } from 'constant/common.constant';

// ** Hooks **
import { ChangeEvent, useState } from 'react';

// ** Types **
import { RolesType } from 'reduxStore/types';

// ** Utils **
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  // ** State **
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [roleForm, setRoleForm] = useState<RolesType>();

  // ** Hooks **

  // ** Handlers **
  const handleCheckBoxChange = (
    e: ChangeEvent<HTMLInputElement>,
    searchParams: RolesType
  ) => {
    if (e.target.checked) {
      setRoleForm(searchParams);
    } else {
      setRoleForm(undefined);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title={`Add ${roleForm && activeLanguage === 1 ? roleForm : 'User'}`}
        url={`/admin${PRIVATE_NAVIGATION.users.view.path}`}
      />
      <div className="content-base">
        <div className="step-wrapper primary">
          {Array(2)
            ?.fill('')
            ?.map((_, index) => {
              return (
                <div
                  key={`Add_User_Tab${index + 1}`}
                  className={`step-item ${index <= activeLanguage ? 'active' : ''}`}
                >
                  {index >= activeLanguage ? (
                    <span className="step-item__number">{index + 1}</span>
                  ) : (
                    <span className="step-item__number">
                      <Image iconClassName="w-10 h-10" iconName="checkIcon" />
                    </span>
                  )}
                </div>
              );
            })}
        </div>
        <div className="select-create-user-wrap  p-30px bg-LightGray text-center min-h-[410px] rounded-5px">
          <span className="select-create-user-title text-black text-[21px] leading-none font-semibold">
            Select User Type
          </span>
          <div className="select-create-user flex flex-wrap justify-center gap-30px mt-14">
            <label
              htmlFor="checkAdmin"
              className="select-create-user-item  select-none cursor-pointer [&:has(input:checked)]:text-whit"
            >
              <div className="select-create-user-icon-box w-[148px] transition-all duration-300 aspect-square bg-white rounded-10px flex items-center justify-center text-PrimaryWood">
                <Image iconName="adminIcon" iconClassName=" w-20 h-20" />
              </div>
              <p className="user-type-name my-2.5 text-base text-black">
                {Roles.Admin}
              </p>
              <Checkbox
                parentClass="justify-center"
                id="checkAdmin"
                check={roleForm === Roles.Admin}
                onChange={(e) => handleCheckBoxChange(e, Roles.Admin)}
              />
            </label>
            <label
              htmlFor="checkOrg"
              className="select-create-user-item  select-none cursor-pointer [&:has(input:checked)]:text-white"
            >
              <div className="select-create-user-icon-box  w-[148px] transition-all duration-300 aspect-square bg-white rounded-10px flex items-center justify-center text-PrimaryWood">
                <Image iconName="organizationIcon" iconClassName=" w-20 h-20" />
              </div>
              <p className="user-type-name my-2.5 text-base text-black">
                {Roles.Organization}
              </p>
              <Checkbox
                parentClass="justify-center"
                id="checkOrg"
                check={roleForm === Roles.Organization}
                onChange={(e) => handleCheckBoxChange(e, Roles.Organization)}
              />
            </label>

            <label
              htmlFor="checkUser"
              className="select-create-user-item  select-none cursor-pointer [&:has(input:checked)]:text-white"
            >
              <div className="select-create-user-icon-box  w-[148px] transition-all duration-300 aspect-square bg-white rounded-10px flex items-center justify-center text-PrimaryWood">
                <Image iconName="studentIcon" iconClassName=" w-20 h-20" />
              </div>
              <p className="user-type-name my-2.5 text-base text-black">
                {Roles.User}
              </p>
              <Checkbox
                parentClass="justify-center"
                id="checkUser"
                check={roleForm === Roles.User}
                onChange={(e) => handleCheckBoxChange(e, Roles.User)}
              />
            </label>
          </div>
        </div>

        <div className="btn-wrap">
          <Button
            variants="black"
            onClickHandler={() => {
              navigate(
                `/admin/manage-users/add-users/${roleForm?.toLocaleLowerCase()}`
              );
              setActiveLanguage(1);
            }}
            disabled={roleForm === undefined}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
