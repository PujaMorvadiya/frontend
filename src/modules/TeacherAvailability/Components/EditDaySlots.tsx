import Button from 'components/Button/Button';
import DatePicker from 'components/FormElement/datePicker';
import ReactSelect from 'components/FormElement/ReactSelect';
import { IOptions } from 'components/FormElement/types';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import {
  addMinutes,
  endOfDay,
  getHours,
  getMinutes,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { FieldArray, Form, Formik, FormikValues } from 'formik';
import { useAxiosGet, useAxiosPut } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { generateDaySlots, generateTimeSlots } from '../constants';
import { AllSlotsProps, ErrorType } from '../types';
import { TeacherAvailabilityUpdateValidationSchema } from '../validation';
import { roundToNearest15 } from 'utils/date';

interface ModalData {
  daySlots: {
    start_time: string;
    end_time: string;
    id: string;
    date: string | undefined;
    timezone: string;
    availability_type: string;
    conflict?: {
      start_time: string;
      end_time: string;
      availability_type: string;
    }[];
  }[];
  selectedDate?: string | Date;
  getDayLoading?: boolean;
  getSlotListing: (date: string) => void;
  fetchEvents: () => void;
}

export const mergeDateTime = (dateString?: string, timeString?: string) => {
  if (timeString && dateString) {
    const date = parseISO(dateString);
    const time = parseISO(timeString);
    const hours = getHours(time);
    const minutes = getMinutes(time);
    const mergedDate = setMinutes(setHours(date, hours), minutes);
    return mergedDate?.toISOString();
  }
  return dateString;
};

export const EditDaySlots = ({
  daySlots,
  selectedDate,
  getDayLoading,
  getSlotListing,
  fetchEvents,
}: ModalData) => {
  const [updateAvailability, { isLoading: updateLoading }] = useAxiosPut();
  const [submit, setSubmit] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const confirmationModal = useModal();
  const [initialValues, setInitialValues] = useState<{
    time_ranges: {
      start_time: string;
      end_time: string;
      id: string;
      date: string | undefined;
      timezone: string;
      availability_type: string;
      conflict?: {
        start_time: string;
        end_time: string;
        availability_type: string;
      }[];
    }[];
    deleted_ids: string[];
  }>({
    time_ranges: [
      {
        start_time: '',
        end_time: '',
        id: '',
        date: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        availability_type: '',
      },
    ],
    deleted_ids: [] as string[],
  });
  const [getRequest, { isLoading: tzLoading }] = useAxiosGet();
  const [timezoneOptions, setTimezoneOptions] = useState<IOptions[]>([]);
  const [deleteAllSlot, setDeleteAllSlot] = useState<boolean>(false);
  const conflict =
    Array.isArray(initialValues.time_ranges) &&
    initialValues.time_ranges.some(
      ({ conflict }) => Array.isArray(conflict) && conflict.length > 0
    );

  useEffect(() => {
    const daySlotsDetails = {
      time_ranges:
        daySlots.length > 0
          ? daySlots?.map((slot) => ({
            start_time: slot?.start_time,
            end_time: slot?.end_time,
            id: slot?.id,
            date: slot?.date,
            timezone: slot.timezone,
            availability_type: slot.availability_type,
            conflict: slot?.conflict,
          }))
          : [],

      deleted_ids: [],
    };
    setSubmit(false);
    checkSlotTime(daySlotsDetails.time_ranges);
    setInitialValues(daySlotsDetails);
  }, [daySlots, selectedDate]);

  // useEffect(() => {
  //   const fetchTimezones = async () => {
  //     const { data, error } = await getRequest('/users/timezone');
  //     if (!error && data) {
  //       setTimezoneOptions(data);
  //     }
  //   };

  //   fetchTimezones();
  // }, []);
  const isExpired =
    selectedDate &&
    new Date().setHours(0, 0, 0, 0) > new Date(selectedDate).setHours(0, 0, 0, 0);

  const checkSlotTime = (daySlotsDetails: AllSlotsProps[]) => {
    if (
      !daySlotsDetails ||
      (daySlotsDetails.length === 0 && selectedDate && !isExpired)
    ) {
      daySlotsDetails.push({
        start_time: '',
        end_time: '',
        id: '',
        date: selectedDate ? new Date(selectedDate).toISOString() : '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        availability_type: '',
      });
      return;
    }
    daySlotsDetails?.map((range: { start_time: string; end_time: string }) => {
      const startDate = parseISO(range.start_time);
      const endDate = parseISO(range.end_time);
      const endOfSelectedDay = endOfDay(selectedDate as Date);
      const startOfSelectedDay = startOfDay(selectedDate as Date);
      if (startDate >= startOfSelectedDay && startDate <= endOfSelectedDay) {
        range.start_time = range.start_time as string; // No change needed
      } else {
        range.start_time = startOfSelectedDay.toISOString();
      }
      if (endDate >= startOfSelectedDay && endDate <= endOfSelectedDay) {
        range.end_time = range.end_time as string;
      } else {
        range.end_time = endOfSelectedDay.toISOString();
      }
      return range;
    });
  };

  const handleSubmit = async (values: FormikValues) => {
    const bodyData = values?.time_ranges?.map((slotData: AllSlotsProps) => {
      return {
        date: slotData?.start_time || values?.time_ranges[0]?.start_time,
        start_time: slotData?.start_time,
        end_time: slotData?.end_time,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        availability_type: slotData?.availability_type,
        ...(slotData.id && { id: slotData.id }),
        conflict: slotData?.conflict,
      };
    });
    setInitialValues({
      time_ranges: bodyData as AllSlotsProps[],
      deleted_ids: values.deleted_ids,
    });
    confirmationModal.openModal();
  };
  const handleOkProcess = async () => {
    const cleanedTimeRanges = initialValues.time_ranges.map(
      ({ conflict: _conflict, ...rest }) => rest
    );
    const { error } = await updateAvailability('/teacher-availabilities', {
      availabilities: cleanedTimeRanges,
      deletedIds: initialValues.deleted_ids,
      deleteAllSlot,
    });
    if (_.isNil(error)) {
      confirmationModal.closeModal();
    } else {
      confirmationModal.closeModal();
    }
    fetchEvents();
    getSlotListing(
      zonedTimeToUtc(startOfDay(selectedDate as Date), 'UTC').toISOString()
    );
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={TeacherAvailabilityUpdateValidationSchema()}
      >
        {({ values, setFieldValue, errors }) => {
          return (
            <Form>
              {getDayLoading ? (
                <div className="mt-2">
                  <div className="h-[45px] w-full mb-1 lazy" />
                  <div className="!w-[95px] h-[42px] ms-auto lazy" />
                </div>
              ) : (
                <>
                  {selectedDate && (
                    <label className="select-time-slot-wrap-title">
                      Time Slots
                    </label>
                  )}

                  <FieldArray
                    name="time_ranges"
                    render={(timeRangeArrayHelpers) => {
                      return (
                        <>
                          {values?.time_ranges?.map((timeRange, timeIndex) => {
                            const excludeTimes = values.time_ranges
                              .filter((_, idx) => idx !== timeIndex) // Exclude current time range
                              .flatMap((range) => {
                                const startTime = parseISO(range.start_time);
                                const endTime = parseISO(range.end_time);
                                return generateTimeSlots(startTime, endTime); // Generate all slots for each range
                              });
                            const isToday =
                              selectedDate &&
                              new Date(selectedDate).toDateString() ===
                              new Date().toDateString();
                            if (isToday) {
                              const currentTime = new Date();
                              const oneHourLater = new Date(
                                currentTime.getTime() + 60 * 60 * 1000
                              );
                              const time = generateDaySlots()
                                .filter((slot) => {
                                  const slotTime = parseISO(slot);
                                  return slotTime < oneHourLater;
                                })
                                .map((slot) => new Date(slot));
                              excludeTimes.push(...time);
                            }

                            return (
                              <div key={`slots_${timeIndex + 1}`}>
                                <div className="flex flex-col">
                                  <div
                                    key={`time_range_day_${timeIndex}`}
                                    className="select-time-slot-wrap mt-2 relative"
                                  >
                                    <DatePicker
                                      startDateName={`time_ranges[${timeIndex}].start_time`}
                                      endDateName={`time_ranges[${timeIndex}].end_time`}
                                      parentClass="flex-[1_0_0%]"
                                      range
                                      selectedDate={
                                        timeRange?.start_time
                                          ? parseISO(timeRange?.start_time)
                                          : undefined
                                      }
                                      endingDate={
                                        timeRange?.end_time
                                          ? parseISO(timeRange?.end_time)
                                          : undefined
                                      }
                                      excludeTimes={excludeTimes}
                                      noErrorShow={false}
                                      onRangeChange={(startDate, endDate) => {
                                        if (setFieldValue) {
                                          const roundedStart =
                                            roundToNearest15(startDate);
                                          if (startDate && timeRange?.start_time) {
                                            setFieldValue(
                                              `time_ranges[${timeIndex}].start_time`,
                                              roundedStart?.toISOString()
                                            );
                                          } else {
                                            setFieldValue(
                                              `time_ranges[${timeIndex}].start_time`,
                                              mergeDateTime(
                                                new Date(
                                                  selectedDate as Date
                                                ).toISOString(),
                                                roundedStart?.toISOString()
                                              )
                                            );
                                          }
                                          const roundedEnd =
                                            roundToNearest15(endDate);
                                          if (endDate) {
                                            if (timeRange?.end_time) {
                                              const newEndDate =
                                                startDate >= endDate ||
                                                  !!(
                                                    endDate &&
                                                    startDate.getTime() >
                                                    roundedEnd.getTime() -
                                                    3600 * 1000
                                                  )
                                                  ? mergeDateTime(
                                                    startDate.toISOString(),
                                                    startDate.getHours() >= 23
                                                      ? new Date(
                                                        startDate.setHours(
                                                          23,
                                                          45,
                                                          0,
                                                          0
                                                        )
                                                      ).toISOString()
                                                      : new Date(
                                                        startDate.getTime() +
                                                        3600 * 1000
                                                      ).toISOString()
                                                  )
                                                  : mergeDateTime(
                                                    startDate.toISOString(),
                                                    roundedEnd.toISOString()
                                                  );
                                              setFieldValue(
                                                `time_ranges[${timeIndex}].end_time`,
                                                newEndDate
                                              );
                                            } else {
                                              setFieldValue(
                                                `time_ranges[${timeIndex}].end_time`,
                                                mergeDateTime(
                                                  new Date(
                                                    selectedDate as Date
                                                  ).toISOString(),
                                                  endDate.toISOString()
                                                )
                                              );
                                            }
                                          }
                                        }
                                      }}
                                      isTimePicker
                                      showTimeSelectOnly
                                      startDatePlaceholder='Enter Start Time'
                                      endDatePlaceholder='Enter End Time'
                                      dateFormat="h:mm aa"
                                      startDateMinTime={
                                        new Date(new Date().setHours(0, 0, 0))
                                      }
                                      endDateMinTime={
                                        timeRange?.start_time
                                          ? addMinutes(
                                            parseISO(timeRange?.start_time),
                                            60
                                          )
                                          : undefined
                                      }
                                      endDateMaxTime={
                                        new Date(new Date().setHours(23, 59, 59))
                                      }
                                      disabled={!!isExpired}
                                      endDateNotDisable={!!isExpired}
                                    />
                                    <ReactSelect
                                      options={timezoneOptions ?? []}
                                      placeholder='Timezone'
                                      name={`time_ranges[${timeIndex}].timezone`}
                                      isLoading={tzLoading}
                                      selectedValue={
                                        Intl.DateTimeFormat().resolvedOptions()
                                          .timeZone
                                      }
                                      disabled
                                      onChange={(option) => {
                                        setFieldValue(
                                          `time_ranges[${timeIndex}].timezone`,
                                          (option as IOptions)?.value
                                        );
                                      }}
                                      className="!cursor-not-allowed w-[200px]"
                                    />

                                    {!isExpired &&
                                      values?.time_ranges?.length > 0 &&
                                      timeIndex ===
                                      values.time_ranges.length - 1 && (
                                        <Button
                                          variants="PrimaryWoodLight"
                                          onClickHandler={() =>
                                            timeRangeArrayHelpers.push({
                                              start_time: '',
                                              end_time: '',
                                            })
                                          }
                                          className="gap-1 h-10"
                                          tooltipText='Add'
                                          tooltipPosition="left"
                                        >
                                          <Image iconName="plus" />
                                        </Button>
                                      )}
                                    {!isExpired && values.time_ranges.length > 0 && (
                                      <Button
                                        className="action-button red icon-delete text-PrimaryRed"
                                        disabled={
                                          values.time_ranges.length === 1 &&
                                          !timeRange.id
                                        }
                                        onClickHandler={() => {
                                          timeRangeArrayHelpers.remove(timeIndex);
                                          setFieldValue('deleted_ids', [
                                            ...values.deleted_ids,
                                            timeRange.id,
                                          ]);
                                          if (timeRange.id) {
                                            setInitialValues((prevState) => ({
                                              ...prevState,
                                              deleted_ids: [
                                                ...values.deleted_ids,
                                                timeRange.id,
                                              ],
                                            }));
                                            confirmationModal.openModal();
                                            setIsUpdate(false);
                                          }
                                        }}
                                        tooltipText='Delete'
                                        tooltipPosition="left"
                                      >
                                        <Image iconName="trashIcon" />
                                      </Button>
                                    )}
                                  </div>
                                  <div>
                                    <div>
                                      {timeRange.conflict &&
                                        timeRange.conflict.map(
                                          (c, conflictIndex) => (
                                            <p
                                              key={`conflict_${timeIndex}_${conflictIndex}`}
                                              className="text-PrimaryRed"
                                            >
                                              There is {c.availability_type} booked between {parseISO(
                                                c.start_time
                                              ).toLocaleTimeString()} to {parseISO(
                                                c.end_time
                                              ).toLocaleTimeString()}.
                                            </p>
                                          )
                                        )}
                                    </div>
                                  </div>
                                </div>
                                {submit &&
                                  errors.time_ranges &&
                                  Array.isArray(errors.time_ranges) ? (
                                  <p className="error-message">
                                    {(errors as unknown as ErrorType)?.time_ranges?.[
                                      timeIndex
                                    ]?.start_time
                                      ? `${(errors as unknown as ErrorType)?.time_ranges[timeIndex]?.start_time} `
                                      : ''}
                                    {(errors as unknown as ErrorType).time_ranges[
                                      timeIndex
                                    ]?.end_time
                                      ? `${(errors as unknown as ErrorType).time_ranges[timeIndex]?.start_time ? 'or ' : ''} ${(errors as unknown as ErrorType).time_ranges[timeIndex]?.end_time}`
                                      : ''}
                                  </p>
                                ) : null}
                              </div>
                            );
                          })}
                        </>
                      );
                    }}
                  />

                  {!isExpired && selectedDate && (
                    <div className="btn-wrap">
                      <Button
                        type="submit"
                        variants="PrimaryWoodLight"
                        onClickHandler={() => {
                          setSubmit(true);
                          setIsUpdate(true);
                          setDeleteAllSlot(false);
                        }}
                        disabled={getDayLoading}
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Form>
          );
        }}
      </Formik>
      <ConfirmationPopup
        showCloseIcon
        modal={confirmationModal}
        deleteTitle={
          conflict && isUpdate
            ? "Time Conflict Detected"
            : "Want to proceed?"
        }
        bodyText={
          conflict && isUpdate
            ? "Your chosen availability overlaps with an existing course/assessment time.It is not recommended to override this conflict."
            : "Are you sure you want to proceed with this time slot?"
        }
        cancelButtonText='cancel'
        confirmButtonText="Ok"
        cancelButtonFunction={() => {
          setDeleteAllSlot(false);
          confirmationModal.closeModal();
        }}
        confirmButtonFunction={handleOkProcess}
        popUpType="warning"
        isSlotReoccurring={!isUpdate}
        confirmCheckbox={conflict && isUpdate}
        setDeleteAll={setDeleteAllSlot}
        isLoading={updateLoading}
        isDisabled={updateLoading}
      />
    </>
  );
};
