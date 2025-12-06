import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { PRIVATE_NAVIGATION } from 'constant/navigation.constant';
import Button from 'components/Button/Button';
import ReactSelect from 'components/FormElement/ReactSelect';
import { currentPageCount } from 'reduxStore/slices/paginationSlice';
import { statusFilter } from 'constant/common.constant';
import UserList from './components/UserList';

const ManageUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
  const [userType, setUserType] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');
  const role = useSelector(getCurrentUser)?.roles;
  const roles = role?.map((ele) => {
    return { value: ele.id ?? '', label: ele.role ?? '' };
  });
  return (
    <>
      <PageHeader title="Manage Users">
        <div className="flex gap-4 items-end">
          <SearchComponent
            parentClass="min-w-[300px]"
            onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e?.target?.value);
            }}
            placeholder='search...'
            onClear={() => {
              setSearch('');
            }}
          />
          <Button
            variants="PrimaryWoodLight"
            className="whitespace-nowrap text-PrimaryWood h-fit"
            onClickHandler={() =>
              navigate(`/admin${PRIVATE_NAVIGATION.deletedUser.view.path}`)
            }
          >
            Deleted Users
          </Button>
          <Button
            variants="black"
            className="whitespace-nowrap text-PrimaryWood h-fit"
            onClickHandler={() =>
              navigate(`/admin${PRIVATE_NAVIGATION.users.add.path}`)
            }
          >
            Add users
          </Button>
        </div>
      </PageHeader>
      <div>
        <UserList search={search} userType={userType} status={status} isAdmin />
      </div>
    </>
  );
};

export default ManageUsers;

