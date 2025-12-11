import { CalendarEvent } from 'components/ReactCalendar/types';
import {
  endOfDay,
  format,
  getDay,
  isSameDay,
  parse,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { useAxiosGet } from 'hooks/useAxios';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Calendar,
  dateFnsLocalizer,
  EventProps,
  ToolbarProps,
  View,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomEvent from './Components/CustomEvent';
import { EditDaySlots } from './Components/EditDaySlots';
import './styles/index.css';
import {
  AllSlotsProps,
  CustomToolbarProps,
  TeacherCalendarProps,
  CalendarTabValueProps,
} from './types';

const locales = {
  'en-US': enUS,
  es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const TeacherCalendar = ({
  currentTab,
  setFilterRange,
  events,
  onViewChange,
  calendarView,
  loadingAllAvailabilities,
  fetchEvents,
}: TeacherCalendarProps) => {
  const [getApi, { isLoading: getDayLoading }] = useAxiosGet();
  const [getAssessmentData, { isLoading: isLoadingLiveAssessment }] = useAxiosGet();
  const [daySlots, setDaySlots] = useState<AllSlotsProps[] | CalendarEvent[]>([]);
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const [selectedDate, setSelectedDate] = useState<string | Date>();
  const [currentView, setCurrentView] = useState<View>(
    calendarView as unknown as View
  );

  const parentRef = useRef<HTMLDivElement>(null);

  // const customToolbarCallback = useCallback(
  //   (props: ToolbarProps<EventProps, object>) => {
  //     return <CustomToolbar {...(props as CustomToolbarProps)} />;
  //   },
  //   [currentTab]
  // );

  const getSlotListing = async (date: string) => {
    const responseData = await getApi(`/teacher-availabilities/${date}`, {
      params: {
        timezone: timeZone,
      },
    });
    setDaySlots(responseData?.data?.data as AllSlotsProps[]);
  };

  const getLiveAssessmentSlotsListing = async (
    date1: string,
    date2: string,
    referenceEvents: CalendarEvent[]
  ): Promise<void> => {
    const responseData = await getAssessmentData(`/live-assessment`, {
      params: {
        start_date: date1,
        end_date: date2,
        view: true,
      },
    });

    const fetchedLiveAssessment: CalendarEvent[] = responseData?.data?.data ?? [];

    const filteredLiveAssessment = fetchedLiveAssessment
      .filter((liveAssessmentItem) =>
        referenceEvents.some((eventItem) => eventItem?.id === liveAssessmentItem?.id)
      )
      .map((item) => ({
        ...item,
        currentTab,
      }));

    setDaySlots(filteredLiveAssessment as CalendarEvent[]);
  };

  const onSelectSlot = (slotInfo: { start: Date }) => {
    setSelectedDate(slotInfo.start);
    const localStart = startOfDay(slotInfo.start);
    const localEnd = endOfDay(slotInfo.start);

    const date1 = zonedTimeToUtc(localStart, timeZone).toISOString();
    const date2 = zonedTimeToUtc(localEnd, timeZone).toISOString();
    if (currentTab === CalendarTabValueProps.Live_Assessments) {
      getLiveAssessmentSlotsListing(date1, date2, events as CalendarEvent[]);
    } else {
      const date = zonedTimeToUtc(startOfDay(slotInfo.start), 'UTC').toISOString();
      getSlotListing(date);
    }
  };

  const onSelectEvent = async (event: any) => {
    setSelectedDate(event.start);

    const date1 = zonedTimeToUtc(event.start, timeZone).toISOString();
    const date2 = zonedTimeToUtc(event.end, timeZone).toISOString();
    if (currentTab === CalendarTabValueProps.Live_Assessments) {
      getLiveAssessmentSlotsListing(date1, date2, events as CalendarEvent[]);
    } else {
      const date = zonedTimeToUtc(startOfDay(event.start), 'UTC').toISOString();
      getSlotListing(date);
    }
  };

  useEffect(() => {
    if (!parentRef.current) return;

    const observer = new ResizeObserver(() => {
      if (!parentRef.current) return;

      const eventElements = parentRef.current.querySelectorAll('.rbc-event');

      eventElements.forEach((eventEl) => {
        const label = eventEl.querySelector('.rbc-event-label');
        if (label) {
          const eventHeight = eventEl.getBoundingClientRect().height;
          const fontSize = eventHeight < 40 ? 9 : 13;
          (label as HTMLElement).style.fontSize = `${fontSize}px`;
        }
      });
    });

    observer.observe(parentRef.current);
    return () => {
      observer.disconnect();
    };
  }, [events]);

  useEffect(() => {
    if (loadingAllAvailabilities) {
      setDaySlots([]);
    }
  }, [loadingAllAvailabilities]);

  const dayPropGetter = (date: Date) => {
    const currentDay = date;
    const currentStartDay = startOfDay(currentDay);
    const currentEndDay = endOfDay(currentDay);
    const classNames = [];
    if (selectedDate && isSameDay(selectedDate as Date, currentDay)) {
      classNames.push('highlighted-day');
    }
    const hasEvents = events?.some(
      (event: { start_time: string; end_time: string }) => {
        const eventStart = new Date(event?.start_time as string);
        const eventEnd = new Date(event?.end_time as string);
        return (
          (eventStart >= currentStartDay && eventStart <= currentEndDay) ||
          (eventEnd >= currentStartDay && eventEnd <= currentEndDay)
        );
      }
    );
    if (hasEvents) {
      classNames.push('event-day');
    }
    return {
      className: classNames.join(' '),
    };
  };
  return (
    <div ref={parentRef} className="">
      <Calendar
        localizer={localizer}
        events={events}
        // components={{
        //   toolbar: customToolbarCallback,
        // }}
        onView={(e) => {
          setSelectedDate(undefined);
          setDaySlots([]);
          setCurrentView(e);
          onViewChange(e);
        }}
        defaultView={currentView as View}
        onRangeChange={(range) => {
          if (Array.isArray(range)) {
            setFilterRange?.({
              start_date: startOfDay(range?.[0])?.toISOString(),
              end_date: endOfDay(range[range.length - 1])?.toISOString(),
            });
          } else {
            setFilterRange?.({
              start_date: range?.start.toISOString(),
              end_date: range?.end.toISOString(),
            });
          }
        }}
        onSelectSlot={(slotInfo) => {
          onSelectSlot(slotInfo);
        }}
        onSelectEvent={onSelectEvent}
        selectable
        dayPropGetter={dayPropGetter}
        onNavigate={() => {
          setSelectedDate(undefined);
          setDaySlots([]);
        }}
      />

      {currentTab === 'Manage Availability' ? (
        <EditDaySlots
          daySlots={daySlots as AllSlotsProps[]}
          selectedDate={selectedDate}
          getDayLoading={getDayLoading || isLoadingLiveAssessment}
          getSlotListing={getSlotListing}
          fetchEvents={fetchEvents}
        />
      ) : (
        <CustomEvent
          events={daySlots as CalendarEvent[]}
          isLoading={getDayLoading || isLoadingLiveAssessment}
          currentTab={currentTab}
          currentView={currentView}
        />
      )}
    </div>
  );
};

export default TeacherCalendar;
