import React from 'react';
import { CalendarEvent, TabValueProps } from '../types';
import CourseCustomEvent from './CourseCustomEvent';
import LiveAssessmentCustomEvent from './LiveAssessmentCustomEvent';

interface CoursePopoverProps {
  // courseData: any;
  event: CalendarEvent;
  isLoading?: boolean;
  onRefreshCalendar?: () => void;
  currentTab?: string;
}

const CoursesPopover: React.FC<CoursePopoverProps> = ({
  event,
  // courseData,
  isLoading,
  currentTab,
  onRefreshCalendar,
}) => {
  const isLiveAssessment = currentTab === TabValueProps.Live_Assessments;

  if (isLoading) {
    return (
      <>
        {isLiveAssessment ? (
          <div className="flex flex-col gap-4 min-w-[320px]">
            <div className="">
              <div className="flex flex-col gap-5">
                <div className="lazy !w-56 h-4" />
                <div className="lazy h-6" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="lazy h-4" />
                  <div className="lazy h-4" />
                </div>
                <div className="lazy h-6" />
              </div>
            </div>
            <div className="lazy h-8" />
          </div>
        ) : (
          <div className="flex flex-col gap-4 min-w-[320px] p-2">
            <div className="flex flex-col gap-5">
              <div className="lazy !w-56 h-4" />
              <div className="lazy h-6" />
              <div className="grid grid-cols-2 gap-4">
                <div className="lazy h-4" />
                <div className="lazy h-4" />
              </div>
              <div className="lazy h-6" />
            </div>
            <div className="lazy h-8" />
          </div>
        )}
      </>
    );
  }
  return isLiveAssessment ? (
    <LiveAssessmentCustomEvent
      event={event}
      currentView="day"
      onRefreshCalendar={onRefreshCalendar}
    />
  ) : (
    <CourseCustomEvent
      event={event}
      currentView="day"
      onRefreshCalendar={onRefreshCalendar}
    />
  );
};

export default CoursesPopover;
