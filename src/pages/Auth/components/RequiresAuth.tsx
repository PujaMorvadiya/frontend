import Loaders from 'components/Loaders';
import { LayoutConstant, Roles } from 'constant/common.constant';
import { PUBLIC_NAVIGATION } from 'constant/navigation.constant';
import ScrollToTop from 'hooks/ScrollOnTop';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { getAuthToken } from 'reduxStore/slices/tokenSlice';

const RequiresAuth = ({ children }: { children: React.ReactNode }) => {
  const authToken = useSelector(getAuthToken);
  const userData = useSelector(getCurrentUser);
  const [navigationRoute, setNavigationRoute] = useState(
    window.location.pathname + window.location.search + window.location.hash
  );
  const navigate = useNavigate();

  useEffect(() => {
    navigate(navigationRoute);
  }, [navigationRoute]);

  useEffect(() => {
    if (
      Object.values({ ...PUBLIC_NAVIGATION, dashboard: '/' }).includes(
        window?.location?.pathname
      ) &&
      userData?.role?.role
    ) {
      const courseUrl = Cookies.get('navigate_after_login_url');
      if (courseUrl) {
        setNavigationRoute(courseUrl);
        Cookies.remove('navigate_after_login_url');
      } else {
        switch (userData?.role?.role) {
          case LayoutConstant.User:
            setNavigationRoute('/');
            break;
          case LayoutConstant.Admin:
            setNavigationRoute('/admin');
            break;
          case LayoutConstant.Organization:
            setNavigationRoute('/organization');
            break;
          default:
            setNavigationRoute('/');
        }
      }
    }
  }, [userData?.role?.role]);

  useEffect(() => {
    // For Global BG color
    const element = document.getElementsByTagName('body')[0];
    if (userData?.role?.role === Roles.User) {
      element.style.backgroundColor = '#f2f2f2';
    }
    // For Global BG color
  }, [userData]);

  return (
    <div>
      <ScrollToTop />
      {authToken && !userData ? <Loaders type="SiteLoader" /> : <></>}
      {children}
    </div>
  );
};

export default RequiresAuth;
