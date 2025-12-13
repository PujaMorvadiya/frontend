import * as Yup from 'yup';

export const FilterValidationSchema = () => {
  return Yup.object().shape({
    start_date: Yup.date().required('Start Date is Required'),
    end_date: Yup.date().required('End Date is Required'),
    start_time: Yup.date().required('Start Time is Required'),
    end_time: Yup.date().required('End Time is Required'),
  });
};
