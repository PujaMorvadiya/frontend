import Button from 'components/Button/Button';
import Image from 'components/Image';
import StatusLabel, { statusVariants } from 'components/StatusLabel';
import { CourseTypeEnum } from 'constants/common.constant';
import { CalendarFilterType } from 'modules/Calendar';
import React, { Dispatch, SetStateAction } from 'react';
import { NavigateAction, ToolbarProps, View } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import { CalendarEvent } from '../types';

interface CustomToolbarProps extends ToolbarProps<CalendarEvent, object> {
  label: string;
  onNavigate: (navigate: NavigateAction, date?: Date) => void;
  views: View[];
  view: View;
  onView: (view: View) => void;
  currentTab?: string;
  filterOption: CalendarFilterType;
  setFilterOption: Dispatch<SetStateAction<CalendarFilterType>>;
}
export const CustomToolbar: React.FC<CustomToolbarProps> = ({
  label,
  onNavigate,
  views,
  view,
  onView,
  currentTab,
  filterOption,
  setFilterOption,
}: CustomToolbarProps) => {
  const { t } = useTranslation();

  // Define custom titles for views
  const customViewTitles = [
    t('Calendar.dayTitle'),
    t('Calendar.weekTitle'),
    t('Calendar.monthTitle'),
  ];

  // Slice the views array if needed
  const newViews = views.slice(0, -1).reverse(); // Remove last view (if necessary)

  const handleCourseTypeButtonClick = (
    courseType: CourseTypeEnum,
    courseSubType?: 'In-Person' | 'Zoom'
  ) => {
    const filteredCourseTypes = filterOption?.course_type
      ? filterOption.course_type
      : [];
    const exists = filteredCourseTypes.find(
      (data) =>
        data.type === courseType &&
        (courseSubType ? data.sub_type === courseSubType : true)
    );

    if (exists) {
      const updatedCourseTypes = filteredCourseTypes.filter(
        (data) =>
          !(
            data.type === courseType &&
            (courseSubType ? data.sub_type === courseSubType : true)
          )
      );
      setFilterOption({
        ...filterOption,
        course_type: updatedCourseTypes,
      });
    } else {
      setFilterOption({
        ...filterOption,
        course_type: [
          ...filteredCourseTypes,
          { type: courseType, sub_type: courseSubType },
        ],
      });
    }
  };

  const handelTeacherAvailabilityButtonClick = (
    type?: 'Course' | 'Live Assessment'
  ) => {
    if (!type) {
      setFilterOption({
        ...filterOption,
        teacher_availability_type: undefined,
      });
    }

    if (filterOption?.teacher_availability_type === type) {
      return;
    }
    setFilterOption({
      ...filterOption,
      teacher_availability_type: type,
    });
  };

  return (
    <div className="rbc-toolbar">
      <div className="flex flex-wrap justify-between w-full text-base items-center gap-2">
        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-2">
          <div className="rbc-btn-group view-group flex items-center view-switch-btn-wrap">
            {newViews.map((viewData, index) => (
              <Button
                key={viewData}
                className={`rbc-btn ${view === viewData ? 'rbc-active' : ''}`}
                onClickHandler={() => onView(viewData)} // Pass the correct View type
              >
                {customViewTitles[index]}
              </Button>
            ))}
          </div>
        </div>

        {/* Label */}
        <div className="rbc-current-content">
          <Button className="prev" onClickHandler={() => onNavigate('PREV')}>
            <Image iconName="chevronLeft" iconClassName="w-8 h-8 stroke-2" />
          </Button>
          <span className="rbc-toolbar-label ">{label}</span>
          <Button className="next" onClickHandler={() => onNavigate('NEXT')}>
            <Image iconName="chevronRight" iconClassName="w-8 h-8 stroke-2" />
          </Button>
        </div>

        {/* View Buttons */}
        <div className="rbc-today-button">
          <Button
            variants="PrimaryWoodBorder"
            className="today"
            onClickHandler={() => onNavigate('TODAY')}
          >
            {t('Calendar.todayTitle')}
          </Button>
        </div>
      </div>

      {/* courses */}
      {currentTab === 'Courses' && (
        <div className="flex justify-end w-full gap-2">
          <span
            onClick={() => handleCourseTypeButtonClick(CourseTypeEnum.ZOOM_CLASS)}
          >
            <StatusLabel
              text="zoom class"
              variants={
                filterOption?.course_type?.find(
                  (data) => data.type === CourseTypeEnum.ZOOM_CLASS
                )
                  ? statusVariants.eventBlue
                  : statusVariants.eventBlueTint
              }
              isBullet
              className="!rounded-full !text-base !cursor-pointer"
            />
          </span>
          <span
            onClick={() =>
              handleCourseTypeButtonClick(CourseTypeEnum.IN_PERSON_CLASS)
            }
          >
            <StatusLabel
              text="in-person class"
              variants={
                filterOption?.course_type?.find(
                  (data) => data.type === CourseTypeEnum.IN_PERSON_CLASS
                )
                  ? statusVariants.eventOrange
                  : statusVariants.eventOrangeTint
              }
              isBullet
              className="!rounded-full !text-base !cursor-pointer"
            />
          </span>
          <span
            onClick={() =>
              handleCourseTypeButtonClick(CourseTypeEnum.APPOINTMENTS, 'Zoom')
            }
          >
            <StatusLabel
              text="Appointment (zoom class)"
              variants={
                filterOption?.course_type?.find(
                  (data) =>
                    data.type === CourseTypeEnum.APPOINTMENTS &&
                    data.sub_type === 'Zoom'
                )
                  ? statusVariants.eventLightGreen
                  : statusVariants.eventLightGreenTint
              }
              isBullet
              className="!rounded-full !text-base !cursor-pointer"
            />
          </span>
          <span
            onClick={() =>
              handleCourseTypeButtonClick(CourseTypeEnum.APPOINTMENTS, 'In-Person')
            }
          >
            <StatusLabel
              text="Appointment (in-person class)"
              variants={
                filterOption?.course_type?.find(
                  (data) =>
                    data.type === CourseTypeEnum.APPOINTMENTS &&
                    data.sub_type === 'In-Person'
                )
                  ? statusVariants.eventDarkGreen
                  : statusVariants.eventDarkGreenTint
              }
              isBullet
              className="!rounded-full !text-base !cursor-pointer"
            />
          </span>

          {filterOption?.course_type && filterOption.course_type.length > 0 && (
            <Button
              variants="RedOpacity"
              className="!text-base !rounded-full !border-0"
              onClickHandler={() =>
                setFilterOption({
                  ...filterOption,
                  course_type: undefined,
                })
              }
            >
              {t('Button.ClearAll')}
            </Button>
          )}
        </div>
      )}

      {/* teacher availability */}
      {currentTab === 'Manage Teachers' && (
        <div className="flex justify-end w-full gap-2">
          <span onClick={() => handelTeacherAvailabilityButtonClick('Course')}>
            <StatusLabel
              text="Courses"
              variants={
                filterOption?.teacher_availability_type === 'Course'
                  ? statusVariants.darkGreen
                  : statusVariants.green
              }
              isBullet
              className="!rounded-full !text-base !cursor-pointer"
            />
          </span>
          <span
            onClick={() => handelTeacherAvailabilityButtonClick('Live Assessment')}
          >
            <StatusLabel
              text="Live Assessments"
              variants={
                filterOption?.teacher_availability_type === 'Live Assessment'
                  ? statusVariants.darkBlue
                  : statusVariants.blue
              }
              isBullet
              className="!rounded-full !text-base !cursor-pointer"
            />
          </span>
          {filterOption.teacher_availability_type && (
            <Button
              variants="RedOpacity"
              className="!text-base !rounded-full !border-0"
              onClickHandler={() => handelTeacherAvailabilityButtonClick()}
            >
              {t('Button.ClearAll')}
            </Button>
          )}
        </div>
      )}
      {currentTab === 'Live Assessments' && (
        <div className="flex justify-end w-full gap-2">
          <StatusLabel
            text="Live Assessments"
            variants={statusVariants.eventPurpleTint}
            isBullet
            className="!rounded-full"
          />
        </div>
      )}
    </div>
  );
};
