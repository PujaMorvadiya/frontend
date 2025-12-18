import Button from 'components/Button/Button';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import ReactCalendar from 'components/ReactCalendar';
import { CalendarEvent, TabValueProps } from 'components/ReactCalendar/types';
import TabComponent from 'components/Tabs';
import ToolTip from 'components/Tooltip';
import {
  addDays,
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
  subDays,
} from 'date-fns';
import { useAxiosGet } from 'hooks/useAxios';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-big-calendar';
import { useSearchParams } from 'react-router-dom';
import FilterComponent from './FilterComponent';
import FilterForTeacher from './FilterForTeacher';
import { LiveAssessment } from 'modules/Availability/types';
import { mergeDateAndTime } from 'utils/date';

export interface EventProps {
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  user: {
    full_name?: string;
  };
}

export interface CalendarFilterType {
  start_date?: string | Date;
  end_date?: string | Date;
}

const Calendar = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('calendar') ?? 'Courses';
  const [activeTab, setActiveTab] = useState(currentTab ?? 'Courses');
  const [searchParams, setSearchParams] = useSearchParams();
  const [getEvents, { isLoading }] = useAxiosGet();
  const [getAssessmentData, { isLoading: isLoadingLiveAssessment }] = useAxiosGet();
  const currentDate = new Date();
  const currentMonthStart = startOfMonth(currentDate);
  const currentMonthEnd = endOfMonth(currentDate);
  const visibleRangeStart = subDays(currentMonthStart, 6);
  const visibleRangeEnd = addDays(currentMonthEnd, 6);
  const [events, setEvents] = useState<EventProps[]>();
  const [calendarView, setCalendarView] = useState<View>('month');
  const isFirstRender = useRef(true);
  const [currentDate1, setCurrentDate] = useState(new Date());
  const [filterOption, setFilterOption] = useState('');
  const [filterValue, setFilterValue] = useState<CalendarFilterType>({
    start_date: format(visibleRangeStart, 'yyyy-MM-dd'),
    end_date: format(visibleRangeEnd, 'yyyy-MM-dd'),
  });
  const [filterTeacher, setFilterTeacher] = useState<{
    start_date?: null | Date;
    end_date?: null | Date;
    start_time?: null | Date;
    end_time?: null | Date;
  }>({ start_date: null, end_date: null, start_time: null, end_time: null });


  const fetchCourseEvents = async () => {
    try {
      const response = await getEvents(`/calendar/courses`, {
        params: {
          start_date: filterValue.start_date,
          end_date: filterValue.end_date,
          view: true,
          ...(filterOption ? { course_mode: filterOption } : ''),
        },
      });
      const courseEvents = response?.data?.data ?? [];
      const eventData = courseEvents?.map(
        (data: {
          start_date: string;
          end_date: string;
          user: { full_name: string };
        }) => {
          const startTime = data?.start_date ? parseISO(data?.start_date) : null;
          const endTime = data?.end_date ? parseISO(data?.end_date) : null;
          return {
            ...data,
            start: startTime,
            end: endTime,
            currentTab,
          };
        }
      );
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching course events:', error);
    }
  };

  const fetchAssessmentEvents = async () => {
    try {
      const { data, error } = await getAssessmentData('/live-assessment', {
        params: {
          start_date: filterValue.start_date,
          end_date: filterValue.end_date,
          view: true,
        },
      });
      if (data && !error) {
        const assessmentEvents = data.data.map((assessment: LiveAssessment) => {
          return {
            ...assessment,
            start: assessment.start_time ? parseISO(assessment.start_time) : null,
            end: assessment.end_time ? parseISO(assessment.end_time) : null,

            start_date: assessment.start_time,
            end_date: assessment.end_time,
            currentTab,
          };
        });

        setEvents(assessmentEvents);
      }
    } catch (error) {
      console.error('Error fetching live assessment events:', error);
    }
  };

  const fetchEvents = async () => {
    const AllEvents = await getEvents(`/calendar/teachers`, {
      params: {
        startDate: filterValue.start_date,
        endDate: filterValue.end_date,
        view: true,
        ...(filterTeacher.start_date && filterTeacher.end_date
          ? {
            start_time:
              filterTeacher.start_time &&
              mergeDateAndTime(filterTeacher.start_date, filterTeacher.start_time),
            end_time:
              filterTeacher.end_time &&
              mergeDateAndTime(filterTeacher.end_date, filterTeacher.end_time),
          }
          : ''),
      },
    });

    const events = AllEvents.data ?? [];

    const eventData = events.map(
      (data: {
        start_time: string;
        end_time: string;
        user: { full_name: string };
      }) => {
        const startTime = data?.start_time ? parseISO(data?.start_time) : null;
        const endTime = data?.end_time ? parseISO(data?.end_time) : null;

        return {
          ...data,
          start: startTime,
          end: endTime,
          start_time_only: startTime ? format(startTime, 'yyyy-MM-dd') : null,
          end_time_only: endTime ? format(endTime, 'yyyy-MM-dd') : null,
          currentTab,
        };
      }
    );
    const uniqueTeachers = _.uniqBy(
      eventData,
      (event: {
        start_time_only: string;
        end_time_only: string;
        user: { full_name?: string };
      }) =>
        `${event.start_time_only}-${event.end_time_only}-${event.user?.full_name}`
    );

    setEvents(uniqueTeachers);
  };

  useEffect(() => {
    setEvents([]);
    if (activeTab === 'Manage Teachers' && _.isEmpty(filterOption)) {
      fetchEvents();
    } else if (activeTab === TabValueProps.Live_Assessments) {
      fetchAssessmentEvents();
    }
  }, [filterValue, filterOption, filterTeacher]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setCalendarView('month');
    setFilterValue({
      start_date: format(visibleRangeStart, 'yyyy-MM-dd'),
      end_date: format(visibleRangeEnd, 'yyyy-MM-dd'),
    });
  }, [activeTab]);

  return (
    <div className="admin-calendar">
      <PageHeader parentClass="px-0" title='Calendar' />
      <TabComponent
        className="calendar-tab-wrap"
        current={activeTab}
        onTabChange={(status: string) => {
          setActiveTab(status);
          searchParams.set('calendar', status);
          setSearchParams(searchParams);
        }}
        sideComponent={
          <div>
            <div
              className={`flex gap-2 items-center 'hidden pointer-events-none'}`}
            >
              {!_.isEmpty(filterOption) && (
                <Button
                  onClickHandler={() => {
                    setFilterOption('');
                  }}
                  className="text-PrimaryRed font-medium capitalize underline underline-offset-2 text-sm !h-fit"
                >
                  CLear Filter
                </Button>
              )}
              <FilterComponent
                setFilterOption={setFilterOption}
                filterOption={filterOption}
              />
            </div>
            <div
              className={`flex gap-2 items-center ${activeTab === 'Manage Teachers' ? '' : 'hidden pointer-events-none'}`}
            >
              {filterTeacher.start_date && filterTeacher.end_date && (
                <Button
                  onClickHandler={() => {
                    setFilterTeacher({
                      start_date: null,
                      end_date: null,
                      start_time: null,
                      end_time: null,
                    });
                  }}
                  className="text-PrimaryRed font-medium capitalize underline underline-offset-2 text-sm !h-fit"
                >
                  Clear Filter
                </Button>
              )}
              <FilterForTeacher
                setFilterTeacher={setFilterTeacher}
                filterTeacher={filterTeacher}
              />
            </div>

            <div
              className={`flex gap-2 items-center ${activeTab === TabValueProps.Live_Assessments
                ? ''
                : 'hidden pointer-events-none'
                }`}
            >
              <div
                className="relative group flex items-center justify-center cursor-pointer mt-2"
              >
                <Image
                  iconName='calendar'
                />

                <ToolTip
                  text='Calendar View'
                  position="top"
                />
              </div>
            </div>
          </div>
        }
      >
        <TabComponent.Tab
          title='LiveAssessment'
          uniqueKey='LiveAssessment'
        />
      </TabComponent>

      {isLoading || isLoadingLiveAssessment ? (
        <div className="lazy-wrapper">
          <div className="p-5 bg-white">
            <div className="flex justify-between mb-5">
              <div className="lazy !w-24 h-10 !rounded-full overflow-hidden" />
              <div className="flex items-center w-fit gap-5">
                <div className="lazy !w-6 aspect-square rounded-full overflow-hidden" />
                <div className="lazy !w-[170px] h-5" />
                <div className="lazy !w-6 aspect-square rounded-full overflow-hidden" />
              </div>
              <div className="lazy !w-[250px] h-10 !rounded-full overflow-hidden" />
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              <div className="lazy !w-full h-10" />
              <div className="lazy !w-full h-10" />
              <div className="lazy !w-full h-10" />
              <div className="lazy !w-full h-10" />
              <div className="lazy !w-full h-10" />
              <div className="lazy !w-full h-10" />
              <div className="lazy !w-full h-10" />
            </div>
            <div className="grid grid-cols-7 gap-1">
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />

              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />

              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />

              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />

              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
              <div className="lazy !w-full aspect-[2/1.2]" />
            </div>
          </div>
        </div>
      ) : (
        <ReactCalendar
          setFilterRange={setFilterValue}
          filterValue={filterValue}
          events={events as unknown as CalendarEvent[]}
          currentTab={currentTab}
          onViewChange={setCalendarView}
          calendarView={calendarView}
          setCurrentDate={setCurrentDate}
          currentDate={currentDate1}
          filterOption={filterOption}
          onRefreshCalendar={() => {
            if (activeTab === 'Courses') {
              fetchCourseEvents();
            } else if (activeTab === 'Live Assessments') {
              fetchAssessmentEvents();
            } else {
              fetchEvents();
            }
          }}
        />
      )}

      <div />
    </div>
  );
};

export default Calendar;
