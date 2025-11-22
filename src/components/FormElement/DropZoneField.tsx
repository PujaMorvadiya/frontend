import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ToastVariant } from 'constants/common.constant';
import { useModal } from 'hooks/useModal';
import CaptureImageModal from 'modules/Community/CaptureImage';
import { ChangeEvent, DragEvent, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setToast } from 'reduxStore/slices/toastSlice';
import { customRandomNumberGenerator } from 'utils';
import { EnumFileType, fileInputEnum } from './enum';
import ErrorMessage from './ErrorMessage';
import FileUploadVariants from './FileUploadVariants';
import { FieldValueTye, IInputFileField } from './types';

const DropZone = ({
  SubTitle,
  setValue,
  variant = fileInputEnum.FileInput,
  name,
  isCapture = false,
  value,
  acceptTypes = '*/*',
  size, // size in mb
  fileType,
  label,
  id,
  isCompulsory,
  parentClass,
  isMulti,
  Title,
  limit = 5,
  labelClass,
  fileInputIcon,
  isLoading = false,
  isSendMail = false,
  selectedFileIcon,
  dropdownInnerClass,
  uploadedMediaClass,
  labelClassInput,
  hidePreview = false,
}: IInputFileField) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const captureImageModal = useModal();

  const handleCapturedImage = (
    capturedImages: Array<File>,
    value: FieldValueTye
  ) => {
    if (isMulti) {
      const newFiles = Array.isArray(capturedImages)
        ? capturedImages
        : [capturedImages];
      if (newFiles.length + (value as Array<File>).length <= limit) {
        setValue(name, [...(value as Array<File>), ...newFiles]);
      } else {
        const random = customRandomNumberGenerator();
        dispatch(
          setToast({
            variant: ToastVariant.ERROR,
            message: `${t('ToastMessage.notUploadMoreFileText', { FILES: limit })} `,
            type: 'error',
            id: random,
          })
        );
      }
    } else {
      setValue(
        name,
        Array.isArray(capturedImages) ? capturedImages[0] : capturedImages
      );
    }

    captureImageModal.closeModal();
  };

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement> | DragEvent) => {
      const droppedFiles =
        'dataTransfer' in event
          ? event.dataTransfer?.files
          : (event.target as HTMLInputElement).files;
      if (droppedFiles) {
        if (isMulti) {
          if (droppedFiles.length <= limit) {
            const media = Array.from(droppedFiles);
            if (media.length + (value as Array<File>).length <= limit) {
              setValue(name, [...(value as Array<File>), ...media]);
            } else {
              const random = customRandomNumberGenerator();
              dispatch(
                setToast({
                  variant: ToastVariant.ERROR,
                  message: `${t('ToastMessage.notUploadMoreFileText', { FILES: limit })} `,
                  type: 'error',
                  id: random,
                })
              );
            }
          } else {
            const random = customRandomNumberGenerator();
            dispatch(
              setToast({
                variant: ToastVariant.ERROR,
                message: `${t('ToastMessage.notUploadMoreFileText', { FILES: limit })} `,
                type: 'error',
                id: random,
              })
            );
          }
        } else {
          // For single file selection
          setValue(name, droppedFiles[0]);
        }
      }

      // Prevent default and reset input value
      if (event.preventDefault) {
        event.preventDefault();
      }

      // Reset the input value to allow re-uploading the same file
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [isMulti, limit, name, setValue, value, dispatch, t]
  );

  const handleInputClick = useCallback(() => {
    // Clear the input value when clicked to ensure onChange triggers
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  return (
    <>
      <div
        className={`w-full relative drop-box [&_.upload-media-icon]:!static [&_.uploaded-media-wrap]:!mt-4 ${parentClass ?? ''}`}
        id="drop-area"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e: DragEvent) => {
          handleFileChange(e);
        }}
      >
        {isLoading ? (
          <div
            className={`lazy ${
              variant === fileInputEnum.FileInput ? 'h-[120px]' : ''
            }
              ${variant === fileInputEnum.FileInputXLS ? 'h-[220px]' : ''}
              ${variant === fileInputEnum.LinkFileInput ? 'h-[50px]' : ''}
            }`}
          />
        ) : (
          <>
            {label && (
              <label
                className={`drop-box-label input-label ${labelClass ?? ''}`}
                htmlFor={name}
              >
                {label}
                {isCompulsory && <span className="text-red-700">*</span>}
              </label>
            )}
            <div className="hidden">
              <input
                id={id}
                type="file"
                style={{ display: 'none' }}
                ref={inputRef}
                accept={acceptTypes}
                onChange={handleFileChange}
                onClick={handleInputClick}
                multiple={isMulti}
              />
            </div>
            <div className={`${dropdownInnerClass} input-file-wrapper`}>
              {FileUploadVariants(variant, {
                isMulti,
                limit,
                value: value as File | string,
                setValue,
                name,
                Ref: inputRef,
                size,
                fileType,
                fileInputIcon,
                SubTitle,
                Title,
                isSendMail,
                selectedFileIcon,
                uploadedMediaClass,
                labelClass,
                labelClassInput,
                hidePreview,
              })}
            </div>
            {isCapture &&
              (!label ? (
                <Button
                  className="capture-image-icon"
                  onClickHandler={captureImageModal.openModal}
                >
                  <Image iconName="camera" iconClassName="w-4 h-4" />
                </Button>
              ) : (
                <div className="capture-button-wrap">
                  <span className="capture-button-or relative text-center w-full block my-5 before:absolute before:content-[''] before:h-px before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-full before:bg-PrimaryWood/20 ">
                    <span className="inline-block px-3 bg-white relative block">
                      or
                    </span>
                  </span>
                  <Button
                    variants="black"
                    className="capture-image-icon w-full"
                    onClickHandler={captureImageModal.openModal}
                  >
                    <Image iconName="camera" iconClassName="w-4 h-4" />{' '}
                    {t('CaptureImage.Button.Capture')}
                  </Button>
                </div>
              ))}
          </>
        )}
      </div>
      <CaptureImageModal
        value={value}
        onCapture={handleCapturedImage}
        modal={captureImageModal}
        isImageOnly={fileType === EnumFileType.Image}
      />
      <ErrorMessage name={name} />
    </>
  );
};

export default DropZone;
