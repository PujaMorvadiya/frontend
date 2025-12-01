/* eslint-disable react/no-danger */
import Button from 'components/Button/Button';
import { IButtonProps } from 'components/Button/types';
import Checkbox from 'components/FormElement/CheckBox';
import { IconTypes } from 'components/Icon/types';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

type PopUpProps = {
  modal: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  confirmButtonVariant?: IButtonProps['variants'];
  bodyText?: string;
  linkText?: string;
  navigateTo?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonFunction?: () => Promise<void> | void;
  cancelButtonFunction?: () => void;
  deleteTitle?: string;
  showCloseIcon?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isCheckBox?: boolean;
  isSlotReoccurring?: boolean;
  setProfile?: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteAll?: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: IconTypes;

  popUpType?: 'success' | 'danger' | 'warning' | 'info' | 'logout';
  optionalComponent?: () => JSX.Element;
};

const PopupBody = ({ icon, popUpType, ...rest }: Omit<PopUpProps, 'modal'>) => {
  let renderIcon;
  const IconsClass =
    'mb-5 w-20 h-20 mx-auto rounded-full flex items-center justify-center';
  switch (popUpType) {
    case 'success':
      renderIcon = (
        <div
          className={`${IconsClass} icon-wrap bg-PrimaryGreen/10 text-PrimaryGreen  `}
        >
          <Image iconClassName="w-ful h-full" iconName={icon ?? 'checkIcon'} />
        </div>
      );
      break;
    case 'warning':
      renderIcon = (
        <div
          className={`${IconsClass} icon-wrap bg-PrimaryOrange/10 text-PrimaryOrange p-5 `}
        >
          <Image
            iconName={icon ?? 'exclamationMarkIcon'}
            iconClassName="w-full h-full"
          />
        </div>
      );
      break;
    case 'danger':
      renderIcon = (
        <div
          className={`${IconsClass} icon-wrap bg-PrimaryRed/20 text-PrimaryRed p-5 `}
        >
          <Image iconClassName="w-full h-full" iconName={icon ?? 'trashIcon'} />
        </div>
      );
      break;
    case 'info':
      renderIcon = (
        <div
          className={`${IconsClass} icon-wrap bg-PrimaryBlue/10 text-PrimaryBlue p-5 `}
        >
          <Image
            iconName={icon ?? 'exclamationMarkIcon'}
            iconClassName="w-full h-full"
          />
        </div>
      );
      break;
    case 'logout':
      renderIcon = (
        <div className="logout-icon w-20 h-20 mb-5 bg-LightGray text-PrimaryWood flex items-center justify-center rounded-full mx-auto">
          <Image iconName={icon ?? 'logoutIcon2'} />
        </div>
      );
      break;
    default:
      renderIcon = (
        <div
          className={`${IconsClass} icon-wrap bg-PrimaryRed/20 text-PrimaryRed p-5`}
        >
          <Image iconClassName="w-full h-full" iconName={icon ?? 'trashIcon'} />
        </div>
      );
  }

  function getButtonVariant(popUpType: string) {
    if (popUpType === 'success') {
      return 'Green';
    }
    if (popUpType === 'warning') {
      return 'Orange';
    }
    if (popUpType === 'danger') {
      return 'Red';
    }
    if (popUpType === 'info') {
      return 'Blue';
    }
    if (popUpType === 'logout') {
      return 'Red';
    }
    return 'Green';
  }

  return (
    <>
      <div className="confirmation-wrap  text-center">
        <div className="confirmation-close-btn  flex justify-end">
          {rest.showCloseIcon && (
            <Button
              className=" w-4 h-4 cursor-pointer active:scale-90 select-none"
              onClickHandler={rest.cancelButtonFunction}
            >
              <Image iconName="crossIcon" iconClassName="w-full h-full" />
            </Button>
          )}
        </div>
        {renderIcon}
        <p className="confirmation-title text-2xl text-black font-bold leading-normal text-center">
          {rest.deleteTitle}
        </p>
        {rest.bodyText && (
          <>
            <span
              className="confirmation-sub-title text-sm leading-normal text-black/50 font-medium block mt-1"
              dangerouslySetInnerHTML={{ __html: rest.bodyText }}
            />
          </>
        )}
        {rest.linkText && rest.navigateTo ? (
          <Link
            className="confirmation-text-extra text-sm leading-12 inline-block font-semibold text-primary/80 transition-all duration-300  underline hover:text-PrimaryWood"
            to={rest.navigateTo ?? ''}
            target="_blank"
          >
            {rest.linkText}
          </Link>
        ) : (
          <span className="confirmation-text-extra text-sm leading-12 inline-block font-semibold text-primary/80 transition-all duration-300 ">
            {rest.linkText}
          </span>
        )}

        {rest.isCheckBox ? (
          <Checkbox
            parentClass="justify-center"
            text='Agree'
            onChange={(e) => {
              return rest.setProfile && rest.setProfile(e.target.checked);
            }}
          />
        ) : (
          ''
        )}

        {rest.isSlotReoccurring ? (
          <Checkbox
            parentClass="justify-center mt-3 ms-1.5"
            text='Do you want to delete all future reoccurring availabilities at this time?"'
            onChange={(e) => {
              return rest.setDeleteAll && rest.setDeleteAll(e.target.checked);
            }}
          />
        ) : (
          ''
        )}
        {rest?.optionalComponent !== undefined ? rest?.optionalComponent() : ''}
        <div className="confirmation-btn-wrap flex items-center justify-center gap-x-4 mt-8">
          {rest.cancelButtonText && (
            <Button
              className="w-fit"
              onClickHandler={rest.cancelButtonFunction}
              variants="PrimaryWoodBorder"
              // TODO: Review this state if affecting any other component
              disabled={rest.isLoading}
            >
              {rest.cancelButtonText}
            </Button>
          )}
          {rest.confirmButtonText && (
            <Button
              className=""
              onClickHandler={rest.confirmButtonFunction}
              variants={getButtonVariant(popUpType as string)}
              isLoading={rest.isLoading}
              disabled={rest.isDisabled}
            >
              {rest.confirmButtonText}
            </Button>
          )}
        </div>
      </div>
      <p className="hidden">{rest.bodyText}</p>
    </>
  );
};

export const ConfirmationPopup = ({
  modal,
  popUpType = 'danger',
  ...rest
}: PopUpProps) => {
  return (
    <Modal modal={modal} closeOnOutsideClick width="!max-w-[450px]">
      <PopupBody popUpType={popUpType} {...rest} />
    </Modal>
  );
};
