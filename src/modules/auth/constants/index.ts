export const AUTH_ROUTES = {
  SIGNIN: '/signin',
  SELECT_ROLE: '/select-role',
  COMPLETE_PROFILE: '/complete-profile',
  VERIFY_EMAIL: '/verify-email',
  SET_PASSWORD: '/set-password',
  ACCOUNT_CREATED: '/account-created',
  PM_DASHBOARD: '/pm-dashboard',
  CLIENT_DASHBOARD: '/client-dashboard',
} as const;

export const USER_ROLES = {
  CLIENT: 'client',
  PROJECT_MANAGER: 'project_manager',
  ADMIN: 'admin',
} as const;

export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export const OTP_EXPIRY_SECONDS = 179; // 3 minutes for OTP verification countdown
