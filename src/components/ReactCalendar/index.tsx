import {
  addMinutes,
  endOfDay,
  format,
  getDay,
  parse,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { useAxiosGet } from 'hooks/useAxios';
import React, { useEffect, useRef, useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventPopover } from './Components/EventPopover';
import ShowMorePopover from './Components/ShowMorePopover';
import { CustomEvent } from './Components/CustomEvent';
import {
  CalendarEvent,
  ReactCalendarProps,
  TabValueProps,
  TimeSlotsProps,
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

const Calendar = ({
  setFilterRange,
  events,
  currentTab,
  onViewChange,
  calendarView,
  setCurrentDate,
  currentDate,
  filterOption,
  onRefreshCalendar,
  filterValue,
}: ReactCalendarProps) => {
  const [getAPi, { isLoading }] = useAxiosGet();
  const [getAssessmentData, { isLoading: isLoadingLiveAssessment }] = useAxiosGet();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlotsProps[]>();
  const [eventElement, setEventElement] = useState<HTMLElement | null>(null);
  const [showMorePosition, setShowMorePosition] = useState<HTMLElement | null>(null);
  const [currentView, setCurrentView] = useState<View>(calendarView ?? 'day');
  const calendarRef = useRef<null | HTMLDivElement>(null);

  const [daySlots, setDaySlots] = useState([] as CalendarEvent[]);
  const modalClickApi = async (startDate: Date, teacherId: string) => {
    const date = startDate.toISOString();

    const responseData = await getAPi(`/calendar/teacher-availability/${date}`, {
      params: {
        allAvailabilities: true,
        teacherId,
      },
    });
    setTimeSlots(responseData.data);
  };

  const modalClickCourseApi = async (id: string) => {
    const responseData = await getAPi(`/calendar/courses`, {
      params: { id },
    });
    setTimeSlots(responseData.data);
  };

  const modalClickLiveAssessmentApi = async (id: string) => {
    const { data, error } = await getAssessmentData('/live-assessment', {
      params: { id },
    });
    if (data && !error) {
      setTimeSlots(data);
    }
  };

  const getSlotListing = async (date: string) => {
    const responseData = await getAPi(`/calendar/teacher-availability/${date}`, {
      params: {
        allAvailabilities: true,
        view: true,
        showMore: true,
      },
    });
    setDaySlots(responseData?.data);
  };

  const getCourseSlotsListing = async (
    date1: string,
    date2: string,
    referenceEvents: CalendarEvent[]
  ): Promise<void> => {
    const responseData = await getAPi(`/calendar/courses`, {
      params: {
        start_date: date1,
        end_date: date2,
        view: true,
        ...(filterOption ? { course_mode: filterOption } : {}),
      },
    });

    const fetchedCourses: CalendarEvent[] = responseData?.data?.data ?? [];

    const filteredCourses = fetchedCourses.filter((courseItem) =>
      referenceEvents.some(
        (eventItem) => eventItem.course?.id === courseItem.course?.id
      )
    );
    setDaySlots(filteredCourses);
  };

  const getLiveAssessmentSlotsListing = async (
    date1: string,
    date2: string,
    referenceEvents: CalendarEvent[]
  ): Promise<void> => {
    const responseData = await getAPi(`/live-assessment`, {
      params: {
        start_date: date1,
        end_date: date2,
        view: true,
      },
    });

    const fetchedLiveAssessment: CalendarEvent[] = responseData?.data?.data ?? [];

    const filteredLiveAssessment = fetchedLiveAssessment.filter(
      (liveAssessmentItem) =>
        referenceEvents.some((eventItem) => eventItem?.id === liveAssessmentItem?.id)
    );

    setDaySlots(filteredLiveAssessment);
  };

  const handleSelectEvent = (event: CalendarEvent, e: React.SyntheticEvent) => {
    setSelectedEvent(event);
    setEventElement(e.currentTarget as HTMLElement);

    if (currentTab === TabValueProps.Teachers) {
      modalClickApi(event?.start as unknown as Date, event?.user_id as string);
    } else if (currentTab === TabValueProps.Live_Assessments) {
      modalClickLiveAssessmentApi(event?.id);
    } else {
      modalClickCourseApi(event?.id);
    }
  };

  const handleClosePopover = () => {
    setSelectedEvent(null);
  };

  const handleShowClosePopover = () => {
    setShowMorePosition(null);
  };

  const handleShowMore = async (
    e: React.MouseEvent<HTMLDivElement>,
    date: CalendarEvent[]
  ) => {
    setDaySlots([]);
    const rect = e.currentTarget as unknown as HTMLElement | null;
    setShowMorePosition(rect); // Store the position (top, left, right, bottom)
    const date1 = startOfDay(date[0]?.start).toISOString();
    const date2 = endOfDay(date[0]?.start).toISOString();
    if (currentTab === TabValueProps.Teachers) {
      getSlotListing(date1);
    } else if (currentTab === TabValueProps.Live_Assessments) {
      getLiveAssessmentSlotsListing(date1, date2, date);
    } else {
      getCourseSlotsListing(date1, date2, date);
    }
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  function get15MinSlots(startTime: string, endTime: string) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const slots: string[] = [];

    let current = start;

    while (current < end) {
      slots.push(format(current, 'hh:mm a')); // e.g. 04:15 PM
      current = addMinutes(current, 15);
    }

    return slots;
  }

  const renderCalendar = () => {
    if (!calendarRef.current || !events || !events.length) return;

    if (currentView === 'day') {
      const eventNodes = calendarRef.current
        .getElementsByClassName('rbc-events-container')
        .item(0)?.childNodes;

      const events = [];

      if (eventNodes) {
        events.push(...Array.from(eventNodes));
      }

      const eventPositions = events
        ? Array.from(events).map((event) => {
          const rect = (event as HTMLElement).getBoundingClientRect();
          return {
            top: rect.top ?? 0,
            left: rect.left ?? 0,
            width: rect.width ?? 0,
            height: rect.height ?? 0,
          };
        })
        : [];

      for (let i = 0; i < events.length; i++) {
        const event = events[i] as HTMLElement;

        const start = eventPositions[i]?.top;
        const end = start + (eventPositions[i]?.height || 0);
        let count = 1;
        let prevEventsCount = 1;
        for (let j = 0; j < events.length; j++) {
          if (i !== j) {
            const posTop = eventPositions[j]?.top;
            const postEnd = posTop + (eventPositions[j]?.height || 0);
            if (
              (posTop !== undefined && postEnd >= start && posTop <= end) ||
              (start !== undefined && end >= posTop && start <= postEnd)
            ) {
              if (i <= j) {
                prevEventsCount++;
              }
              count++;
            }
          }
        }
        if (count > 3) {
          event.style.width = `100%`;
          event.style.maxWidth = `360px`;
          event.style.left = `${(prevEventsCount - 1) * 370}px`;
        } else {
          event.style.width = `calc(${100 / count}% - 2px)`;
        }
      }
    }

    if (currentView === 'week') {
      const dayWiseEvents: Record<string, CalendarEvent[]> = {};

      const dayElements = Array.from(
        calendarRef.current.getElementsByClassName('rbc-day-slot rbc-time-column')
      );
      const dayHeaderElements = Array.from(
        calendarRef.current
          .getElementsByClassName('rbc-row rbc-time-header-cell')
          .item(0)?.childNodes ?? []
      );

      if (!dayElements.length || !dayHeaderElements.length) {
        return true;
      }

      events.forEach((event) => {
        const startDate = new Date(event.start_date as string).getDay();

        if (dayWiseEvents[startDate]) {
          dayWiseEvents[startDate].push(event);
        } else {
          dayWiseEvents[startDate] = [event];
        }
        const endDate = new Date(event.start_date as string).getDay();
        if (endDate !== startDate) {
          if (dayWiseEvents[endDate]) {
            dayWiseEvents[endDate].push(event);
          } else {
            dayWiseEvents[endDate] = [event];
          }
        }
      });

      for (const [day, dayEvents] of Object.entries(dayWiseEvents)) {
        const eventCount: Record<string, number> = {};
        for (let i = 0; i < dayEvents.length; i++) {
          get15MinSlots(dayEvents[i].start_time, dayEvents[i].end_time).forEach(
            (slot) => {
              if (eventCount[slot]) {
                eventCount[slot] += 1;
              } else {
                eventCount[slot] = 1;
              }
            }
          );
        }
        const width = 375 * Math.max(...Object.values(eventCount));
        if (dayElements[+day] && dayHeaderElements[+day]) {
          (
            (dayElements[+day] as HTMLElement).childNodes.item(0) as HTMLDivElement
          ).style.width = `${width}px`;
          (dayHeaderElements[+day] as HTMLDivElement).style.setProperty(
            'min-width',
            `${width}px`,
            'important'
          );
        }
      }
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      renderCalendar();
    }
  }, [events, currentView]);

  return (
    <div className="content-base" ref={calendarRef}>
      <BigCalendar
        onView={(e) => {
          setCurrentView(e);
          onViewChange(e);
        }}
        defaultDate={currentDate}
        onNavigate={handleNavigate}
        className={`
      ${currentTab === 'Courses' || currentTab === TabValueProps.Live_Assessments ? 'calendar-course-view' : ''}
          ${currentView === 'month'
            ? 'admin-month-view'
            : currentView === 'week'
              ? 'admin-week-view'
              : currentView === 'day'
                ? 'admin-day-view'
                : ''
          } ${currentTab?.replaceAll(' ', '-').toLowerCase()}-calendar-view`}
        defaultView={currentView as View}
        localizer={localizer}
        events={events as CalendarEvent[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '900px' }}
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
        onSelectEvent={(e, event) => {
          if (
            !(
              (currentTab === 'Courses' &&
                (currentView === 'day' || currentView === 'week')) ||
              (currentTab === 'Live Assessments' &&
                (currentView === 'day' || currentView === 'week'))
            )
          ) {
            handleSelectEvent(e, event);
          }
        }}
        components={{
          event: (props: any) => {
            return (
              <CustomEvent
                {...props}
                currentView={currentView}
                currentTab={currentTab}
                onRefreshCalendar={onRefreshCalendar}
              />
            );
          },
          // toolbar: (props: any) => {
          //   return (
          //     <CustomToolbar
          //       {...props}
          //       currentTab={currentTab}
          //       filterOption={filterValue}
          //       setFilterOption={setFilterRange}
          //     />
          //   );
          // },
        }}
        formats={{
          dayFormat: (date, culture) => {
            return format(date, 'EEEE dd', {
              locale: locales[culture as keyof typeof locales],
            });
          },
          weekdayFormat: (date, culture) => {
            return format(date, 'EEEE', {
              locale: locales[culture as keyof typeof locales],
            });
          },
          dayRangeHeaderFormat: ({ start, end }, culture) => {
            const locale = locales[culture as keyof typeof locales] || enUS;
            const formattedStart = format(start, 'MMMM d', { locale });
            const formattedEnd = format(end, 'd, yyyy', { locale });
            return `${formattedStart} – ${formattedEnd}`;
          },
          dayHeaderFormat: (date, culture) => {
            return format(date, 'MMMM dd, yyyy', {
              locale: locales[culture as keyof typeof locales],
            });
          },
          monthHeaderFormat: (date, culture) => {
            return format(date, 'MMMM, yyyy', {
              locale: locales[culture as keyof typeof locales],
            });
          },
          eventTimeRangeFormat: () => {
            return '';
          },
        }}
        messages={{
          showMore: (total, date) =>
            (
              <div
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleShowMore(e, date)} // Pass the date here
              >{`+${total} more`}</div>
            ) as any,
        }}
        doShowMoreDrillDown={false}
        step={15}
        timeslots={1}
      />

      {!(
        (currentTab === 'Courses' &&
          (currentView === 'day' || currentView === 'week')) ||
        (currentTab === 'Live Assessments' &&
          (currentView === 'day' || currentView === 'week'))
      ) && (
          <EventPopover
            event={selectedEvent}
            referenceElement={eventElement}
            isOpen={!!selectedEvent}
            timeSlots={timeSlots}
            currentTab={currentTab}
            onClose={handleClosePopover}
            isLoading={isLoading || isLoadingLiveAssessment}
            onRefreshCalendar={onRefreshCalendar}
          />
        )}

      {showMorePosition && (
        <ShowMorePopover
          referenceElement={showMorePosition as HTMLElement | null}
          daySlots={daySlots}
          onClose={handleShowClosePopover}
          currentTab={currentTab}
          isLoading={isLoading || isLoadingLiveAssessment}
          onRefreshCalendar={onRefreshCalendar}
        />
      )}
    </div>
  );
};

export default Calendar;
