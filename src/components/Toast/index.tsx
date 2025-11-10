import Button from '../Button/Button';
import Image from '../Image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToast, removeToast } from '../../reduxStore/slices/toastSlice';

const ToastIcon = (variant?: string) => {
  switch (variant) {
    case 'Error':
      return <Image iconName="crossIcon" iconClassName="w-full h-full relative" />;
    case 'Warning':
      return <Image iconName="infoIconI" iconClassName="w-full h-full relative" />;
    case 'Success':
      return <Image iconName="checkIcon" iconClassName="w-full h-full relative" />;
    case 'Info':
      return <Image iconName="infoIconI" iconClassName="w-full h-full relative" />;
    default:
      return <Image iconName="crossIcon" iconClassName="w-full h-full relative" />;
  }
};

const Toast = () => {
  const toastMessage = useSelector(getToast);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<number[]>([]);

  useEffect(() => {
    setTimeout(() => {
      return toastMessage.map((dat:{id:number}) => dispatch(removeToast({ id: dat.id }))) || [];
    }, 3000);
    setIsVisible(toastMessage.map((dat:{id:number}) => dat.id) || []);
  }, [toastMessage]);
  const ToastClasses = (type?: string, variant?: string) => {
    switch (variant) {
      case 'Error':
        return type === 'dark'
          ? 'from-[#F69C9C] to-[#E45555] border-[#E45555] '
          : ' ';
      case 'Warning':
        return type === 'dark'
          ? 'from-[#DE9B08] to-[#E1B147] border-[#FFDF8D] '
          : ' ';
      case 'Success':
        return type === 'dark'
          ? 'from-[#10A932] to-[#50DF6F] border-[#10A932] '
          : ' ';
      case 'Info':
        return type === 'dark'
          ? 'from-[#544A40] to-[#908880] border-[#908880] '
          : ' ';
      default:
        return type === 'dark'
          ? 'from-[#544A40] to-[#908880] border-[#908880] '
          : '';
    }
  };
  return (
    <>
      {toastMessage.length ? (
        <div className="toast-notification  fixed bottom-8 right-8 flex justify-center z-4 flex-col gap-y-6">
          {toastMessage.map((toast) => (
            <div
              key={toast.id}
              style={{
                opacity: isVisible.includes(toast.id) ? 1 : 0,
                transform: `translateX(${
                  isVisible.includes(toast.id) ? '0' : '30px'
                })`,
                transition: 'opacity 0.5s, transform 0.5s',
              }}
              className={` ${ToastClasses('dark', toast.variant)} toast-inner flex flex-wrap p-5 w-[290px] rounded-xl text-white relative border border-solid bg-gradient-to-r ${toast.type}`}
            >
              <span
                className={`toast-icon  w-6 h-6 p-2 rounded inline-block bg-black/30 ${ToastClasses('dark', toast.variant)}`}
              >
                {ToastIcon(toast.variant)}
              </span>
              <div className="toast-content  max-w-[calc(100%_-_24px)] pl-4 w-full">
                <p className="toast-title text-sm font-semibold text-white mb-1 block">
                  {toast.variant}
                </p>
                <span className="toast-desc  text-xs leading-normal block">
                  {toast.message}
                </span>
              </div>
              <Button
                onClickHandler={() => dispatch(removeToast({ id: toast.id }))}
                className="toast-close w-3 h-3 inline-block text-white cursor-pointer hover:opacity-60 absolute select-none active:scale-95 transition-all duration-300 right-5 top-5"
              >
                <Image iconName="crossIcon" iconClassName="w-full h-full" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Toast;
