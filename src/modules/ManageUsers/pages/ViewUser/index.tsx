import Breadcrumbs from 'components/Breadcrumbs';
import PageHeader from 'components/PageHeader';
import NotFound from 'modules/Auth/pages/NotFound';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { activeLayoutType } from 'reduxStore/slices/layoutSlice';
import ViewAdmin from './ViewAdmin';
import ViewOrganization from './ViewOrganization';
// import ViewStudent from './ViewUser';
import { LayoutConstant, Roles } from 'constant/common.constant';
import { PRIVATE_NAVIGATION } from 'constant/navigation.constant';

const ViewUser = () => {
  const { role } = useParams();
  const isDeletedUser = Boolean(
    new URLSearchParams(useLocation()?.search?.slice(1))?.get('isDeletedUser')
  );
  const isAdmin = useSelector(getCurrentUser)?.role?.role === Roles.Admin;
  const navigate = useNavigate();
  const activeLayout = useSelector(activeLayoutType);

  const renderRoleView = () => {
    switch (role?.trim()) {
      // case 'user':
      //   return <ViewStudent isDeletedUser={isDeletedUser} />;
      case 'admin':
        return <ViewAdmin />;
      case 'organization':
        return <ViewOrganization />;
      default:
        return <NotFound />;
    }
  };

  return (
    <>
      <PageHeader
        className="capitalize"
        title={role}
        url={
          isDeletedUser
            ? `/admin${PRIVATE_NAVIGATION.deletedUser.view.path}`
            : `/admin${PRIVATE_NAVIGATION.users.view.path}`
        }
        customHandleBack={() => {
          const path = isAdmin
            ? '/admin/manage-users'
            : activeLayout === LayoutConstant.User
              ? '/app/manage-user'
              : '/manage-user'

          navigate(path);
        }}
      >
        <Breadcrumbs
          items={[
            {
              label: 'Dashboard',
              url: `${isAdmin ? '/admin' : '/courses'}`,
            },
            {
              label: 'Manage Users',
              url: `${isAdmin
                ? '/admin/manage-users'
                : activeLayout === LayoutConstant.User
                  ? '/app/manage-user'
                  : '/manage-user'}`,
            },
            {
              label: 'User Details',
              url: '/courses',
            },
          ]}
        />
      </PageHeader>
      {renderRoleView()}
    </>
  );
};
export default ViewUser;
