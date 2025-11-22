// ** Components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import InputField from './InputField';

// ** Styles **
import './style/commentInput.css';

// ** Form and Types **
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { CommentInputProps } from 'modules/Community/types';

// ** Hooks **
import { useAxiosPatch, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

// ** Redux Selectors **
import { Roles } from 'constants/common.constant';
import FileUploadModal from 'modules/Community/components/FileUpload';
import { getCurrentUser, setUserData } from 'reduxStore/slices/authSlice';

const CommentInput = ({
  isReply,
  className,
  placeHolder,
  postData,
  parentId,
  initialValue,
  toggleComments,
  refetch,
  countRefetch,
  setEditComment,
  isEdit,
  openRepliesBox,
  isUserBanned,
  visibleComments,
}: CommentInputProps) => {
  // ** Axios Hooks **
  const [createComment, { isLoading: isCreating }] = useAxiosPost();
  const [updateComment, { isLoading: isUpdating }] = useAxiosPatch();
  const modal = useModal();

  // ** Modals   **
  const displayNamePermissionModal = useModal();

  // ** State **
  const [submitModalData, setSubmitModalData] = useState(false);
  const [displayProfile, setDisplayProfile] = useState<boolean>(false);
  // Add a new state to track if submission is in progress
  const [isSubmitting, setIsSubmitting] = useState(false);

  // **  Ref **
  const formikRef = useRef<FormikProps<FormikValues>>();

  // ** Translation and Redux State **
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  // ** State for toggling comment section and icon **
  // const [isCommentsToggled, setIsCommentsToggled] = useState(
  //   visibleComments?.[postData?.id ?? ''] ?? false
  // );
  // ** Attachment URL and Initial Values **
  const attachmentUrl = initialValue
    ? initialValue?.attachments?.map((item) => item.url)
    : [];

  const initialValues = initialValue
    ? {
        post_id: postData?.id,
        description: initialValue.description,
        comment_id: initialValue.id,
        attachments: attachmentUrl,
        parent_thread_id: parentId ?? null,
      }
    : {
        post_id: postData?.id,
        description: '',
        attachments: [],
        parent_thread_id: parentId ?? null,
      };

  const OnSubmit = async (values: FormikValues) => {
    // Check if submission is already in progress
    if (isSubmitting) return;

    // Check for empty comment
    if (
      !values?.attachments &&
      (!values?.description || values?.description?.trim() === '')
    ) {
      return;
    }

    // Set submission state to true
    setIsSubmitting(true);

    const formData = new FormData();
    const urls: string[] = []; // Store string-based URLs
    let fileIndex = 0; // Track file index

    // Populate formData
    Object.entries(values ?? {}).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((fileOrUrl) => {
          if (typeof fileOrUrl === 'string') {
            urls.push(fileOrUrl); // Store URLs separately
          } else {
            formData.append(`attachments[${fileIndex}]`, fileOrUrl); // Indexed file key
            fileIndex++;
          }
        });
      } else if (key !== 'attachments' && value?.length !== 0) {
        formData.append(key, value);
      }
    });

    //  Append URLs as JSON (so they are handled properly)
    if (urls.length > 0) {
      formData.append('attachment_urls', JSON.stringify(urls));
    }

    try {
      if (isEdit && setEditComment) {
        setEditComment({ isEdit: false });
        const { error } = await updateComment('/comment', formData);
        if (!error) {
          // if (postData?.id) {
          //   await countRefetch?.();
          //   refetch?.(postData?.id, true);
          // }
          if (formikRef.current) {
            formikRef.current.resetForm();
          }
        }
        return;
      }

      if (user?.is_show_profile !== null || submitModalData) {
        if (submitModalData) {
          formData.append('is_display_profile', String(displayProfile));
        }
        const { error, data } = await createComment('/comment', formData);
        if (!error) {
          if (postData?.id) {
            countRefetch?.();
            await refetch?.(postData?.id, true);
          }
          if (formikRef.current) {
            formikRef.current.resetForm();
          }
          if (submitModalData) {
            setSubmitModalData(false);
            displayNamePermissionModal.closeModal();
          }
          if (!visibleComments?.[postData?.id ?? '']) {
            handleToggleComments();
          }
        }
        openRepliesBox?.(data?.id);
      } else {
        displayNamePermissionModal.openModal();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      // Reset submission state
      setIsSubmitting(false);
    }
  };

  const handleSubmitRef = () => {
    if (formikRef.current && !isSubmitting) {
      setSubmitModalData(true);
      dispatch(setUserData({ user: { ...user, is_show_profile: displayProfile } }));
      formikRef.current.submitForm();
    }
  };

  // ** Toggle Comments and Icon Functionality **
  const handleToggleComments = () => {
    toggleComments?.();
  };

  return (
    <>
      <div
        className={`w-full comment-input relative flex gap-4 [&:has(.reply-input)]:mt-4 ${className ?? ''}`}
      >
        <Formik
          initialValues={initialValues}
          innerRef={formikRef as React.Ref<FormikProps<FormikValues>>}
          onSubmit={(values) => {
            OnSubmit(values);
          }}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            const isButtonDisabled =
              user?.role?.role === Roles?.Student
                ? (!values?.description?.trim() &&
                    values?.attachments?.length === 0) ||
                  isUserBanned ||
                  !user?.community_access?.post ||
                  isSubmitting || // Add isSubmitting to disable conditions
                  isCreating ||
                  isUpdating
                : (!values?.description?.trim() &&
                    values?.attachments?.length === 0) ||
                  isUserBanned ||
                  isSubmitting || // Add isSubmitting to disable conditions
                  isCreating ||
                  isUpdating;

            const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
              const inputValue = e.target.value;
              if (inputValue.length <= 1000) {
                setFieldValue('description', inputValue);
              }
            };

            return (
              <Form className="flex w-full gap-4 items-start">
                <div
                  className={`comment-input-wrap w-full relative ${isUserBanned && '!pl-0'} flex-1 ${isReply ? ' ' : ' pl-2 [&_.multi-upload-wrap]:pl-0 reply-input bg-white transition-all duration-300 border border-solid border-LightGray rounded-10px'}`}
                >
                  <InputField
                    parentClass={`input-wrap w-full relative bg-white rounded-10px transition-all duration-300 w-full ${isUserBanned && '!pl-2'} ${isReply ? ' pl-2' : '  '}`}
                    placeholder={placeHolder ?? 'Comment here..'}
                    type="text"
                    className={`text-input pl-4 !ring-0 !ring-transparent !ring-offset-0 w-[calc(100%_-_30px)] h-full p-0 border-none min-h-10 rounded-10px !bg-transparent focus-within:!shadow-none   ${isReply ? '' : '  '}`}
                    value={values?.description}
                    name="description"
                    isDisabled={isUserBanned || isSubmitting}
                    onChange={handleDescriptionChange}
                  />
                  {!isUserBanned && (
                    <FileUploadModal
                      setFieldValue={setFieldValue}
                      values={values}
                      keyValue="attachments"
                      comment
                      isMulti
                      modal={modal}
                    />
                  )}
                </div>

                {isReply ? (
                  <Button
                    type="submit"
                    className={`comment-input-submit w-9 h-9 bg-black rounded-full text-white inline-flex items-center justify-center cursor-pointer p-1.5 active:scale-95 transition-all duration-300 ${isButtonDisabled ? '!cursor-not-allowed' : ''}`}
                    disabled={isButtonDisabled}
                    isLoading={isEdit ? isUpdating : isCreating}
                  >
                    <Image iconClassName=" w-full h-full" iconName="send" />
                  </Button>
                ) : (
                  <div className="comment-submit">
                    <Button
                      variants="black"
                      type="submit"
                      className={`w-fit ${isButtonDisabled ? 'cursor-not-allowed' : ''}`}
                      disabled={isButtonDisabled}
                      isLoading={isEdit ? isUpdating : isCreating}
                    >
                      {isEdit
                        ? t('Conversation.InputComment.edit')
                        : t('Conversation.InputComment.send')}
                    </Button>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
        {!isReply && !isEdit && (postData?.parentCommentCount ?? 0) > 0 && (
          <div className="shrink-0 coment-count ml-auto inline-flex items-center cursor-pointer hover:text-black gap-1 text-PrimaryWood">
            <Button
              onClickHandler={handleToggleComments}
              className="flex items-center gap-2 underline text-base leading-12 underline-offset-2"
            >
              {postData?.parentCommentCount} {t('Community.Table.Comments')}
              <Image
                iconName="chevronRight"
                iconClassName={`transition-all duration-300 rotate-90 w-18px h-18px ${visibleComments?.[postData?.id ?? ''] ? '!-rotate-90' : ''}`}
              />
            </Button>
          </div>
        )}
      </div>
      <ConfirmationPopup
        showCloseIcon
        modal={displayNamePermissionModal}
        deleteTitle={t('Conversation.permissionTitle')}
        bodyText={t('Conversation.permissionBodyText')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Continue')}
        cancelButtonFunction={() => displayNamePermissionModal.closeModal()}
        confirmButtonFunction={() => {
          if (displayProfile && !isSubmitting) {
            handleSubmitRef();
          }
        }}
        isDisabled={!displayProfile || isSubmitting}
        popUpType="info"
        isCheckBox
        setProfile={setDisplayProfile}
      />
    </>
  );
};

export default CommentInput;
