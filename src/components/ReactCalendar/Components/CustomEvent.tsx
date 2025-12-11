import React from 'react';
import { CustomEventProps, TabValueProps } from '../types';
import LiveAssessmentCustomEvent from './LiveAssessmentCustomEvent';
import ManageTeacherComponent from './ManageComponent';

export const CustomEvent: React.FC<CustomEventProps> = ({
  event,
  currentView,
  onRefreshCalendar,
}: CustomEventProps) => {
  return (
    <>
      {event?.currentTab === TabValueProps.Teachers ? (
        <ManageTeacherComponent
          event={event}
          currentView={currentView}
          onRefreshCalendar={onRefreshCalendar}
        />
      ) : event?.currentTab === TabValueProps.Live_Assessments ? (
        <LiveAssessmentCustomEvent
          event={event}
          currentView={currentView}
          onRefreshCalendar={onRefreshCalendar}
        />
      ) : (
        null
      )}
    </>
  );
};
