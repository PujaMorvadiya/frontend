import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title?: string;
  titleClass?: string;
  parentClass?: string;
  className?: string;
  children?: React.ReactNode;
  url?: string | (() => void);
  addSpace?: boolean;
  passState?: { [key: string]: unknown };
  customHandleBack?: () => void;
  showBackButton?: boolean;
}

const PageHeader = ({
  title,
  parentClass,
  className,
  titleClass,
  children,
  url,
  addSpace,
  passState,
  showBackButton = true,
  customHandleBack,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (url) {
      if (typeof url === 'string') {
        navigate(`${url}`, {
          state: passState,
        });
      } else {
        url();
      }
    }
  };
  const getText = () => {
    if (title) {
      if (addSpace) {
        return title.replace(/([A-Z])/g, ' $1');
      }
      return title;
    }
    return '';
  };
  return (
    <div
      // IF ROLE === ADMIN then add extra classes below " bg-LightGray sticky top-20 z-[11]"
      className={`${parentClass ?? ''} page-header p-5 transition-all duration-300 relative z-50`}
      id="pageHeader"
    >
      <div
        className={`page-header__inner flex 1200:items-center justify-between flex-col gap-5 1024:gap-4 1200:gap-0 md:flex-row ${className || ''}`}
      >
        <div className="left flex items-center">
          {showBackButton && url ? (
            <Button
              className="back-icon bg-white me-2.5 w-8 h-8 rounded-full border border-solid border-LightGray inline-flex justify-center items-center rotate-180 p-1.5 select-none cursor-pointer active:scale-95"
              onClickHandler={customHandleBack ?? handleBack}
            >
              <Image iconName="chevronRight" />
            </Button>
          ) : (
            ''
          )}

          <h2
            className={`text-black text-xl lg:text-2xl xl:text-[28px] leading-normal font-bold me-auto ${titleClass}`}
          >
            {getText()}
          </h2>
        </div>
        <div className="right ml-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageHeader;
