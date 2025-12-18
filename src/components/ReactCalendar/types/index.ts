import { ModalProps } from 'modules/Availability/types';
import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-big-calendar';


export interface CalendarFilterType {
  start_date?: string | Date;
  end_date?: string | Date;
}

export interface EventProps {
  id: number;
  title?: string;
  start_date?: string;
  end_date?: string;
  start: Date;
  end: Date;
  slug: string;
}

export interface CalendarProps {
  modal: ModalProps;
  events: EventProps[];
  children?: React.ReactNode;
  setEventSlug: Dispatch<SetStateAction<EventProps | undefined>>;
  filterModal: ModalProps;
  EventCreateModal: ModalProps;
  setCurrentCalendarView?: Dispatch<SetStateAction<string>>;
  setCurrentMonthView?: Dispatch<SetStateAction<string>>;
  setFilterValue?: Dispatch<
    SetStateAction<{
      start_date?: Date | string;
      end_date?: Date | string;
    }>
  >;
  setInitialValues?: React.Dispatch<
    SetStateAction<{
      trainer_id: string[];
    }>
  >;
  initialValues: { trainer_id: string[] };
  loading?: boolean;
  eventsLoading?: boolean;
  trainerColors: {
    [key: string]: string;
  };
  setTrainerColors: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
}

export interface CustomToolbarProps {
  label: string;
  onView: (view: string) => void;
  views: string[];
  onNavigate: (action: 'TODAY' | 'PREV' | 'NEXT') => void;
  view: string;
}

export interface TabProps {
  id: string;
  title: string;
  name: string;
  slug: string;
}
export interface PositionState {
  display?: 'none' | 'block'; // Assuming display can only be 'none' or 'block'
  visibility?: string;
  height: number;
  width: number;
  top: string | number;
  left: string | number;
  maxHeight?: string | number;
}
interface User {
  full_name: string;
  first_name: string;
  last_name: string;
  user_color?: string;
  profile_image: string;
}

export interface CalendarEvent {
  start: Date;
  end: Date;
  date: string;
  start_time: string;
  end_time: string;
  user_id: string;
  id: string;
  user: User;
  teacher_name?: string;
  data?: {
    id: string;
    start_time: string;
    end_time: string;
    user: User;
  }[];
  course?: {
    id: string;
    title: string;
    type?: { type?: string };
    course_visibility?: {
      user: {
        full_name?: string;
        profile_image?: string;
        user_role: {
          role: {
            role: string;
          };
        };
      };
    }[];
    private_mode?: string;
    zoom_link?: string;
    courseEnrolledCount?: Number;
    max_participants?: Number;
    course_user?: {
      organization?: {
        userDetails?: { full_name?: string; profile_image?: string };
      };
    }[];
    cover_image?: string;
    assign_teachers?: {
      full_name?: string;
      profile_image?: string;
    };
    start_date: string;
    end_date: string;
  };
  start_date?: string;
  end_date?: string;
  currentView?: View;
  currentTab?: string;
  cover_image?: string;
  availability_type?: string;
  teacher?: {
    full_name?: string;
    profile_image?: string;
  };
  student?: {
    full_name?: string;
    profile_image?: string;
    id?: string;
  };
  provider_meeting_link?: string;
}

export interface GroupedEvents {
  [userId: string]: CalendarEvent[]; // Array of CalendarEvent objects for each user
}

export interface CustomEventProps {
  event: CalendarEvent;
  currentView?: View;
  eventClass?: string;
  isTeacherSide?: boolean;
  onRefreshCalendar?: () => void;
}

export interface ReactCalendarProps {
  setFilterRange?: Dispatch<SetStateAction<CalendarFilterType>>;
  events: CalendarEvent[];
  currentTab?: string;
  onViewChange: Dispatch<SetStateAction<View>>;
  calendarView?: View;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  currentDate?: Date;
  filterOption?: string;
  filterTeacher?: { start_date: ''; end_date: ''; start_time: ''; end_time: '' };
  onRefreshCalendar?: () => void;
  filterValue?: CalendarFilterType;
}

export interface availabilitySlots {
  start_time?: string;
  end_time?: string;
  user: {
    full_name?: string;
  };
}

export interface TimeSlotsProps {
  start_time: string;
  end_time: string;
  availability_type?: string;
  id: string;
  timezone: string;
  conflict?: {
    start_time: string;
    end_time: string;
    availability_type?: string;
    id: string;
  }[];
  onRefreshCalendar?: () => void;
}

export interface CourseDetailsProps {
  id: string;
  course: {
    start_time?: string;
    end_time?: string;
    type?: { type?: string };
    private_mode?: string;
    cover_image?: string;
    title?: string;
    courseEnrolledCount?: number;
    zoom_link?: string;
    max_participants?: number;
    course_user?: {
      organization?: {
        userDetails?: { full_name?: string; profile_image?: string };
      };
    }[];
    assign_teachers?: { full_name?: string; profile_image?: string };
  };
}

export enum TabValueProps {
  Courses = 'Courses',
  Live_Assessments = 'Live Assessments',
  Teachers = 'Manage Teachers',
}

export interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  cover_image?: string;
}

export interface Event {
  user: {
    profile_image?: string;
    full_name?: string;
  };
  start: Date;
}

export interface SlotsPopoverProps {
  event: Event;
  timeSlots?: TimeSlotsProps[];
  isLoading?: boolean;
  onRefreshCalendar?: () => void;
}

export interface AssessmentData {
  id: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  teacher: { id: string };
  student: object;
}