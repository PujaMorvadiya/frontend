import { useNavigate } from 'react-router-dom';
import PageMeta from '../../components/common/PageMeta';
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
        <div className="flex gap-4 mb-4">
          <ReactSelect
            selectedValue={userType}
            onChange={(option) => {
              setUserType((option as { value: string }).value);
              dispatch(currentPageCount({ currentPage: 1 }));
            }}
            options={[{ value: 'all', label: 'All' }, ...(roles ?? [])]}
            label='User Type'
          />
          <ReactSelect
            selectedValue={status}
            onChange={(option) => {
              setStatus((option as { value: string }).value);
              dispatch(currentPageCount({ currentPage: 1 }));
            }}
            options={statusFilter}
            label='Status'
          />
        </div>
        <UserList search={search} userType={userType} status={status} isAdmin />
      </div>
      <div className="space-y-6">
        <PageMeta title="Manage Users" description="Admin and organization user management" />
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Manage Users</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Build out the user management experience here. Link this page to the backend user lists and
            actions when the APIs are ready.
          </p>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;

