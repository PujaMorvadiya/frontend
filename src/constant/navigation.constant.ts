import { FeatureEnum, PermissionEnum } from './common.constant';

// Routes which are publically available will be available here.
export const PUBLIC_NAVIGATION: { [key: string]: string } = Object.freeze({
  home: '/',
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  moviesList: '/movies',
  movieDetails: '/movies/:movieId',
  theatersList: '/theaters',
  theaterDetails: '/theaters/:theaterId',
  somethingWentWrong: '/something-went-wrong',
});

export const UserNavigation = Object.freeze({
  dashboard: {
    view: {
      path: '/user/dashboard',
      feature: FeatureEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  profile: {
    view: {
      path: '/user/profile',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.View,
    },
    edit: {
      path: '/user/profile/edit',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.Update,
    },
  },
  bookings: {
    view: {
      path: '/user/bookings',
      feature: FeatureEnum.Booking,
      permission: PermissionEnum.View,
    },
    details: {
      path: '/user/bookings/:bookingId',
      feature: FeatureEnum.Booking,
      permission: PermissionEnum.View,
    },
  },
  wishlist: {
    view: {
      path: '/user/wishlist',
      feature: FeatureEnum.Wishlist,
      permission: PermissionEnum.View,
    },
  },
  movies: {
    browse: {
      path: '/user/movies',
      feature: FeatureEnum.Movie,
      permission: PermissionEnum.View,
    },
    details: {
      path: '/user/movies/:movieId',
      feature: FeatureEnum.Movie,
      permission: PermissionEnum.View,
    },
  },
  payment: {
    checkout: {
      path: '/user/payment/checkout',
      feature: FeatureEnum.Payment,
      permission: PermissionEnum.Create,
    },
    success: {
      path: '/user/payment/success',
      feature: FeatureEnum.Payment,
      permission: PermissionEnum.View,
    },
    failure: {
      path: '/user/payment/failure',
      feature: FeatureEnum.Payment,
      permission: PermissionEnum.View,
    },
  },
  support: {
    view: {
      path: '/user/support',
      feature: FeatureEnum.Support,
      permission: PermissionEnum.View,
    },
  },
});

export const PRIVATE_NAVIGATION = Object.freeze({
  dashboard: {
    view: {
      path: '/',
      feature: FeatureEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  somethingWentWrong: '/something-went-wrong',
  users: {
    view: {
      path: '/manage-users',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    edit: {
      path: '/manage-users/:id/edit',
      feature: FeatureEnum.User,
      permission: PermissionEnum.Update,
    },
    viewUser: {
      path: '/manage-users/:userId/:role',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/manage-users/add-user',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    add_user: {
      path: '/manage-users/add-users/:role',
      feature: FeatureEnum.User,
      permission: PermissionEnum.Create,
    },
  },
  deletedUser: {
    view: {
      path: '/manage-users/delete_user',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
  },
  profile: {
    view: {
      path: '/profile',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.View,
    },
  },
});

export const AdminNavigation = Object.freeze({
  dashboard: {
    view: {
      path: '/admin/dashboard',
      feature: FeatureEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  manageUsers: {
    list: {
      path: '/admin/users',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    view: {
      path: '/admin/users/:userId',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    edit: {
      path: '/admin/users/:userId/edit',
      feature: FeatureEnum.User,
      permission: PermissionEnum.Update,
    },
    add: {
      path: '/admin/users/add',
      feature: FeatureEnum.User,
      permission: PermissionEnum.Create,
    },
  },
  manageOrganizations: {
    list: {
      path: '/admin/organizations',
      feature: FeatureEnum.Organization,
      permission: PermissionEnum.View,
    },
    view: {
      path: '/admin/organizations/:orgId',
      feature: FeatureEnum.Organization,
      permission: PermissionEnum.View,
    },
    edit: {
      path: '/admin/organizations/:orgId/edit',
      feature: FeatureEnum.Organization,
      permission: PermissionEnum.Update,
    },
    add: {
      path: '/admin/organizations/add',
      feature: FeatureEnum.Organization,
      permission: PermissionEnum.Create,
    },
  },
  manageMovies: {
    list: {
      path: '/admin/movies',
      feature: FeatureEnum.Movie,
      permission: PermissionEnum.View,
    },
    edit: {
      path: '/admin/movies/:movieId/edit',
      feature: FeatureEnum.Movie,
      permission: PermissionEnum.Update,
    },
    add: {
      path: '/admin/movies/add',
      feature: FeatureEnum.Movie,
      permission: PermissionEnum.Create,
    },
  },
  settings: {
    view: {
      path: '/admin/settings',
      feature: FeatureEnum.Setting,
      permission: PermissionEnum.View,
    },
  },
  reports: {
    bookings: {
      path: '/admin/reports/bookings',
      feature: FeatureEnum.Reports,
      permission: PermissionEnum.View,
    },
    users: {
      path: '/admin/reports/users',
      feature: FeatureEnum.Reports,
      permission: PermissionEnum.View,
    },
  },
  profile: {
    view: {
      path: '/admin/profile',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.View,
    },
    edit: {
      path: '/admin/profile/edit',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.Update,
    },
  },
});

export const OrganizationNavigation = Object.freeze({
  dashboard: {
    view: {
      path: '/org/dashboard',
      feature: FeatureEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  manageMovies: {
    list: {
      path: '/org/movies',
      feature: FeatureEnum.Movie,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/org/movies/add',
      feature: FeatureEnum.Movie,
      permission: PermissionEnum.Create,
    },
    edit: {
      path: '/org/movies/edit/:movieId',
      feature: FeatureEnum.Movie,
      permission: PermissionEnum.Update,
    },
    view: {
      path: '/org/movies/:movieId',
      feature: FeatureEnum.Movie,
      permission: PermissionEnum.View,
    },
  },
  manageShows: {
    list: {
      path: '/org/shows',
      feature: FeatureEnum.Show,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/org/shows/add',
      feature: FeatureEnum.Show,
      permission: PermissionEnum.Create,
    },
    edit: {
      path: '/org/shows/edit/:showId',
      feature: FeatureEnum.Show,
      permission: PermissionEnum.Update,
    },
    view: {
      path: '/org/shows/:showId',
      feature: FeatureEnum.Show,
      permission: PermissionEnum.View,
    },
  },
  manageBookings: {
    view: {
      path: '/org/bookings',
      feature: FeatureEnum.Booking,
      permission: PermissionEnum.View,
    },
    details: {
      path: '/org/bookings/:bookingId',
      feature: FeatureEnum.Booking,
      permission: PermissionEnum.View,
    },
  },
  profile: {
    view: {
      path: '/org/profile',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.View,
    },
    edit: {
      path: '/org/profile/edit',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.Update,
    },
  },
});
