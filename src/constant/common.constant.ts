export const ToastVariant = {
  SUCCESS: 'Success',
  ERROR: 'Error',
  WARNING: 'Warning',
};

export const Roles = Object.freeze({
  Admin: 'Admin',
  Organization: 'Organization',
  User: 'User',
});

export enum OrganizationTypeEnum {
  CORPORATION = 'Corporation',
  NON_PROFIT = 'Non-Profit',
  GOVERNMENT = 'Government',
  EDUCATIONAL = 'Educational',
  HOSPITAL = 'Hospital',
  TECHNOLOGY = 'Technology',
  FINANCIAL = 'Financial',
  RETAIL = 'Retail',
  CONSULTING = 'Consulting',
  STARTUP = 'Start-up',
}

export enum FeatureEnum {
  Permission = 'Permission',
  RolePermission = 'RolePermission',
  Feature = 'Feature',
  Role = 'Role',
  User = 'User',
  Users = 'Users',
  Profile = 'Profile',
  Dashboard = 'Dashboard',
  DashboardMatrices = 'DashboardMatrices',
  Movie = 'Movie',
  Support = 'Support',
  Booking = 'Booking',
  Seat = 'Seat',
  SeatLayout = 'SeatLayout',
  Ticket = 'Ticket',
  Show = 'Show',
  Payment = 'Payment',
  Transaction = 'Transaction',
  Wallet = 'Wallet',
  Notification = 'Notification',
  Chat = 'Chat',
  Admin = 'Admin',
  Organization = 'Organization',
  Reports = 'Reports',
  Analytics = 'Analytics',
  Setting = 'Setting',
  AuditLog = 'AuditLog',
  Wishlist = 'Wishlist',
  Calendar = 'Calendar'
}

export const PermissionEnum = {
  Update: 'Update',
  Delete: 'Delete',
  Create: 'Create',
  View: 'View',
};

export const DurationLogs = [
  { value: 'all', label: 'All' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last_seven_days', label: 'Last 7 Days' },
  { value: 'last_thirty_days', label: 'Last 30 Days' },
  { value: 'this_week', label: 'This Week' },
  { value: 'last_week', label: 'Last Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_three_months', label: 'Last 3 Months' },
];

export const LayoutConstant = {
  ...Roles,
  ADMIN_USER: 'ADMIN-USER',
};

export const statusFilter = [
  { value: 'all', label: 'All' },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'inactive',
    label: 'Inactive',
  },
];

export enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}