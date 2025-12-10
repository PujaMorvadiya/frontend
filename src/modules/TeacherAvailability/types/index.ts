import { AvailabilitiesTypeEnum } from 'constant/common.constant';
import { User } from 'modules/ManageUsers/types';
import { Dispatch, SetStateAction } from 'react';

export interface TeacherCalendarProps {
  setFilterRange: Dispatch<
    SetStateAction<{ start_date?: string | Date; end_date?: string | Date }>
  >;
  events?: any;
  loadingAllAvailabilities?: boolean;
  onViewChange: Dispatch<SetStateAction<string>>;
  calendarView?: string;
  fetchEvents: () => void;
  currentTab?: string;
}

export interface AllSlotsProps {
  date: string | undefined;
  start_time: string;
  end_time: string;
  id: string;
  timezone: string;
  availability_type: string;
  conflict?: {
    start_time: string;
    end_time: string;
    availability_type: string;
  }[];
}

export interface CustomToolbarProps {
  label: string;
  onView: (view: string) => void;
  views: string[];
  onNavigate: (action: 'TODAY' | 'PREV' | 'NEXT') => void;
  view: string;
}

export interface EditAvailabilityProps {
  startDate: string;
  endDate: string;
  time_ranges: [
    {
      start_time: string;
      end_time: string;
      timezone: string;
      availability_type: AvailabilitiesTypeEnum;
    },
  ];
  week_days: [];
}

export interface validationProps {
  start_time: Date;
  end_time: Date;
}

export interface ErrorType {
  time_ranges: {
    start_time: string;
    end_time: string;
  }[];
  week_days: number[];
}

export interface TimeRange {
  start_time: string;
  end_time: string;
  timezone: string;
  availability_type: string;
}

export enum CalendarTabValueProps {
  Live_Assessments = 'Live Assessments',
}

export interface LiveAssessment {
  id: string;
  results: {
    AslLevel: {
      level: string;
      id: string;
    };
  }[];
  date: string;
  start_time?: string;
  provider_meeting_link?: string;
  end_time?: string;
  student?: User;
  is_attended: boolean;
  note?: string;
  is_edit?: boolean;
  result_given: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}
