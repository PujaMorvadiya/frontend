import * as Yup from 'yup';
import { checkTimeOverlap } from '../constants';
import { validationProps } from '../types';

export const TeacherAvailabilityValidationSchema = () => {
  return Yup.object().shape({
    startDate: Yup.date().required('Start Date is Required'),
    endDate: Yup.date().required("End Date is Required"),
    week_days: Yup.array()
      .min(1, "Day Selection is Required")
      .required("Day Selection is Required"),
    time_ranges: Yup.array()
      .of(
        Yup.object().shape({
          start_time: Yup.date().required(
            "Start Time is Required",
          ),
          end_time: Yup.date()
            .required("End Time is Required")
            .min(
              Yup.ref('start_time'),
              "End time must be after start time",
            ),
        })
      )
      .test(
        'is-valid-time',
        'Date must be valid',
        (val: validationProps[] | undefined, { path }) => {
          const conflicts = checkTimeOverlap(
            val as unknown as { start_time: string; end_time: string }[]
          );
          const errors: Yup.ValidationError[] = [];

          /* ******************** Duplicate Dates Validation ******************** */
          if (conflicts.length > 0) {
            errors.push(
              ...conflicts.flatMap(([index1, index2]) => [
                new Yup.ValidationError(
                  `Start time slot overlaps with slot ${index2 + 1} `,
                  null,
                  `${path}.[${index1}].start_time`
                ),
                new Yup.ValidationError(
                  `End time slot overlaps with slot ${index1 + 1}`,
                  null,
                  `${path}.[${index2}].end_time`
                ),
              ])
            );
          }
          if (errors?.length) throw new Yup.ValidationError(errors);
          return true;
        }
      ),
  });
};

export const TeacherAvailabilityUpdateValidationSchema = () => {
  return Yup.object().shape({
    time_ranges: Yup.array()
      .of(
        Yup.object().shape({
          start_time: Yup.date().required(
            "Start Time is Required"
          ),
          end_time: Yup.date()
            .required('End Time is Required')
            .min(
              Yup.ref('start_time'),
              "End time must be after start time"
            ),
        })
      )
      .test(
        'is-valid-time',
        "Date must be valid",
        (val: validationProps[] | undefined, { path }) => {
          const conflicts = checkTimeOverlap(
            val as unknown as { start_time: string; end_time: string }[]
          );
          const errors: Yup.ValidationError[] = [];

          /* ******************** Duplicate Dates Validation ******************** */
          if (conflicts.length > 0) {
            errors.push(
              ...conflicts.flatMap(([index1, index2]) => [
                new Yup.ValidationError(
                  `Start time slot overlaps with slot ${index2 + 1}`,
                  null,
                  `${path}.[${index1}].start_time`
                ),
                new Yup.ValidationError(
                  `Start time slot overlaps with slot ${index1 + 1}`,
                  null,
                  `${path}.[${index2}].end_time`
                ),
              ])
            );
          }
          if (errors?.length) throw new Yup.ValidationError(errors);
          return true;
        }
      ),
  });
};
