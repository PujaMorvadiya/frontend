import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import { format, parseISO } from 'date-fns';
import { useAxiosDelete } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { CalendarEvent, TabValueProps } from '../types';
import CourseCustomEvent from './CourseCustomEvent';
import LiveAssessmentCustomEvent from './LiveAssessmentCustomEvent';

interface ShowMorePopoverProps {
  referenceElement: HTMLElement | null;
  daySlots?: any[];
  onClose: () => void; // Callback to handle closing the popover
  currentTab?: string;
  isLoading?: boolean;
  onRefreshCalendar?: () => void;
}

const ShowMorePopover: React.FC<ShowMorePopoverProps> = ({
  referenceElement,
  daySlots,
  onClose,
  currentTab,
  isLoading,
  onRefreshCalendar,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [selectedCourseId] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
  });

  const [deleteApi] = useAxiosDelete();
  const deleteModal = useModal();

  const handleDelete = async (id: string) => {
    const { error } = await deleteApi('/calendar', { data: { id } });
    if (!error) {
      onRefreshCalendar?.();
      deleteModal.closeModal();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={(node) => {
        setPopperElement(node);
        popoverRef.current = node;
      }}
      style={{
        ...styles.popper,
        zIndex: 1000,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        maxHeight: '530px',
        overflowY: 'auto',
      }}
      {...attributes.popper}
    >
      {isLoading ? (
        <div className="flex flex-col gap-4 min-w-[320px]">
          <div className="lazy h-12" />
          <div className="lazy h-12" />
          <div className="lazy h-12" />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {currentTab === TabValueProps.Teachers &&
            !_.isEmpty(daySlots) &&
            daySlots?.map((slotData) => (
              <div
                key={slotData.user_id}
                className="teacher-profile-item min-w-[400px] gap-1"
              >
                <div className="teacher-profile-wrap">
                  <div className="teacher-profile-image">
                    <Image
                      imgClassName="w-full h-full rounded-full"
                      src={slotData?.data?.[0]?.user?.profile_image}
                      serverPath
                      isFromDataBase={Boolean(
                        slotData?.data?.[0]?.user?.profile_image
                      )}
                      firstName={slotData?.data?.[0]?.user?.first_name}
                    />
                  </div>
                  <span className="teacher-profile-text">
                    {slotData?.data?.[0]?.user?.full_name || slotData?.teacher_name}
                  </span>
                </div>

                {slotData?.data && slotData.data.length > 0 ? (
                  <div className="teacher-profile-slot-list">
                    {slotData.data.map((event: CalendarEvent) => (
                      <div
                        key={event.id}
                        className="teacher-profile-slot-item whitespace-nowrap"
                      >
                        {format(parseISO(event.start_time), 'hh:mm a')} &ndash;{' '}
                        {format(parseISO(event.end_time), 'hh:mm a')}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>This Availability is already used fully!!!</p>
                )}
              </div>
            ))}
          {currentTab === TabValueProps.Courses &&
            daySlots?.map((data) => {
              return (
                <div className="mt-2">
                  <CourseCustomEvent
                    event={data}
                    currentView="day"
                    onRefreshCalendar={onRefreshCalendar}
                  />
                </div>
              );
            })}
          {currentTab === TabValueProps.Live_Assessments &&
            daySlots?.map((data) => {
              return (
                <LiveAssessmentCustomEvent
                  event={{ ...data, currentTab }}
                  currentView="day"
                  onRefreshCalendar={onRefreshCalendar}
                />
              );
            })}
        </div>
      )}
      <ConfirmationPopup
        showCloseIcon
        modal={deleteModal}
        deleteTitle="Want to Delete?"
        bodyText="This action is permanent and will completely delete the selected item. All associated data will be lost."
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        cancelButtonFunction={() => deleteModal.closeModal()}
        confirmButtonFunction={async () => {
          try {
            if (selectedCourseId) {
              await handleDelete(selectedCourseId);
            }
          } catch (error) {
            console.error('Delete failed:', error);
          }
        }}
        popUpType="danger"
      />
    </div>
  );
};

export default ShowMorePopover;
