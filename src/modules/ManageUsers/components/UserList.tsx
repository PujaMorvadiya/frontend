// ** Components **
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Switch from 'components/FormElement/Switch';
import Image from 'components/Image';
import Table from 'components/Table/Table';

// ** Hooks **
import {
    useAxiosDelete,
    useAxiosGet,
    useAxiosPut,
} from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';

// ** Redux **
import { useSelector } from 'react-redux';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';

// ** Types **
import { CellProps, ITableHeaderProps } from 'components/Table/types';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getDateDifference, TABLE_DATA_LIMIT, useDebounce } from 'modules/utils';
import { Roles, StatusEnum } from 'constant/common.constant';
import { IUserListResponse, Organization, User, UserListProps } from '../types';
import UserProfile from 'components/Icon/assets/UserProfile';
import EmailRender from './EmailRender';
import { VITE_DATE_FORMAT } from 'config';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';

const UserList = ({
    search,
    searchOn,
    isDeletedUser,
    userType,
    status,
    isAdmin = false,
}: UserListProps) => {
    // ** Redux **
    const { currentPage } = useSelector(currentPageSelector);
    const navigate = useNavigate();

    // ** State & Variables **
    const [userData, setUserData] = useState<IUserListResponse>();
    const [limit, setLimit] = useState(TABLE_DATA_LIMIT);
    const [sort, setSort] = useState<string>(
        isDeletedUser ? '-deleted_at' : '-created_at'
    );
    const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean | 'partial'>(false);

    // ** API **
    const [getApi, { isLoading: apiLoading }] = useAxiosGet();
    const [updateUser] = useAxiosPut();
    const [deleteUser, { isLoading: isDeleteUserLoading }] = useAxiosDelete();

    const deleteUserModal = useModal();
    const searchString = typeof search === 'string' ? search : '';
    const debounceSearch = useDebounce(searchString, 300);

    const fetchData = async () => {
        const data = await getApi(`/users`, {
            params: {
                page: currentPage,
                sort,
                limit,
                ...(debounceSearch && { search: debounceSearch }),
                ...(isDeletedUser && { isDeletedUser }),
                ...(debounceSearch &&
                    searchOn?.length && { searchOn }),
            },
        });
        setUserData(data?.data);
        setLimit(data?.data?.limit);
    };
    useEffect(() => {
        fetchData();
        setIsAllSelected(false);
        setSelectedUsers([]);
    }, [
        currentPage,
        sort,
        debounceSearch,
        limit,
        searchOn,
        userType,
        status,
    ]);
    useEffect(() => {
        if (!userData?.data) return;

        const selectableUsers = userData.data
            .filter((item: { user_role: { role: { role: string; }; }; }) => item?.user_role?.role?.role !== Roles.Admin)
            .map((item: { id: string; }) => item.id);

        if (selectedUsers.length === 0) {
            setIsAllSelected(false);
        } else if (
            selectedUsers.length === selectableUsers.length &&
            selectableUsers.length > 0
        ) {
            setIsAllSelected(true);
        } else if (
            selectedUsers.length > 0 &&
            selectedUsers.length < selectableUsers.length
        ) {
            setIsAllSelected('partial');
        } else {
            setIsAllSelected(false);
        }
    }, [selectedUsers, userData?.data]);

    const handleViewUser = (user: User) => {

        if (user.is_profile_created === false || isDeletedUser) {
            return (
                <div className="flex gap-2">
                    {isAdmin && !isDeletedUser ? (
                        <Button
                            className="action-button blue"
                            onClickHandler={(e) => {
                                e.stopPropagation();
                                navigate(`/admin/manage-users/${user.id}/edit`);
                            }}
                            tooltipText='Edit'
                            tooltipPosition="right"
                        >
                            <Image iconName="editPen" />
                        </Button>
                    ) : null}
                </div>
            );
        }
        return (
            <div className="flex gap-2">
                {isAdmin ? (
                    <Button
                        className="action-button blue"
                        onClickHandler={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/manage-users/${user.id}/edit`);
                        }}
                        tooltipText='Edit'
                        tooltipPosition="right"
                    >
                        <Image iconName="editPen" />
                    </Button>
                ) : null}
            </div>
        );
    };

    const handleRowClick = (user: User) => {
        const deletedExp = `?isDeletedUser=${isDeletedUser}`;
        if (user.is_profile_created !== false && !isDeletedUser) {
            navigate(
                `/admin/manage-users/${user.id}/${user?.role?.role?.trim()?.toLowerCase()}${isDeletedUser ? deletedExp : ''}
        `?.trim()
            );
        }
    };

    const renderOrganizationData = (organizations: Organization[]) => {
        if (!organizations || !Array.isArray(organizations) || organizations.length === 0) {
            return '-';
        }
        if (organizations.length > 1) {
            return `${organizations[0]?.organizationInfo?.full_name} +${organizations.length - 1} more`;
        }
        return organizations[0]?.organizationInfo?.full_name ?? '-';
    };

    const renderSwitches = (user: User) => {
        if (user.is_profile_created === false) {
            return <label className="text-orange-300">Invited</label>;
        }
        return (
            <label className="relative inline-flex items-center cursor-pointer">
                <Switch
                    checked={user.is_active ?? false}
                    onClickHandler={(e) => {
                        e.stopPropagation();
                    }}
                    onChangeHandler={() => handleSwitchChanges(user)}
                    tooltipText={
                        !user.is_active
                            ? 'InActive'
                            : 'Active'
                    }
                    tooltipPosition="left"
                />
            </label>
        );
    };

    const handleSwitchChanges = async (user: User) => {
        const previousState = userData;
        setUserData((prev: any) => {
            const data =
                prev?.data?.map((item: { id: string; }) => {
                    if (user.id === item.id) {
                        return { ...item, is_active: !user.is_active };
                    }
                    return item;
                }) ?? [];

            return { ...prev, data };
        });
        const data = {
            status: user.is_active ? StatusEnum.INACTIVE : StatusEnum.ACTIVE,
        };
        const { error } = await updateUser(`/users/${user.id}/update`, data);

        if (error) {
            setUserData(previousState);
        }
    };

    const handleDeleteUser = async () => {
        const { error } = await deleteUser('/admin/delete-user', {
            params: {
                user_id: selectedUsers.join(','),
            },
        });
        if (!error) {
            const data =
                userData?.data?.filter((item: { id: string; }) => !selectedUsers.includes(item.id)) ?? [];
            setUserData((prev: any) => ({ ...prev, data }));
            setSelectedUsers([]);
        }
        deleteUserModal.closeModal();
        setIsAllSelected(false);
        fetchData();
    };

    const handleSelectAll = () => {
        const userIds =
            userData?.data
                ?.filter((item: { user_role: { role: { role: string; }; }; }) => item?.user_role?.role?.role !== Roles.Admin)
                .map((item: { id: string; }) => item.id) ?? [];

        if (selectedUsers.length > 0) {
            setSelectedUsers([]);
            setIsAllSelected(false);
        } else {
            setSelectedUsers(userIds);
            setIsAllSelected(true);
        }
    };

    const handleCheckBox = (user: User) => {
        return (
            <Checkbox
                value={user.id}
                check={Boolean(selectedUsers.find((item) => item === user.id))}
                disabled={isDeletedUser || user.role?.role === Roles.Admin}
                onChange={(e) => {
                    if (e.target.checked) {
                        setSelectedUsers((prev) => [...prev, user.id]);
                    } else {
                        const disSelectedUser = selectedUsers.filter((item) => item !== user.id);
                        setSelectedUsers(disSelectedUser);
                        setIsAllSelected(false);
                    }
                }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            />
        );
    };

    const columnData: ITableHeaderProps[] = [
        ...(isDeletedUser
            ? []
            : [
                {
                    header: '',
                    isCheckBox: true,
                    cell: (props: CellProps) => handleCheckBox(props as unknown as User),
                    cellClasses: '!max-w-[10px] !w-[10px]',
                    childClassName: '!max-w-[10px]',
                },
            ]),
        {
            header: 'No',
            name: 'no',
            option: {
                isIndex: true,
            },
            cellClasses: '!max-w-[50px] !w-[50px]',
            childClassName: '!max-w-[50px]',
        },
        {
            header: 'Name',
            name: 'first_name',
            cell: (props: any) => {
                const userData = !!isDeletedUser && props?.deleted_metadata
                    ? {
                        first_name: props.deleted_metadata?.first_name,
                        last_name: props.deleted_metadata?.last_name,
                        profile_image: props.profile_image,
                    }
                    : (props as User);

                return (
                    <div className="flex items-center gap-2">
                        <UserProfile />
                        <span>{userData.first_name} {userData.last_name}</span>
                    </div>
                );
            },
            option: {
                sort: true,
                hasFilter: false,
            },
            cellClasses: '!w-[25%] !min-w-[175px]',
        },
        {
            header: 'Email',
            name: isDeletedUser ? 'old_email' : 'email',
            option: {
                sort: true,
            },
            cell: (props) => {
                const email = isDeletedUser ? props.old_email : props.email;
                if (email) {
                    return <EmailRender email={email} />;
                }
                return '-';
            },
            cellClasses: '!w-[30%]',
        },
        {
            header: 'UserType',
            name: 'role.role',
            isToolTips: true,
            cellClasses: '!w-[10%] !min-w-[100px]',
        },
        {
            header: 'Organization',
            name: 'member_of_organizations',
            cell: (props) =>
                renderOrganizationData((props as unknown as User).member_of_organizations),
            isToolTips: true,
            cellClasses: '!w-[15%] !min-w-[150px]',
        },
        ...(!isDeletedUser
            ? [
                {
                    header: 'Status',
                    cell: (props: CellProps) => renderSwitches(props as unknown as User),
                    cellClasses: '!w-[40px]',
                },
            ]
            : [
                {
                    header: 'DeletedAt',
                    name: 'deleted_at',
                    cell: (props: CellProps) =>
                        format(
                            new Date(props.deleted_at),
                            `${VITE_DATE_FORMAT} hh:mm:ss a`
                        ),
                },
            ]),
        {
            header: 'View User',
            cell: (props) => handleViewUser(props as unknown as User),
            cellClasses: '!w-[5%]',
        },
    ];

    return (
        <>
            {selectedUsers.length > 0 && (
                <div className="bulk-select-bar">
                    <span className="bulk-select-count">
                        {selectedUsers.length} Users selected
                    </span>

                    <Button onClickHandler={() => deleteUserModal.openModal()}>
                        Delete
                    </Button>
                </div>
            )}
            <Table
                tableHeightClassName={`${!isDeletedUser ? 'max-h-[calc(100dvh_-_370px)]' : ' max-h-[calc(100dvh_-_278px)]'} !md:overflow-x-hidden`}
                headerData={columnData}
                loader={apiLoading}
                bodyData={userData?.data ?? []}
                pagination
                dataPerPage={limit}
                setLimit={setLimit}
                totalPage={userData?.lastPage ?? 0}
                dataCount={userData?.count ?? 0}
                setSort={setSort}
                sort={sort}
                handleSelectAll={() => {
                    if (!isDeletedUser) {
                        handleSelectAll();
                    }
                }}
                isAllSelected={isAllSelected}
                tableRowClick={handleRowClick}
            />

            <ConfirmationPopup
                modal={deleteUserModal}
                cancelButtonFunction={() => {
                    deleteUserModal.closeModal();
                }}
                deleteTitle='Delete User'
                bodyText="Are you sure you want to delete this user ?"
                cancelButtonText='Cancel'
                confirmButtonText='Delete'
                confirmButtonFunction={handleDeleteUser}
                isLoading={isDeleteUserLoading}
            />
        </>
    );
};

export default UserList;
