import React, { useRef } from 'react';
import { usePopper } from 'react-popper';
import { useClickOutside } from '../hooks/useClickOutside';
import { CalendarEvent, TabValueProps, TimeSlotsProps } from '../types';
import CoursesPopover from './CoursesPopover';
import SlotsPopover from './SlotsPopover';

interface EventPopoverProps {
  event: CalendarEvent | null;
  referenceElement: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  timeSlots?: TimeSlotsProps[];
  currentTab?: string;
  isLoading?: boolean;
  onRefreshCalendar?: () => void;
}

export const EventPopover: React.FC<EventPopoverProps> = ({
  event,
  referenceElement,
  isOpen,
  onClose,
  timeSlots,
  currentTab,
  isLoading,
  onRefreshCalendar,
}) => {
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>(
    null
  );
  const popperRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(popperRef, onClose, { current: referenceElement });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'auto',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
    ],
  });

  if (!isOpen || !event) return null;

  return (
    <div
      ref={(el) => {
        setPopperElement(el);
        if (popperRef) {
          popperRef.current = el;
        }
      }}
      style={styles.popper}
      {...attributes.popper}
      className={`${currentTab}-month-event-popover month-event-popover ${currentTab === TabValueProps.Live_Assessments}`}
    >
      {currentTab === TabValueProps.Teachers ? (
        <SlotsPopover
          event={event}
          timeSlots={timeSlots}
          isLoading={isLoading}
          onRefreshCalendar={onRefreshCalendar}
        />
      ) : (
        <CoursesPopover
          event={event}
          currentTab={currentTab}
          isLoading={isLoading}
          onRefreshCalendar={onRefreshCalendar}
        />
      )}
    </div>
  );
};
