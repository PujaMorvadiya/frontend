import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Roles } from 'constant/common.constant';
import { PUBLIC_NAVIGATION } from 'constant/navigation.constant';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';

const NotFound = () => {
  const navigate = useNavigate();
  const isAdmin = useSelector(getCurrentUser)?.role?.role === Roles.Admin;
  const isLoggedIn = useSelector(getCurrentUser);

  useEffect(() => {
    if (!isLoggedIn) {
      // this cookie will expire in 5 minute
      Cookies.set(
        'navigate_after_login_url',
        window.location.pathname + window.location.search,
        {
          expires: 5 / 1440,
        }
      );
      navigate(PUBLIC_NAVIGATION.login);
    }
  }, []);

  return (
    <section className="no-data-sec !px-0 !py-10 flex flex-col justify-center text-center min-h-[calc(100dvh_-_100px)]">
      <div className="inner h-full flex flex-col items-center justify-center">
        <div className="img-wrap max-h-[300px] 1600:max-h-[380px] max-w-[820px] mx-auto flex w-full mb-8">
          <Image
            src="images/no-data-image.png"
            isFromDataBase={false}
            serverPath={false}
            imgClassName="w-full object-contain block max-h-full max-w-full"
          />
        </div>
        <div className="title font-bold text-black text-7xl leading-12 mb-3">
          Page Not Found
        </div>
        <p className="text-black max-w-[380px] text-sm font-medium">
          We're sorry, the page you requested could not be found please go back to
          the homepage
        </p>
        <Button
          className="no-data-button mt-9"
          variants="black"
          onClickHandler={() => navigate(isAdmin ? '/admin' : '/')}
        >
          Go Home
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
