import Button from 'components/Button/Button';
import TabComponent from 'components/Tabs';
import {
  addDays,
  endOfDay,
  endOfMonth,
  parseISO,
  startOfDay,
  startOfMonth,
  subDays,
} from 'date-fns';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import 'modules/Availability/styles/index.css';
import { useEffect, useRef, useState } from 'react';
import Calendar from './Calendar';
import { EditAvailability } from './Components/EditAvailability';
import { formatDate } from 'utils';
import { CalendarTabValueProps, LiveAssessment } from './types';

const Availability = () => {
  const modal = useModal();
  const currentTab = 'Manage Availability';
  const [activeTab, setActiveTab] = useState(currentTab ?? 'Manage Availability');
  const params = new URLSearchParams(window.location.search).get('open');
  const [getEvents, { isLoading: loadingAllAvailabilities }] = useAxiosGet();
  const [events, setEvents] = useState([] as { start: string; end: string }[]);
  const currentDate = new Date();
  const currentMonthStart = startOfMonth(currentDate);
  const currentMonthEnd = endOfMonth(currentDate);
  const visibleRangeStart = subDays(currentMonthStart, 6);
  const visibleRangeEnd = addDays(currentMonthEnd, 6);
  const [filterRange, setFilterRange] = useState<{
    start_date?: string | Date;
    end_date?: string | Date;
  }>({
    start_date: visibleRangeStart.toISOString(),
    end_date: visibleRangeEnd.toISOString(),
  });
  const isFirstRender = useRef(true);
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setCalendarView('month');
    setFilterRange({
      start_date: visibleRangeStart.toISOString(),
      end_date: visibleRangeEnd.toISOString(),
    });
  }, [activeTab]);
  const [calendarView, setCalendarView] = useState('month');
  const fetchEvents = async () => {
    const AllEvents = await getEvents(`/availabilities`, {
      params: {
        startDate: filterRange.start_date,
        endDate: filterRange.end_date,
        allAvailabilities: true,
        view: true,
      },
    });
    const eventData = AllEvents.data?.data?.map(
      (data: { start_time: string; end_time: string; date: string }) => {
        return {
          start: data?.start_time ? parseISO(data?.start_time) : null,
          end: data?.end_time ? parseISO(data?.end_time) : null,
          ...data,
        };
      }
    );
    setEvents(eventData);
  };

  const fetchAssessmentEvents = async () => {
    try {
      const { data, error } = await getEvents('/live-assessment', {
        params: {
          start_date: formatDate(filterRange.start_date),
          end_date: formatDate(filterRange.end_date),
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

  useEffect(() => {
    setEvents([]);
    if (filterRange.start_date && filterRange.end_date) {
      if (activeTab === CalendarTabValueProps.Live_Assessments) {
        fetchAssessmentEvents();
      } else {
        fetchEvents();
      }
    }
    if (params) {
      modal.openModal();
    }
  }, [filterRange, params]);

  return (
    <>
      <div className="teacher-availability w-full pl-5">
        <div className="teacher-availability-btn-card min-h-[50px] w-full bg-LightGray flex justify-center flex-col items-center">
          <Button
            className="bg-PrimaryWood text-white p-3"
            onClickHandler={() => modal.openModal()}
          >
            Add Availability
          </Button>

        </div>
        <div className="calendar-main-wrap mt-3 [&_.rbc-time-content]:h-[550px] [&_.rbc-time-content]:overflow-y-auto [&_.rbc-time-content]:flex-none">
          <TabComponent
            className="calendar-tab-wrap"
            current={activeTab}
            onTabChange={(status: string) => {
              setActiveTab(status);
            }}
          >
            <TabComponent.Tab
              title='Manage Availability'
              uniqueKey='Manage Availability'
            />
            <TabComponent.Tab
              title='Live Assessments'
              uniqueKey='Live Assessments'
            />
          </TabComponent>
          <div className="relative w-full">
            <div
              className={
                loadingAllAvailabilities ? 'opacity-0 pointer-events-none' : ''
              }
            >
              <Calendar
                currentTab={activeTab as CalendarTabValueProps}
                setFilterRange={setFilterRange}
                events={events}
                onViewChange={setCalendarView}
                calendarView={calendarView}
                loadingAllAvailabilities={loadingAllAvailabilities}
                fetchEvents={fetchEvents}
              />
            </div>

            {loadingAllAvailabilities && (
              <div className="absolute inset-0 z-10">
                <div className="lazy-wrapper">
                  <div className="p-5 bg-white">
                    <div className="flex justify-between mb-5">
                      <div className="lazy !w-[250px] h-10 !rounded-full overflow-hidden" />
                      <div className="flex items-center w-fit gap-5">
                        <div className="lazy !w-6 aspect-square rounded-full overflow-hidden" />
                        <div className="lazy !w-[170px] h-5" />
                        <div className="lazy !w-6 aspect-square rounded-full overflow-hidden" />
                      </div>
                      <div className="lazy !w-24 h-10 !rounded-full overflow-hidden" />
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
              </div>
            )}
          </div>
        </div>
      </div>
      {modal?.isOpen && <EditAvailability modal={modal} fetchEvents={fetchEvents} />}
    </>
  );
};

export default Availability;
