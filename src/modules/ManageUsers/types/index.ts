import { RolesType } from "reduxStore/types";

export interface User {
    full_name: string;
    title?: string;
    id: string;
    first_name?: string;
    email: string;
    profile_image: string | null;
    address?: string | null;
    is_active: boolean | null;
    bio?: string | null;
    video_link?: string | null;
    user_role: {
        role: {
            role: string;
        };
    };
    is_show_profile: boolean | null;
    is_user_banned: boolean;
    is_profile_created?: boolean;
    last_logged_in: string;
    role: {
        role: RolesType;
    };
    isAccountActivated: boolean;
    date_of_birth: Date;
    guardian_confirmation_date: Date;
    organization: Organization | null;
    created_at?: string;
    member_of_organizations: Organization[];
    course_complete?: string;
    viewed_vocab_count?: number;
    duration?: number;
    learned_vocab_count?: number;
    interests?: string[];
    course_users?: {
        id: string;
        course: {
            id: string;
            title: string;
            cover_image: string;
        };
    }[];
    organization_type?: {
        type: string;
    };
    organization_subscription?: {
        id: string;
        subscription_entity: {
            id: string;
            subscription: {
                id: string;
                titl: string;
            };
        };
    }[];
    all_organization?: {
        userDetails: User;
    }[];
    deleted_metadata?: {
        first_name?: string;
        last_name?: string;
    };
    old_email?: string;
    utilized?: boolean;
}

export interface IUserListResponse {
    data?: User[];
    count?: number;
    currentPage?: number;
    limit?: number;
    lastPage?: number;
}

export interface UserListProps {
    search?: string;
    isDeletedUser?: boolean;
    searchOn?: Array<string>;
    isTeacher?: boolean;
    userFetch?: boolean;
    userType?: string;
    status?: string;
    setUserFetch?: React.Dispatch<React.SetStateAction<boolean>>;
    isReport?: boolean;
    isRegionalCenter?: boolean;
    isAdmin?: boolean;
}

export interface Organization {
    id?: string;
    organization_type_id?: string;
    organizationInfo: User;
    organization_type?: {
        id: string;
        type: string;
    };
}