import PageMeta from '../../../../components/common/PageMeta';

const EditOrganization = ({ backURL }: { backURL: string }) => {
  return (
    <div className="space-y-6">
        <PageMeta title="Manage Organizations" description="Admin organization management" />
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Manage Organizations</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Use this screen to manage organizations, assign roles, and control access. Hook this UI to
                actual data sources as they become available.
            </p>
        </div>
    </div>
);
};

export default EditOrganization;

