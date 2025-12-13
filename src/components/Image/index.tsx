import { useEffect, useRef, useState } from 'react';

// ** Components **

// ** type **
import NameBadge from 'components/Badge/NameBadge';
import Icon from 'components/Icon';
import { VITE_BACKEND_URL } from 'config';
import { IImageProps } from './interface';

const Image = (props: IImageProps) => {
  const {
    src = '',
    alt,
    imgClassName = '',
    NameBadgeParentClass,
    serverPath = true,
    firstName,
    lastName,
    disableLoader = false,
    iconClassName,
    iconName = 'noImgStrokeSD',
    // loaderType = '',
    height,
    width,
    loaderClassName,
    showImageLoader = true,
    isFromDataBase = true,
    fetchPriority = 'auto',
    isShowFixedSkeleton = false,
    isRounded = false,
    iconLabel,
  } = props;

  // ** States **
  const [fetchError, setFetchError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const [imageURL, setImageURL] = useState<string | File>('');

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    setImageURL(src ?? '');
  }, [src, height, width, serverPath]);

  const imgComponent = () => {
    if (imageURL) {
      if (fetchError) {
        return (
          <img
            // loading="lazy"
            className={`block ${imgClassName}`}
            src="/images/no-image.png"
            alt={`${alt ?? ''}`}
          />
        );
      }

      return (
        <img
          className={`${!isImageLoaded ? 'hidden' : 'block'} ${imgClassName}`}
          src={
            isFromDataBase
              ? imageURL.toString().includes('https://')
                ? (imageURL as string)
                : `${(VITE_BACKEND_URL as string) + imageURL}`
              : (imageURL as string)
          }
          alt={`${alt || ''}`}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          onError={() => {
            setFetchError(true);
            setIsImageLoaded(true);
          }}
          height={height}
          width={width}
          referrerPolicy="no-referrer"
          loading="eager"
          fetchPriority={fetchPriority || 'auto'}
        />
      );
    }
    return <Icon className={iconClassName} name={iconName} ariaLabel={iconLabel} />;
  };

  return (
    <>
      {/* {(firstName || lastName) && ( */}
      {(!imageURL || fetchError) && (firstName || lastName) && (
        <NameBadge
          imgClassName={imgClassName}
          parentClass={NameBadgeParentClass}
          FirstName={firstName ?? ''}
          LastName={lastName ?? ''}
        />
      )}
      {!disableLoader &&
        !isImageLoaded &&
        imageURL &&
        showImageLoader && (
          // <Loaders className={loaderClassName} type={loaderType || 'Spin'} />
          // height={height} width={width}
          <>
            {isShowFixedSkeleton ? (
              <div className={`lazy !w-[80%] h-[500px] ${loaderClassName}`} />
            ) : (
              <div
                className={`lazy imgClassName ${height || 'h-full'} ${width || 'w-full'} ${isRounded ? 'before:!rounded-full' : ''} ${loaderClassName}`}
              />
            )}
          </>
        )}
      {imgComponent()}
    </>
  );
};

export default Image;
