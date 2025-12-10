import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import StatusLabel, { statusVariants } from 'components/StatusLabel';
import ToolTip from 'components/Tooltip';
import UserProfile from 'components/UserProfile';
import { VITE_DATE_FORMAT } from 'config';
import { CourseTypeEnum, Roles } from 'constants/common.constant';
import { format } from 'date-fns';
import { useAxiosDelete } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { CourseVisibilityEnum } from 'modules/Course/Admin/constants';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getConvertedTime } from 'utils';
import { CustomEventProps } from '../types';

export const DropdownList = ({ options }: { options: JSX.Element[] }) => {
  if (!options.length) return null;

  return (
    <div className="dropdownList topic-option group ml-auto relative z-[10] overflow-visible">
      <span className="icon cursor-pointer absolute top-0 right-0">
        <Image iconName="threeMoreDots" />
      </span>

      <ul className="calendar_tooltip p-2 flex flex-col gap-2 absolute top-0 !left-unset !right-full me-7 -translate-x-1 bg-white rounded-[10px] drop-shadow-lg opacity-100 visible pointer-events-auto transition-all duration-300 min-w-[100px] z-[20]">
        {options.map((option, index) => (
          <li key={index} className={`three_dot_key_${index}`}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CourseCustomEvent = ({
  event,
  currentView,
  onRefreshCalendar,
  isTeacherSide,
}: CustomEventProps) => {
  const { t } = useTranslation();
  const [deleteApi, { isLoading: isLoadingDeleteApi }] = useAxiosDelete();
  const deleteModal = useModal();
  const [organization, setOrganization] = useState<any>(null);

  const handleDelete = async (id: string) => {
    const { error } = await deleteApi('/calendar', { data: { id } });
    if (!error) {
      onRefreshCalendar?.();
      deleteModal.closeModal();
    }
  };

  // const colorClasses =
  //   event.course?.type?.type === CourseTypeEnum.ZOOM_CLASS
  //     ? 'bg-eventBlueTint border-eventBlue'
  //     : event.course?.type?.type === CourseTypeEnum.IN_PERSON_CLASS
  //       ? 'bg-eventOrangeTint border-eventOrange'
  //       : event?.course?.type?.type === CourseTypeEnum.APPOINTMENTS &&
  //           event?.course?.private_mode === 'In-Person'
  //         ? 'bg-eventDarkGreenTint border-eventDarkGreen'
  //         : 'bg-eventLightGreenTint border-eventLightGreen';

  const colorClasses = 'border-PrimaryWood/20 bg-LightGray';
  const statusLabelVariant =
    event.course?.type?.type === CourseTypeEnum.ZOOM_CLASS
      ? statusVariants.eventBlue
      : event.course?.type?.type === CourseTypeEnum.IN_PERSON_CLASS
        ? statusVariants.eventOrange
        : event?.course?.type?.type === CourseTypeEnum.APPOINTMENTS &&
            event?.course?.private_mode === 'In-Person'
          ? statusVariants.eventDarkGreen
          : statusVariants.eventLightGreen;
  // const textColor =
  //   event.course?.type?.type === CourseTypeEnum.ZOOM_CLASS
  //     ? 'text-eventBlue'
  //     : event.course?.type?.type === CourseTypeEnum.IN_PERSON_CLASS
  //       ? 'text-eventOrange'
  //       : event?.course?.type?.type === CourseTypeEnum.APPOINTMENTS &&
  //           event?.course?.private_mode === 'In-Person'
  //         ? 'text-eventDarkGreen'
  //         : 'text-eventLightGreen';

  const textColor = 'text-black';
  // const UserProfileColor =
  //   event.course?.type?.type === CourseTypeEnum.ZOOM_CLASS
  //     ? 'text-eventBlueTint bg-eventBlue'
  //     : event.course?.type?.type === CourseTypeEnum.IN_PERSON_CLASS
  //       ? 'text-eventOrangeTint bg-eventOrange'
  //       : event?.course?.type?.type === CourseTypeEnum.APPOINTMENTS &&
  //           event?.course?.private_mode === 'In-Person'
  //         ? 'text-eventDarkGreenTint bg-eventDarkGreen'
  //         : 'text-eventLightGreenTint bg-eventLightGreen';
  const UserProfileColor = 'bg-LightGray border-PrimaryWood/20 border';

  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedStartTime =
    event?.course?.start_date &&
    getConvertedTime(event.course.start_date, localTimeZone);
  const formattedEndTime =
    event?.course?.end_date &&
    getConvertedTime(event?.course?.end_date, localTimeZone);

  const statusLabels = (
    <>
      <StatusLabel
        text={event.course?.type?.type}
        className="!px-2 !py-1 !text-xs !text-white"
        variants={statusLabelVariant}
      />
      {event?.course?.private_mode && (
        <StatusLabel
          text={event?.course?.private_mode}
          className="!px-2 !py-1 !text-xs !text-white"
          variants={statusLabelVariant}
        />
      )}
    </>
  );

  useEffect(() => {
    if (event?.course?.course_visibility) {
      setOrganization(
        event?.course?.course_visibility?.find(
          (data) =>
            data?.user?.user_role?.role?.role === CourseVisibilityEnum.Organization
        )
      );
    }
  }, [event?.course?.course_visibility]);

  return (
    <>
      {currentView === 'month' ? (
        <div
          className={`p-2 h-full border rounded-md flex flex-col gap-2 max-w-[130px] min-[1500px]:max-w-full ${colorClasses} !text-black/70`}
        >
          <div className="flex justify-end gap-1 flex-wrap">{statusLabels}</div>
          <div className="flex justify-between items-center gap-2 w-full">
            <ToolTip
              value={event.course?.title}
              position="bottom"
              spanClass={`w-0 flex-1 text-sm font-bold ${textColor}`}
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-between items-center">
            <div className="flex gap-2">
              <span className="flex min-[1500px]:gap-1 w-fit items-center ">
                <Image
                  iconName="clock"
                  iconClassName="min-[1500px]:w-[16px] w-[12px]"
                />
                <span className="!text-xs min-[1500px]:!text-sm">
                  {formattedStartTime} - {formattedEndTime}
                </span>
              </span>
            </div>

            {event?.course?.courseEnrolledCount &&
              event?.course?.max_participants && (
                <StatusLabel
                  text={
                    <div className="flex gap-1 items-center text-sm">
                      <Image iconName="users" iconClassName="w-4 m-0 fill-white" />
                      {`
                        ${
                          event?.course?.courseEnrolledCount >
                          event?.course?.max_participants
                            ? Number(event?.course?.max_participants).valueOf()
                            : Number(event?.course?.courseEnrolledCount).valueOf()
                        } / ${event?.course?.max_participants as number}
                        `}
                    </div>
                  }
                  className="rounded-full !py-0"
                  // variants={statusLabelVariant}
                  variants={statusVariants.LightWood}
                />
              )}
          </div>
        </div>
      ) : (
        <div
          className={`p-2 h-full border rounded-md ${colorClasses} !text-black/70 relative !min-w-[360px] ${currentView === 'week' ? '!max-w-[360px]' : '!max-w-[500px]'}`}
        >
          <div className="flex flex-col gap-2 justify-between max-h-[200px]">
            <div className="flex items-center justify-start gap-3">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-beteen gap-1">
                  <div className="flex gap-2">
                    {statusLabels}
                    {event?.course?.zoom_link && (
                      <Link
                        to={event?.course?.zoom_link}
                        className="!py-1 !px-2 button LightBlue flex gap-1 group/btn"
                        // tooltipPosition="top"
                        // tooltip={t('Calendar.startMeeting.title')}
                      >
                        <Image
                          iconName="zoomButtonIcon"
                          iconClassName="!w-4 !h-4 !text-PrimaryBlue group-hover/btn:!text-white"
                          iconLabel={t('Calendar.startMeeting.title')}
                        />
                      </Link>
                    )}
                  </div>
                  {!isTeacherSide &&
                    event.start_date &&
                    !(new Date(event.start_date).getTime() < Date.now()) && (
                      <DropdownList
                        options={[
                          <Button
                            className="action-button group/btn mx-auto my-auto !py-1 h-8 !justify-start !w-full !rounded-md"
                            onClickHandler={() => {
                              deleteModal.openModal();
                            }}
                            variants="RedOpacity"
                            tooltipPosition="left"
                          >
                            <Image
                              iconName="trashIcon"
                              iconLabel={t('Icon.Delete')}
                              iconClassName="!w-4 !h-4 !text-PrimaryRed group-hover/btn:!text-white"
                            />
                            {t('Tooltip.Delete')}
                          </Button>,
                        ]}
                      />
                    )}
                </div>
                <div className="flex justify-between items-center gap-2 w-full">
                  <ToolTip
                    value={event.course?.title}
                    position="bottom"
                    spanClass={`w-0 flex-1 text-[18px] font-bold ${textColor}`}
                  />
                </div>
                <div className="flex gap-2 flex-wrap justify-between items-center">
                  <div className="flex gap-2">
                    <span className="flex gap-1 w-fit items-center">
                      <Image iconName="calendar" iconClassName="w-[18px]" />
                      <span className=" !text-sm">
                        {event.start &&
                          format(event.start, String(VITE_DATE_FORMAT))}
                      </span>
                    </span>
                    <span className="flex gap-1 w-fit items-center">
                      <Image iconName="clock" iconClassName="w-[18px]" />
                      <span className=" !text-sm">
                        {formattedStartTime} - {formattedEndTime}
                      </span>
                    </span>
                  </div>

                  {event?.course?.courseEnrolledCount &&
                    event?.course?.max_participants && (
                      <div className="flex gap-1 items-center text-sm">
                        <Image iconName="users" iconClassName="w-4 m-0 fill-white" />
                        {`
                        ${
                          event?.course?.courseEnrolledCount >
                          event?.course?.max_participants
                            ? Number(event?.course?.max_participants).valueOf()
                            : Number(event?.course?.courseEnrolledCount).valueOf()
                        } / ${event?.course?.max_participants as number}
                        `}
                      </div>
                    )}
                </div>
              </div>
            </div>
            {!isTeacherSide && event.course?.assign_teachers && (
              <div
                className={`flex justify-between mt-1 p-2 rounded-full ${UserProfileColor}`}
              >
                <UserProfile
                  user={{
                    ...event.course.assign_teachers,
                    first_name:
                      event.course.assign_teachers.full_name?.split(' ')[0] ?? '-',
                    last_name:
                      event.course.assign_teachers.full_name?.split(' ')[1] ?? '-',
                  }}
                  imageClass="!w-7 !h-7"
                  textClass="text-sm.3"
                  isTooltip={false}
                />
                <StatusLabel
                  text={Roles.Teacher}
                  // variants={statusLabelVariant}
                  variants={statusVariants.LightWood}
                  // className="opacity-70"
                  className="rounded-full"
                />
              </div>
            )}
            {organization && (
              <div
                className={`flex justify-between p-2 rounded-full ${UserProfileColor}`}
              >
                {event.course?.assign_teachers && (
                  <UserProfile
                    user={{
                      ...organization.user,
                      first_name: organization.user.full_name?.split(' ')[0] ?? '-',
                      last_name: organization.user.full_name?.split(' ')[1] ?? '-',
                    }}
                    imageClass="!w-7 !h-7"
                    textClass="text-sm.3"
                    isTooltip={false}
                    isTeacherSide={isTeacherSide}
                  />
                )}
                <StatusLabel
                  text={Roles.Organization}
                  variants={statusVariants.LightWood}
                  // variants={statusLabelVariant}
                  // className="opacity-70"
                  className="rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {deleteModal.isOpen && (
        <ConfirmationPopup
          icon="exclamationMarkIcon"
          popUpType="warning"
          deleteTitle={t('Calender.Class.ConfirmationPopup.DeleteTitle')}
          modal={deleteModal}
          bodyText={t('Community.ConfirmationPopup.DeleteBody')}
          confirmButtonVariant="black"
          confirmButtonText={t('Subscription.conformationPlanModel.ConfirmButton')}
          cancelButtonText={t('Button.Cancel')}
          cancelButtonFunction={() => deleteModal.closeModal()}
          confirmButtonFunction={async () => {
            if (event?.id) {
              await handleDelete(event.id);
            }
          }}
          isLoading={isLoadingDeleteApi}
        />
      )}
    </>
  );
};

export default CourseCustomEvent;
