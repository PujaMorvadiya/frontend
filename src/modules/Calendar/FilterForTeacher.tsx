import Button from 'components/Button/Button';
import DatePicker from 'components/FormElement/datePicker';
import Image from 'components/Image';
import { VITE_DATE_FORMAT } from 'config';
import { addMinutes } from 'date-fns';
import { Form, Formik, FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { FilterComponent } from './constants';
import { FilterValidationSchema } from './validation/FilterValidationSchema';

const FilterForTeacher: React.FC<FilterComponent> = ({
  setFilterTeacher,
  filterTeacher,
}) => {
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const handleSubmit = (values: FormikValues) => {
    setFilterTeacher(values);
    setIsOptionsVisible(false);
  };
  const toggleOptionsVisibility = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOptionsVisible((prev) => !prev);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
      setIsOptionsVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className="calendar-filter-wrap 0">
      <Button
        className="calendar-filter-btn"
        onClickHandler={toggleOptionsVisibility}
      >
        <Image iconName="calendar" />
      </Button>
      {/* { ( */}
      <div
        ref={optionsRef}
        className={`calendar-filter-options options-container p-3 min-w-96 ${!isOptionsVisible ? '!hidden' : ''}`}
      >
        <Formik
          initialValues={filterTeacher}
          validationSchema={FilterValidationSchema()}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <div className="">
                  <DatePicker
                    className="mb-3"
                    name="start_date"
                    label='Start Date'
                    icon
                    selectedDate={
                      values?.start_date ? new Date(values?.start_date) : null
                    }
                    minDate={new Date(new Date().setDate(new Date().getDate()))}
                    onChange={(date) => {
                      setFieldValue('start_date', date);
                    }}
                    maxDate={values.end_date ? new Date(values.end_date) : undefined}
                    dateFormat={VITE_DATE_FORMAT}
                    placeholder='Enter Start Date'
                    isCompulsory
                  />
                  <DatePicker
                    name="end_date"
                    label='End Date'
                    icon
                    selectedDate={
                      values?.end_date ? new Date(values?.end_date) : null
                    }
                    onChange={(date) => {
                      if (date) {
                        setFieldValue('end_date', date);
                      }
                    }}
                    minDate={
                      values.start_date ? new Date(values.start_date) : undefined
                    }
                    placeholder='Enter End Date'
                    isCompulsory
                    dateFormat={VITE_DATE_FORMAT}
                  />
                  <label className="select-time-slot-wrap-title">
                    Time Slots
                  </label>
                  <DatePicker
                    startDateName="start_time"
                    endDateName="end_time"
                    parentClass="flex-[1_0_0%]"
                    range
                    selectedDate={
                      values.start_time ? new Date(values?.start_time) : undefined
                    }
                    endingDate={
                      values?.end_time ? new Date(values?.end_time) : undefined
                    }
                    onRangeChange={(startDate, endDate) => {
                      if (startDate && endDate) {
                        const endTime =
                          startDate >= endDate ||
                            !!(
                              endDate &&
                              startDate.getTime() > endDate.getTime() - 15 * 60 * 1000
                            )
                            ? new Date(startDate.getTime() + 15 * 60 * 1000)
                            : endDate;
                        setFieldValue('start_time', startDate);
                        setFieldValue('end_time', endTime);
                      }
                    }}
                    isTimePicker
                    showTimeSelectOnly
                    startDatePlaceholder='Enter Start Time'
                    endDatePlaceholder='Enter End Time'
                    dateFormat="h:mm aa"
                    startDateMinTime={new Date(new Date().setHours(0, 0, 0))}
                    endDateMinTime={
                      values?.start_time
                        ? addMinutes(new Date(values?.start_time), 15)
                        : undefined
                    }
                    endDateMaxTime={new Date(new Date().setHours(23, 59, 59))}
                  />
                </div>

                <div className="btn-wrap">
                  <Button type="submit" variants="PrimaryWoodLight">
                    Apply
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      {/* )} */}
    </div>
  );
};
export default FilterForTeacher;
