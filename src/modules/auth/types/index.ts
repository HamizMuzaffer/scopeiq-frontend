export type UserRole = 'client' | 'project_manager' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  username: string | null;
  avatarUrl: string | null;
  isProfileCompleted: boolean;
  role: UserRole;
  provider: 'local' | 'google';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface CheckEmailResponse {
  exists: boolean;
}

export interface OtpResponse {
  message: string;
}

export interface VerifyOtpResponse {
  tempToken: string;
}

export interface AvatarUploadResponse {
  avatarUrl: string;
}

export interface UsernameAvailabilityResponse {
  available: boolean;
}
