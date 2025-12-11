import Button from 'components/Button/Button';
import Image from 'components/Image';
import StatusLabel, { statusVariants } from 'components/StatusLabel';
import UserProfile from 'components/UserProfile';
import { VITE_DATE_FORMAT } from 'config';
import { format, parseISO } from 'date-fns';
import { useModal } from 'hooks/useModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AssessmentData, CustomEventProps } from '../types';
import { Roles } from 'constant/common.constant';

const LiveAssessmentCustomEvent = ({
  event,
  currentView,
  onRefreshCalendar,
  eventClass,
  isTeacherSide,
}: CustomEventProps) => {
  const [selectedAssessment, setSelectedAssessment] =
    useState<AssessmentData | null>(null);

  const changeTeacher = useModal();

  return (
    <>
      {currentView === 'month' ? (
        <div className="p-2 h-full border rounded-md  flex flex-col gap-1 border-PrimaryWood/20 bg-LightGray !text-black/70 max-w-[130px] min-[1500px]:max-w-full">
          <div className="flex justify-between flex-wrap gap-1">
            <StatusLabel
              text={event.currentTab}
              className="!px-2 !py-1 !text-xs !text-white"
              variants={statusVariants.eventPurple}
            />

            <div className="flex gap-1 ms-auto">
              {event.teacher && (
                <Image
                  key={event.teacher?.profile_image}
                  imgClassName="!w-7 !h-7 rounded-full object-cover -me-4 relative z-2 shadow-md"
                  src={event.teacher?.profile_image}
                  isFromDataBase={!!event.teacher?.profile_image}
                  serverPath={!!event.teacher?.profile_image}
                  firstName={event.teacher?.full_name}
                />
              )}
              {event.student && (
                <Image
                  key={event.student?.profile_image}
                  imgClassName="!w-7 !h-7 rounded-full object-cover !bg-PrimaryWood/80"
                  src={event.student?.profile_image}
                  isFromDataBase={!!event.student?.profile_image}
                  serverPath={!!event.student?.profile_image}
                  firstName={event.student?.full_name}
                />
              )}
            </div>
          </div>
          <p className="flex items-center text-PrimaryWood mt-2 font-medium text-xs min-[1500px]:gap-1">
            <Image iconName="clock" iconClassName="min-[1500px]:w-[16px] w-[12px]" />
            <span className="!text-xs min-[1500px]:!text-sm">
              {event.start_time && format(parseISO(event.start_time), 'hh:mm a')}
              &nbsp;-&nbsp;
              {event.end_time && format(parseISO(event.end_time), 'hh:mm a')}{' '}
            </span>
          </p>
        </div>
      ) : (
        <div
          className={`p-2 h-full border rounded-md flex flex-col gap-2  border-PrimaryWood/20 bg-LightGray !text-black/70 !min-w-[360px] ${currentView === 'week' ? '!max-w-[360px]' : '!max-w-[500px]'} ${eventClass}`}
        >
          <div className="w-full flex justify-start gap-2">
            <StatusLabel
              text={event.currentTab}
              className="!px-2 !py-1 !text-xs !text-white"
              variants={statusVariants.eventPurple}
            />
            {event?.provider_meeting_link && (
              <Link
                to={event?.provider_meeting_link}
                className="!py-1 !px-2 button LightBlue flex gap-1 group/btn"
              >
                <Image
                  iconName="zoomButtonIcon"
                  iconClassName="!w-4 !h-4 !text-PrimaryBlue group-hover/btn:!text-white"
                />
              </Link>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <p className="flex items-center gap-2 text-PrimaryWood mt-2 font-medium text-sm">
              <Image iconClassName="w-[18px]" iconName="calendar" />
              {event?.start_time &&
                format(parseISO(event?.start_time), VITE_DATE_FORMAT as string)}
            </p>
            <p className="flex items-center gap-2 text-PrimaryWood mt-2 font-medium text-sm">
              <Image iconName="clock" iconClassName="w-[18px]" />
              <span className="!text-sm">
                {event.start_time && format(parseISO(event.start_time), 'hh:mm a')}
                &nbsp;-&nbsp;{' '}
                {event.end_time && format(parseISO(event.end_time), 'hh:mm a')}{' '}
              </span>
            </p>
          </div>
          {!isTeacherSide && (
            <div className="flex justify-between mt-1 px-2 rounded-full w-full bg-LightGray border-PrimaryWood/20 border">
              <UserProfile
                user={{
                  ...event,
                  first_name: event?.teacher?.full_name?.split(' ')[0] ?? '-',
                  last_name: event?.teacher?.full_name?.split(' ')[1] ?? '-',
                }}
                imageClass="!w-7 !h-7"
                textClass="text-sm.3"
                isTooltip={false}
              />
              <div className="flex gap-0 items-center">
                <Button
                  tooltipText="Edit Teacher"
                  tooltipPosition="left"
                  className="p-3"
                  onClickHandler={() => {
                    setSelectedAssessment(event as unknown as AssessmentData);
                    changeTeacher.openModal();
                  }}
                >
                  <Image
                    iconName="editpen2"
                    iconClassName="size-4 !fill-white z-10 opacity-70 hover:opacity-100"
                  />
                </Button>
                <StatusLabel
                  text={Roles.User}
                  variants={statusVariants.LightWood}
                  className="rounded-full h-fit"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-1 p-2 rounded-full w-full bg-LightGray border-PrimaryWood/20 border">
            <UserProfile
              user={{
                ...event,
                first_name: event?.student?.full_name?.split(' ')[0] ?? '-',
                last_name: event?.student?.full_name?.split(' ')[1] ?? '-',
              }}
              imageClass="!w-7 !h-7"
              textClass="text-sm.3"
              isTooltip={false}
              isTeacherSide={isTeacherSide}
            />
            <StatusLabel
              text={Roles.User}
              variants={statusVariants.LightWood}
              className="rounded-full"
            />
          </div>
        </div>
      )}
      {/* {(selectedAssessment as any)?.student_id && (
        <ChangeTeacher
          modal={changeTeacher}
          reloadAssessment={async () => {
            if (typeof onRefreshCalendar === 'function') {
              await onRefreshCalendar();
            }
          }}
          selectedAssessment={selectedAssessment as unknown as AssessmentData}
          selectedStudentId={(selectedAssessment as any)?.student_id ?? ''}
        />
      )} */}
    </>
  );
};

export default LiveAssessmentCustomEvent;
