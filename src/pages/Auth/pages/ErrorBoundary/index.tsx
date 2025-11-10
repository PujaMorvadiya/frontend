import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  return (
    <>
      {error ? (
        <div className="min-h-screen flex items-center justify-center px-[15px] py-[50px]">
          <div className="w-full">
            <img
              className="block w-[700px] max-w-full mx-auto"
              src="/images/error404.png"
              alt=""
            />
            <div className="w-[500px] max-w-full mx-auto mt-[20px]">
              <h1 className="title font-biotif__Bold text-ip__black__text__color text-[34px] text-center sm:text-[24px]">
                Oops! Something Went Wrong
              </h1>
              <p className="text font-Biotif__Medium text-light__TextColor text-[18px] text-center sm:text-[16px]">
                We are sorry, the page you requested could not be found. Please go
                back to the homepage!
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ErrorBoundary;
