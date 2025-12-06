import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Loaders from 'components/Loaders';
import PageHeader from 'components/PageHeader';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosGet, useAxiosPut } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthUserType, RolesType } from 'reduxStore/types';
import { editUserValidationSchema } from './validations';
import { Roles } from 'constant/common.constant';
import { PRIVATE_NAVIGATION } from 'constant/navigation.constant';

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUserType>();

  const [initialValues, setInitialValues] = useState({
    email: '',
    ...(user?.role?.role === Roles.Organization
      ? { name: '' }
      : { first_name: '', last_name: '' }),
  });

  const [callGetApi, { isLoading: isGetLoading }] = useAxiosGet();
  const [callPutApi, { isLoading: isPutLoading }] = useAxiosPut();

  const getUserDetails = async () => {
    const response = await callGetApi('/users/view', {
      params: {
        user_id: userId,
      },
    });
    if (response?.data) setUser(response.data);
  };

  const handleSubmit = async (values: FormikValues) => {
    const data = {
      first_name: values.first_name ?? values.name,
      ...(values.last_name ? { last_name: values.last_name } : {}),
      email: values.email,
    };

    const { error } = await callPutApi(`/users/${userId}/update`, data);
    if (!error) {
      navigate(`/admin${PRIVATE_NAVIGATION.users.view.path}`);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  useEffect(() => {
    setInitialValues({
      email: user?.email ?? '',
      ...(user?.role?.role === Roles.Organization
        ? { name: user?.first_name ?? '' }
        : { first_name: user?.first_name ?? '', last_name: user?.last_name ?? '' }),
    });
  }, [user]);

  return (
    <>
      <PageHeader
        className="capitalize"
        title='Edit User'
        url={`/admin${PRIVATE_NAVIGATION.users.view.path}`}
      />
      <div className="step-wrapper primary">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editUserValidationSchema(user?.role?.role as RolesType)}
          enableReinitialize
        >
          <Form>
            {isGetLoading ? (
              <Loaders type="Spin" />
            ) : (
              <div className="add-user-type-form  grid grid-cols-2 gap-5 max-w-[900px] xl:min-w-[500px] mx-auto bg-white rounded-10px p-5">
                {user?.role?.role === Roles.Organization ? (
                  <div className="md:col-span-2">
                    <InputField
                      isCompulsory
                      name="name"
                      label="Organization Name"
                      placeholder="Enter Organization Name"
                    />
                  </div>
                ) : (
                  <>
                    <InputField
                      isCompulsory
                      name="first_name"
                      label="First Name"
                      placeholder="Enter First Name"
                    />
                    <InputField
                      isCompulsory
                      name="last_name"
                      label="Last Name"
                      placeholder="Enter Last Name"
                    />
                  </>
                )}
                <div className="md:col-span-2">
                  <InputField
                    isCompulsory
                    name="email"
                    label="Email"
                    placeholder='Enter Email'
                  />
                </div>

                <div className="btn-wrap capitalize col-span-2">
                  <Button
                    type="submit"
                    variants="PrimaryWood"
                    isLoading={isPutLoading}
                  >
                    Update
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </>
  );
};
export default EditUser;
