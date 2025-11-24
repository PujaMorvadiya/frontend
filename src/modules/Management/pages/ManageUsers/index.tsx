import PageMeta from '../../../../components/common/PageMeta';

const ManageUsers = () => {
  return (
    <div className="space-y-6">
      <PageMeta title="Manage Users" description="Admin and organization user management" />
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Manage Users</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Build out the user management experience here. Link this page to the backend user lists and
          actions when the APIs are ready.
        </p>
      </div>
    </div>
  );
};

export default ManageUsers;

