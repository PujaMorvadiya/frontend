import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import DatePicker from 'components/FormElement/datePicker';
import ReactSelect from 'components/FormElement/ReactSelect';
import { IOptions } from 'components/FormElement/types';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import { Modal } from 'components/Modal/Modal';
import { VITE_DATE_FORMAT } from 'config';
import {
  addMinutes,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfDay,
  parseISO,
  startOfDay,
} from 'date-fns';
import { FieldArray, Form, Formik, FormikValues } from 'formik';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { roundToNearest15 } from 'utils/date';
import { generateTimeSlots } from '../constants';
import { EditAvailabilityProps, ModalProps } from '../types';
import { TeacherAvailabilityValidationSchema } from '../validation';
import { convertToLocalTime, getLocalDateOnly, TIMEZONE } from 'utils';

interface ModalData {
  modal: ModalProps;
  fetchEvents: () => void;
}

export const EditAvailability = ({ modal, fetchEvents }: ModalData) => {
  const [createAvailability, { isLoading }] = useAxiosPost();
  const [getRequest, { isLoading: tzLoading }] = useAxiosGet();
  const [timezoneOptions, setTimezoneOptions] = useState<IOptions[]>([]);
  const confirmationModal = useModal();
  const user = useSelector(getCurrentUser);
  const [submit, setSubmit] = useState(false);

  const [initialValues, setInitialValues] = useState({
    startDate: '',
    endDate: '',
    time_ranges: [
      { start_time: '', end_time: '', timezone: '', availability_type: '' },
    ],
    week_days: [] as number[],
  });

  const handleSubmit = async (values: FormikValues) => {
    const bodyData = {
      ...values,
      week_days: values.week_days,
      userId: user?.id,
    };
    setInitialValues(bodyData as unknown as EditAvailabilityProps);
    if (Array.isArray(values.week_days) && values.week_days.length > 0) {
      confirmationModal.openModal();
    }
  };

  // useEffect(() => {
  //   const fetchTimezones = async () => {
  //     const { data, error } = await getRequest('/users/timezone');
  //     if (!error && data) {
  //       setTimezoneOptions(data);
  //     }
  //   };

  //   fetchTimezones();
  // }, []);

  const weekDays = [
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
    { label: 'Sunday', value: 0 },
  ];

  const handleOkProcess = async () => {
    const startDate = getLocalDateOnly(initialValues.startDate, TIMEZONE);
    const endDate = getLocalDateOnly(initialValues.endDate, TIMEZONE);

    const time_ranges = convertToLocalTime(initialValues.time_ranges, TIMEZONE);

    const payload = {
      ...initialValues,
      startDate,
      endDate,
      time_ranges,
    };

    const { error } = await createAvailability(
      '/teacher-availabilities/bulkInsert',
      payload
    );

    modal.closeModal();
    if (_.isNil(error)) {
      confirmationModal.closeModal();
      fetchEvents();
    }
  };

  return (
    <>
      <Modal
        width="max-w-[900px]"
        modal={modal}
        closeOnEscape
        headerTitle="Manage Availability"
        closeOnOutsideClick
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={false}
          validationSchema={TeacherAvailabilityValidationSchema()}
        >
          {({ values, setFieldValue, errors }) => {
            const parsedStartDate = values.startDate
              ? parseISO(values.startDate)
              : null;
            const parsedEndDate = values.endDate ? parseISO(values.endDate) : null;

            const differenceInDays =
              parsedStartDate && parsedEndDate
                ? differenceInCalendarDays(parsedEndDate, parsedStartDate) + 1
                : 0;

            let validDays: number[] = [];
            if (parsedStartDate && parsedEndDate && differenceInDays <= 8) {
              validDays = eachDayOfInterval({
                start: startOfDay(parsedStartDate),
                end: endOfDay(parsedEndDate),
              }).map((date) => date.getDay());
            }

            return (
              <Form>
                <div className="manage-time-select-date grid grid-cols-2 gap-4 mb-2.5">
                  <DatePicker
                    name="startDate"
                    label='Start Date'
                    icon
                    selectedDate={
                      values?.startDate ? new Date(values?.startDate) : null
                    }
                    minDate={new Date()}
                    onChange={(date) => {
                      if (date) {
                        setFieldValue('startDate', date);
                        setFieldValue('time_ranges', [
                          { start_time: '', end_time: '', timezone: '' },
                        ]);
                        if (values.endDate && date > new Date(values.endDate)) {
                          setFieldValue('endDate', null);
                        }
                      }
                    }}
                    dateFormat={VITE_DATE_FORMAT}
                    placeholder='Enter Start Date'
                    isCompulsory
                  />
                  <DatePicker
                    name="endDate"
                    label="End Date"
                    icon
                    selectedDate={values?.endDate ? new Date(values?.endDate) : null}
                    onChange={(date) => {
                      // setFieldValue(`week_days`, [0, 1, 2, 3, 4, 5, 6]);
                      if (date) {
                        setFieldValue('endDate', date);
                      }
                    }}
                    minDate={
                      values.startDate ? new Date(values.startDate) : undefined
                    }
                    placeholder='Enter End Date'
                    isCompulsory
                    dateFormat={VITE_DATE_FORMAT}
                  />
                </div>

                {/* Weekday Selection */}
                <div className="manage-time-select-days-wrap bg-LightWood w-full p-3 rounded-5px mb-2.5">
                  <p className="manage-time-select-days-title text-black text-base mb-3">
                    Select Week Days
                  </p>
                  <div className="manage-time-select-days flex justify-between">
                    {weekDays.map((data, dayIndex) => {
                      const isDisabled =
                        differenceInDays <= 8 && !validDays.includes(data.value);
                      const isChecked = values.week_days.includes(data.value);

                      return (
                        <Checkbox
                          key={dayIndex}
                          id={`week_days[${dayIndex}]`}
                          labelClass="text-white"
                          name={`week_days[${dayIndex}]`}
                          onChange={() => {
                            let updatedWeekDays;
                            if (isChecked) {
                              updatedWeekDays = values.week_days.filter(
                                (day) => day !== data.value
                              );
                            } else {
                              updatedWeekDays = [...values.week_days, data.value];
                            }
                            setFieldValue('week_days', updatedWeekDays);
                          }}
                          check={isDisabled ? false : isChecked}
                          text={data.label}
                          disabled={isDisabled}
                          parentClass={isDisabled ? 'cursor-not-allowed' : ''}
                        />
                      );
                    })}
                  </div>
                </div>
                {submit && errors.week_days && (
                  <p className="error-message">
                    Day Selection is Required
                  </p>
                )}

                {/* Time Slots */}
                <label className="select-time-slot-wrap-title">
                  Time Slots
                </label>
                <FieldArray
                  name="time_ranges"
                  render={(timeRangeArrayHelpers) => (
                    <>
                      {values?.time_ranges.map((timeRange, timeIndex) => {
                        const excludeTimes = values.time_ranges
                          .filter((_, idx) => idx !== timeIndex)
                          .flatMap((range) => {
                            const startTime = range.start_time
                              ? parseISO(range.start_time)
                              : null;
                            const endTime = range.end_time
                              ? parseISO(range.end_time)
                              : null;
                            return startTime && endTime
                              ? generateTimeSlots(startTime, endTime)
                              : [];
                          });

                        return (
                          <div
                            key={`time_range_${timeIndex}`}
                            className="flex gap-4 items-center mt-2"
                          >
                            {/* Time Range Picker */}
                            <DatePicker
                              startDateName={`time_ranges[${timeIndex}].start_time`}
                              endDateName={`time_ranges[${timeIndex}].end_time`}
                              parentClass="flex-[1_0_0%]"
                              range
                              className="w-[300px]"
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
                              onRangeChange={(startDate, endDate) => {
                                if (setFieldValue) {
                                  if (startDate) {
                                    const roundedStart = roundToNearest15(startDate);
                                    setFieldValue(
                                      `time_ranges[${timeIndex}].start_time`,
                                      roundedStart.toISOString()
                                    );
                                  }
                                  if (endDate) {
                                    const roundedEnd = roundToNearest15(endDate);
                                    setFieldValue(
                                      `time_ranges[${timeIndex}].end_time`,
                                      roundedEnd.toISOString()
                                    );
                                  }
                                }
                              }}
                              excludeTimes={excludeTimes}
                              isTimePicker
                              showTimeSelectOnly
                              startDatePlaceholder='Enter Start Time'
                              endDatePlaceholder='Enter End Time'
                              dateFormat="h:mm aa"
                              startDateMinTime={
                                new Date(new Date().setHours(0, 0, 0))
                              }
                              endDateMaxTime={
                                new Date(new Date().setHours(23, 59, 59))
                              }
                              endDateMinTime={
                                timeRange?.start_time
                                  ? addMinutes(parseISO(timeRange?.start_time), 60)
                                  : undefined
                              }
                            />

                            {/* Timezone Select */}
                            <ReactSelect
                              options={timezoneOptions}
                              placeholder="Timezone"
                              name={`time_ranges[${timeIndex}].timezone`}
                              isLoading={tzLoading}
                              onChange={(option) => {
                                setFieldValue(
                                  `time_ranges[${timeIndex}].timezone`,
                                  (option as IOptions)?.value
                                );
                              }}
                              className="w-[250px]"
                            />

                            {timeIndex === values.time_ranges.length - 1 && (
                              <Button
                                variants="PrimaryWoodLight"
                                onClickHandler={() =>
                                  timeRangeArrayHelpers.push({
                                    start_time: '',
                                    end_time: '',
                                    timezone: '',
                                  })
                                }
                                className="gap-1 h-10"
                                tooltipText='Add'
                                tooltipPosition="left"
                              >
                                <Image iconName="plus" />
                              </Button>
                            )}
                            {values.time_ranges.length > 1 && (
                              <Button
                                className="action-button red icon-delete text-PrimaryRed"
                                onClickHandler={() =>
                                  timeRangeArrayHelpers.remove(timeIndex)
                                }
                                tooltipText='Delete'
                                tooltipPosition="left"
                              >
                                <Image iconName="trashIcon" />
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                />

                {/* Submit Button */}
                <div className="btn-wrap">
                  <Button
                    type="submit"
                    variants="PrimaryWoodLight"
                    onClickHandler={() => setSubmit(true)}
                  >
                    Add Availability
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>

      <ConfirmationPopup
        showCloseIcon
        modal={confirmationModal}
        deleteTitle="Want to proceed?"
        bodyText="Are you sure you want to proceed with this time slot?"
        cancelButtonText='cancel'
        confirmButtonText="Ok"
        cancelButtonFunction={() => confirmationModal.closeModal()}
        confirmButtonFunction={handleOkProcess}
        popUpType="warning"
        isLoading={isLoading}
        isDisabled={isLoading}
      />
    </>
  );
};
