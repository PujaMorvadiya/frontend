import CourseCustomEvent from 'components/ReactCalendar/Components/CourseCustomEvent';
import LiveAssessmentCustomEvent from 'components/ReactCalendar/Components/LiveAssessmentCustomEvent';
import { CalendarEvent } from 'components/ReactCalendar/types';
import { View } from 'react-big-calendar';
import { CalendarTabValueProps } from '../types';

interface CoursePopoverProps {
  events: CalendarEvent[];
  isLoading?: boolean;
  currentTab?: string;
  currentView?: View;
}

const CustomEvent: React.FC<CoursePopoverProps> = ({
  events,
  isLoading,
  currentTab,
  currentView,
}) => {
  const isLiveAssessment =
    currentTab === CalendarTabValueProps.Live_Assessments;
  if (isLoading) {
    return (
      <>
        {isLiveAssessment ? (
          currentView !== 'month' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-5">
                <div className="lazy !w-56 h-4" />
                <div className="lazy h-6" />
                <div className="lazy h-4" />
                <div className="lazy h-4" />
                <div className="lazy h-6" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-5">
                <div className="lazy !w-56 h-4" />
                <div className="lazy h-6" />
                <div className="lazy h-4" />
                <div className="lazy h-4" />
                <div className="lazy h-6" />
              </div>

              <div className="flex flex-col gap-5">
                <div className="lazy !w-56 h-4" />
                <div className="lazy h-6" />
                <div className="lazy h-4" />
                <div className="lazy h-4" />
                <div className="lazy h-6" />
              </div>
            </div>
          )
        ) : currentView !== 'month' ? (
          <div className="grid grid-cols-2 gap-4 p-2">
            <div className="flex flex-col gap-5">
              <div className="lazy !w-56 h-4" />
              <div className="lazy h-6" />
              <div className="lazy h-4" />
              <div className="lazy h-4" />
              <div className="lazy h-6" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-2">
            <div className="flex flex-col gap-5">
              <div className="lazy !w-56 h-4" />
              <div className="lazy h-6" />
              <div className="lazy h-4" />
              <div className="lazy h-4" />
              <div className="lazy h-6" />
            </div>

            <div className="flex flex-col gap-5">
              <div className="lazy !w-56 h-4" />
              <div className="lazy h-6" />
              <div className="lazy h-4" />
              <div className="lazy h-4" />
              <div className="lazy h-6" />
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {events?.map((event, index) =>
          isLiveAssessment ? (
            <LiveAssessmentCustomEvent
              key={index}
              event={event}
              currentView="day"
              isTeacherSide
            />
          ) : (
            <CourseCustomEvent
              eventClass="min-w-full"
              key={index}
              event={event}
              currentView="day"
              isTeacherSide
            />
          )
        )}
      </div>
    </>
  );
};

export default CustomEvent;
