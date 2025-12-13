import { Dispatch, SetStateAction } from 'react';

export enum CourseTypeEnum {
  IN_PERSON_CLASS = 'In-Person Class',
  ZOOM_CLASS = 'Zoom Class',
  APPOINTMENTS = 'Appointments',
}

export interface FilterComponent {
  setFilterTeacher: Dispatch<
    SetStateAction<{
      start_date?: null | Date;
      end_date?: null | Date;
      start_time?: null | Date;
      end_time?: null | Date;
    }>
  >;
  filterTeacher: {
    start_date?: null | Date;
    end_date?: null | Date;
    start_time?: null | Date;
    end_time?: null | Date;
  };
}
