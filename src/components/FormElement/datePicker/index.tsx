import Button from 'components/Button/Button';
import Image from 'components/Image';
import { VITE_DATE_FORMAT } from 'config';
import { useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorMessage from '../ErrorMessage';
import '../style/inputField.css';

interface DatePickerProps {
  label?: string;
  className?: string;
  parentClass?: string;
  labelClass?: string;
  isCompulsory?: boolean;
  range?: boolean;
  icon?: React.ReactNode;
  selectedDate?: Date | null;
  endingDate?: Date | null;
  onChange?: (date: Date) => void;
  onRangeChange?: (startDate: Date, endDate: Date) => void;
  isTimePicker?: boolean;
  showTimeSelectOnly?: boolean;
  dateFormat?: string;
  name?: string;
  startDateName?: string;
  endDateName?: string;
  minTime?: Date;
  maxTime?: Date;
  startDateMinTime?: Date;
  startDateMaxTime?: Date;
  startDateMin?: Date;
  startDateMax?: Date;
  endDateMin?: Date;
  endDateMax?: Date;
  endDateMinTime?: Date;
  endDateMaxTime?: Date;
  placeholder?: string;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
  isLoading?: boolean;
  type?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  timeInterval?: number;
  isClearable?: boolean;
  excludeTimes?: any;
  noErrorShow?: boolean;
  hideIcon?: boolean;
  onChangeRaw?: (
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  showYearDropdown?: boolean;
  yearDropdownItemNumber?: number;
  showMonthDropdown?: boolean;
  scrollableYearDropdown?: boolean;
  dateFormatCalendar?: string;
  endDateNotDisable?: boolean;
  monthPicker?: boolean;
  inline?: boolean;
  highlightDates?: Date[];
  visibleMonth?: Date;
  setVisibleMonth?: (date: Date) => void;
  onMonthChange?: (month: Date) => void;
}

const DatePicker = ({
  label,
  className,
  parentClass,
  isCompulsory,
  labelClass,
  icon,
  selectedDate,
  endingDate,
  onChange,
  range,
  onRangeChange,
  isTimePicker,
  showTimeSelectOnly,
  dateFormat = VITE_DATE_FORMAT as string,
  name = '',
  startDateName = '',
  endDateName = '',
  placeholder,
  startDatePlaceholder,
  endDatePlaceholder,
  isLoading = false,
  type,
  minDate,
  disabled,
  minTime,
  maxTime,
  startDateMaxTime,
  startDateMinTime,
  endDateMaxTime,
  endDateMinTime,
  maxDate,
  timeInterval,
  isClearable = false,
  excludeTimes,
  noErrorShow = true,
  startDateMin,
  startDateMax,
  endDateMax,
  endDateMin,
  hideIcon,
  onChangeRaw,
  showYearDropdown = false,
  yearDropdownItemNumber = 0,
  showMonthDropdown = false,
  scrollableYearDropdown = false,
  dateFormatCalendar,
  endDateNotDisable = false,
  monthPicker = false,
  inline,
  highlightDates,
  visibleMonth,
  setVisibleMonth,
  onMonthChange,
}: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const formik = useFormikContext();
  const datePickerRef = useRef<ReactDatePicker | null>(null);

  useEffect(() => {
    if (!selectedDate) setStartDate(undefined);
    else setStartDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (!endingDate) setEndDate(undefined);
    else setEndDate(endingDate);
  }, [endingDate]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative calendarClassName [&>.react-datepicker-wrapper]:w-full ${parentClass}`}
    >
      {isLoading ? (
        <div className="lazy h-[50px]" />
      ) : (
        <>
          {label && (
            <label className={` input-label ${labelClass ?? ''}`}>
              {label}
              {isCompulsory && <span className="text-red-700">*</span>}
            </label>
          )}
          {range ? (
            <div className="data-picker-wrap">
              <ReactDatePicker
                autoComplete="off"
                wrapperClassName="flex-[1_0_0%]"
                className={`inputField !border-none !ring-0 !ring-offset-0 !ring-transparent ${className ?? ''
                  }`}
                selected={startDate}
                onChange={(date, e) => {
                  e?.stopPropagation();
                  setStartDate(date as Date);
                  if (range) {
                    if (onRangeChange) {
                      onRangeChange(date as Date, endDate as Date);
                    }
                  } else if (onChange) {
                    onChange(date as Date);
                  }
                }}
                showTimeSelect={isTimePicker}
                showTimeSelectOnly={showTimeSelectOnly}
                placeholderText={startDatePlaceholder}
                timeIntervals={15}
                dateFormat={dateFormat}
                disabled={disabled}
                minTime={
                  startDateMinTime && startDateMaxTime ? startDateMinTime : undefined
                }
                maxTime={
                  startDateMinTime && startDateMaxTime ? startDateMaxTime : undefined
                }
                minDate={startDateMin}
                maxDate={startDateMax}
                excludeTimes={excludeTimes}
                isClearable={isClearable}
                onChangeRaw={onChangeRaw}
              />
              <Button className="w-6 h-6 inline-block p-1 text-grayText">
                <Image iconName="arrowRight" iconClassName="w-full h-full" />
              </Button>

              <ReactDatePicker
                wrapperClassName="flex-[1_0_0%]"
                className={`inputField !border-none !ring-0 !ring-offset-0 !ring-transparent ${className ?? ''
                  }`}
                selected={endDate}
                onChange={(date, e) => {
                  e?.stopPropagation();
                  setEndDate(date as Date);
                  if (range) {
                    if (onRangeChange) {
                      onRangeChange(startDate as Date, date as Date);
                    }
                  } else if (onChange) {
                    onChange(date as Date);
                  }
                }}
                showTimeSelect={isTimePicker}
                showTimeSelectOnly={showTimeSelectOnly}
                placeholderText={endDatePlaceholder}
                timeIntervals={15}
                dateFormat={dateFormat}
                disabled={endDateNotDisable}
                minTime={
                  endDateMinTime && endDateMaxTime ? endDateMinTime : undefined
                }
                maxTime={
                  endDateMinTime && endDateMaxTime ? endDateMaxTime : undefined
                }
                excludeTimes={excludeTimes}
                minDate={endDateMin}
                maxDate={endDateMax}
                isClearable={isClearable}
                onChangeRaw={onChangeRaw}
              />
              {hideIcon ? (
                <Button className="w-6 h-6 inline-block p-0.5 text-grayText">
                  <Image
                    iconName={type === 'date' ? 'calendar' : 'calendar'} // add clock icon in second calendar condition
                    iconClassName="w-full h-full"
                  />
                </Button>
              ) : (
                ''
              )}
            </div>
          ) : (
            <>
              <ReactDatePicker
                ref={datePickerRef}
                name={name}
                autoComplete="off"
                className={`inputField ${icon && '!pe-10'} ${className ?? ''}`}
                selected={startDate}
                onChange={(date, e) => {
                  e?.stopPropagation();
                  setStartDate(date as Date);
                  if (onChange) onChange(date as Date);
                }}
                dateFormatCalendar={dateFormatCalendar}
                showTimeSelect={isTimePicker}
                showTimeSelectOnly={showTimeSelectOnly}
                timeIntervals={timeInterval ?? 15}
                dateFormat={dateFormat}
                placeholderText={placeholder}
                minDate={minDate}
                maxDate={maxDate}
                disabled={disabled}
                minTime={minTime && maxTime ? minTime : undefined}
                maxTime={minTime && maxTime ? maxTime : undefined}
                isClearable={isClearable}
                showYearDropdown={showYearDropdown}
                yearDropdownItemNumber={yearDropdownItemNumber}
                showMonthDropdown={showMonthDropdown}
                scrollableYearDropdown={scrollableYearDropdown}
                toggleCalendarOnIconClick
                showMonthYearPicker={monthPicker}
                inline={inline}
                highlightDates={highlightDates}
                onMonthChange={(month) => {
                  if (setVisibleMonth) setVisibleMonth(month);
                  if (onMonthChange) onMonthChange(month);
                }}
                openToDate={visibleMonth ?? startDate}
              />
              <div
                className={`input-icon absolute right-4 text-black/50 ${label ? 'top-[42px]' : 'top-4'
                  } ${inline ? 'hidden' : ''}`}
                onClick={(e) => {
                  e?.stopPropagation();
                  datePickerRef?.current?.setOpen(true);
                }}
              >
                {icon && <Image iconName="calendar" iconClassName="w-5 h-5" />}
              </div>
            </>
          )}
        </>
      )}
      {formik && name && <ErrorMessage name={name} />}
      {formik && noErrorShow && startDateName && (
        <ErrorMessage name={startDateName} />
      )}
      {formik && noErrorShow && endDateName && <ErrorMessage name={endDateName} />}
    </div>
  );
};

export default DatePicker;
