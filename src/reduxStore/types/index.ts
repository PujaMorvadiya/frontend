export type RolesType = 'Admin' | 'User' | 'Organization';

export type RoleType = {
  id: number;
  name: string;
};

export type PermissionType = {
  id: number;
  name: string;
};

export type RolePermissionType = {
  id: number;
  roleId: string;
  permissionId: string;
  featureId: string;
  feature_name?: string;
  permission_name?: string;
  access: string[];
};

export type RoleSliceType = {
  roles: RoleType[];
  rolePermissions: RolePermissionType[];
  permission: PermissionType[];
  access: string[];
};

export type AccessType = { post: boolean; view_post: boolean; no_access: boolean };

export type AuthUserType = {
  id?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  provider_type?: string;
  email?: string;
  profile_image?: string;
  date_of_birth?: Date;
  video_link?: string;
  date_format?: string;
  is_show_profile?: boolean;
  is_user_banned?: boolean;
  sub?: string;
  bio?: string;
  address?: string;
  asl_level_id?: string;
  interests?: string[];
  role_id: string;
  last_sign_id?: string;
  community_access: AccessType;
  caption_color: string;
  role: {
    role: RolesType;
  };
  userHaveCourse?: boolean;
  organization: OrganizationType;
  referral_link?: string;
  has_dictionary_access?: boolean;
  has_community_access?: boolean;
  member_of_organizations: {
    id: string;
    organizationInfo: {
      first_name: string;
      full_name: string;
      id: string;
      last_name: string;
      profile_image: string;
    };
  }[];
  roles?: {
    id?: string;
    role?: string;
  }[];
  app_initiation_steps?: null | number;
};

export type OrganizationType = {
  id?: string;
  user_id: string;
  organization_type_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  userDetails: Partial<AuthUserType | null>;
  organization_type?: OrganizationTypesTypes;
};

export type OrganizationTypesTypes = {
  id: string;
  type: string;
};

export type AuthSliceType = {
  user?: Partial<AuthUserType | null>;
  isAuthenticated?: boolean;
  organization?: OrganizationType | null;
};

export type PaginationType = {
  currentPage: number;
};

export type ToastSliceType = {
  message: string | null;
  type: string | null;
  id: number;
  variant: string;
};

export type ToastCommonSliceType = {
  toasts: ToastSliceType[];
};

export type TokenSliceType = {
  token?: null | string;
};

export type SideBarType = {
  isSidebarOpen: boolean;
  isSidebarActive: string | null;
  isHeaderActive: string | null;
  activeLayoutType: string;
};
