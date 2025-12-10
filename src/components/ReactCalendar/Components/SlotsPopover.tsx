import 'components/ReactCalendar/style/index.css';
import { format } from 'date-fns';
import { t } from 'i18next';
import React from 'react';
import { SlotsPopoverProps } from '../types';
import TeacherAvailabilityCustom from './TeacherAvailabilityCustom';

const SlotsPopover: React.FC<SlotsPopoverProps> = ({
  event,
  timeSlots,
  isLoading,
  onRefreshCalendar,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 min-w-[320px]">
        <div className="lazy h-12" />
      </div>
    );
  }
  return (
    <div className="teacher-event-popover">
      <h5 className="">
        {t('Calendar.modal.popupText')}&nbsp;
        <span>({format(event?.start, 'dd, MMM')})</span>
      </h5>

      {timeSlots && timeSlots?.length > 0 ? (
        timeSlots?.map((timeSlot) => (
          <TeacherAvailabilityCustom
            timeSlot={timeSlot}
            event={event}
            onRefreshCalendar={onRefreshCalendar}
            key={timeSlot.id}
          />
        ))
      ) : (
        <p>{t('Calendar.slots.notAvailable')}</p>
      )}
    </div>
  );
};

export default SlotsPopover;
