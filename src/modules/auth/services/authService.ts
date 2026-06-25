import { api } from '@/lib/api';
import {
  AuthResponse,
  CheckEmailResponse,
  OtpResponse,
  VerifyOtpResponse,
  AvatarUploadResponse,
  UsernameAvailabilityResponse,
  User,
} from '../types';

export const authService = {
  checkEmail: async (email: string): Promise<CheckEmailResponse> => {
    const response = await api.post<CheckEmailResponse>('/auth/check-email', { email });
    return response.data;
  },

  sendOtp: async (email: string): Promise<OtpResponse> => {
    const response = await api.post<OtpResponse>('/auth/send-otp', { email });
    return response.data;
  },

  verifyOtp: async (email: string, code: string): Promise<VerifyOtpResponse> => {
    const response = await api.post<VerifyOtpResponse>('/auth/verify-otp', { email, code });
    return response.data;
  },

  setPassword: async (
    email: string,
    password: string,
    tempToken: string,
    fullName?: string
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/set-password', {
      email,
      password,
      tempToken,
      fullName,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  uploadAvatar: async (file: File): Promise<AvatarUploadResponse> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post<AvatarUploadResponse>('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  completeProfile: async (
    username: string,
    role: 'client' | 'project_manager'
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/users/complete-profile', {
      username,
      role,
    });
    return response.data;
  },

  checkUsername: async (username: string): Promise<UsernameAvailabilityResponse> => {
    const response = await api.get<UsernameAvailabilityResponse>(`/users/check-username/${username}`);
    return response.data;
  },

  fetchCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
export type AuthService = typeof authService;
