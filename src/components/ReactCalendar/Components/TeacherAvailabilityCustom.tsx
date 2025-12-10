import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import StatusLabel, { statusVariants } from 'components/StatusLabel';
import { AvailabilitiesTypeEnum } from 'constants/common.constant';
import { format, parseISO } from 'date-fns';
import { useAxiosPut } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Event, TimeSlotsProps } from '../types';

const TeacherAvailabilityCustom = ({
  event,
  timeSlot,
  onRefreshCalendar,
}: {
  event: Event;
  timeSlot?: TimeSlotsProps;
  onRefreshCalendar?: () => void;
}) => {
  const { t } = useTranslation();
  const [updateAvailability, { isLoading: updateLoading }] = useAxiosPut();

  const isExpired =
    event.start &&
    new Date().setHours(0, 0, 0, 0) > new Date(event.start).setHours(0, 0, 0, 0);
  const confirmationModal = useModal();

  const deleteAvailability = async () => {
    delete timeSlot?.conflict;
    const { error } = await updateAvailability('/teacher-availabilities', {
      availabilities: [
        {
          ...timeSlot,
          date: timeSlot?.start_time,
        },
      ],
      deletedIds: [timeSlot?.id],
      deleteAllSlot: false,
    });
    if (_.isNil(error)) {
      if (onRefreshCalendar) onRefreshCalendar();
      confirmationModal.closeModal();
    } else {
      confirmationModal.closeModal();
    }
  };

  return (
    <div
      className='teacher-profile-item bg-PrimaryBlue/10 border-PrimaryBlue'
    >
      <div className="teacher-profile-wrap">
        <div className="teacher-profile-image">
          <Image
            imgClassName="w-full h-full rounded-full"
            src={event?.user?.profile_image}
            serverPath={Boolean(event?.user?.profile_image)}
            isFromDataBase={Boolean(event?.user?.profile_image)}
            firstName={event?.user?.full_name}
          />
        </div>
        <span className="teacher-profile-text">{event?.user?.full_name}</span>
      </div>
      <div className="teacher-profile-slot-list !flex-row">
        <StatusLabel
          text='L'
          variants={
            statusVariants.darkBlue
          }
        />
        <StatusLabel
          text={
            <div className="flex gap-1 items-center">
              <Image iconName="clock" iconClassName="w-[16px]" />
              <span className="!text-nowrap">
                {timeSlot?.start_time
                  ? format(parseISO(timeSlot.start_time), 'hh:mm a')
                  : ''}
                &nbsp;-&nbsp;
                {timeSlot?.end_time
                  ? format(parseISO(timeSlot.end_time), 'hh:mm a')
                  : ''}
              </span>
            </div>
          }
          variants={statusVariants.darkBlue}
        />
        {!isExpired && (
          <Button
            className="action-button red icon-delete text-PrimaryRed"
            onClickHandler={() => {
              confirmationModal.openModal();
            }}
            tooltipText={t('Tooltip.Delete')}
            tooltipPosition="left"
          >
            <Image iconName="trashIcon" />
          </Button>
        )}
      </div>
      <ConfirmationPopup
        showCloseIcon
        modal={confirmationModal}
        deleteTitle={
          timeSlot?.conflict
            ? t('Teacher.Bypass.Title')
            : t('teacherAvailability.form.timeSlots.proceed')
        }
        bodyText={
          timeSlot?.conflict
            ? t('teacherAvailability.form.timeSlots.Conflict')
            : t('teacherAvailability.form.timeSlots.proceedText')
        }
        cancelButtonText={`${t('Settings.cancel')}`}
        confirmButtonText={t('Button.Ok')}
        confirmButtonFunction={deleteAvailability}
        popUpType="warning"
        // isSlotReoccurring={!isUpdate}
        confirmCheckbox={!!timeSlot?.conflict}
        isLoading={updateLoading}
        isDisabled={updateLoading}
      />
    </div>
  );
};

export default TeacherAvailabilityCustom;
