import Image from 'components/Image';
import { INoDataFoundProps } from './types';

const NoDataFound = ({
  message,
  className,
  desc,
  iconName,
  noDataClass,
  imgClassName,
  heading,
  bulletPoints,
  footer,
}: INoDataFoundProps) => {
  const imageProps = iconName
    ? { iconName, iconClassName: `w-[100px] m-auto mb-4 ${imgClassName || ''}` }
    : {
        src: '/images/no-data.png',
        imgClassName: `w-[100px] m-auto mb-4 ${imgClassName || ''}`,
      };

  return (
    <div className={`py-4 text-center rounded-10px col-span-3 ${className ?? ''}`}>
      <div>
        <Image
          isFromDataBase={false}
          serverPath={false}
          {...imageProps}
          alt="No Data Found"
        />

        <p
          className={`${
            noDataClass ?? 'text-dark text-xl font-semibold max-w-[650px] mx-auto'
          }`}
        >
          {message ?? 'No Data Found'}
        </p>
        {desc && (
          <>
            <p className="max-w-[650px] mx-auto mt-2.5 text-base text-navText px-4 text-balance">
              {desc}
            </p>
          </>
        )}
        {heading && (
          <>
            <p className="max-w-[650px] mx-auto mt-4 text-base text-navText px-4 text-balance">
              {heading}
            </p>
          </>
        )}
        {bulletPoints && bulletPoints?.length > 0 && (
          <ul className="max-w-[650px] mx-auto mt-2.5 mb-4 text-base text-navText px-4 text-left list-disc pl-8 text-center">
            {bulletPoints?.map((text: string, index: number) => (
              <li key={index} className="mb-1 mt-2.5 text-left w-max mx-auto">
                {text}
              </li>
            ))}
          </ul>
        )}
        {footer && (
          <>
            <p className="text-dark text-xl font-semibold max-w-[650px] mx-auto mt-2.5 text-base text-navText px-4 text-balance">
              {footer}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default NoDataFound;
