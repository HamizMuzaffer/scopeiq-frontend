'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setAccessToken,
  setSession,
  logout as logoutAction,
  setLoading,
  updateUser,
} from '@/store/slices/authSlice';
import { authService } from '../services/authService';
import { User, UserRole } from '../types';
import { AUTH_ROUTES, USER_ROLES } from '../constants';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkEmail: (email: string) => Promise<{ exists: boolean }>;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, code: string) => Promise<{ tempToken: string }>;
  setPassword: (email: string, password: string, tempToken: string, fullName?: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  uploadAvatar: (file: File) => Promise<string>;
  completeProfile: (username: string, role: 'client' | 'project_manager') => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { user, accessToken, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  // Silent session restoration on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        // Request new access token from refresh cookie
        const res = await axios.post<{ accessToken: string }>(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const { accessToken } = res.data;

        // Set access token in Redux store
        dispatch(setAccessToken(accessToken));

        // Fetch user info using the retrieved token
        const currentUser = await authService.fetchCurrentUser();
        dispatch(setSession({ user: currentUser, accessToken }));
      } catch (err: unknown) {
        dispatch(logoutAction());
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkSession();
  }, [dispatch]);

  const checkEmail = async (email: string) => {
    return authService.checkEmail(email);
  };

  const sendOtp = async (email: string) => {
    await authService.sendOtp(email);
  };

  const verifyOtp = async (email: string, code: string) => {
    return authService.verifyOtp(email, code);
  };

  const setPassword = async (
    email: string,
    password: string,
    tempToken: string,
    fullName?: string
  ): Promise<User> => {
    const data = await authService.setPassword(email, password, tempToken, fullName);
    dispatch(setSession(data));
    return data.user;
  };

  const login = async (email: string, password: string): Promise<User> => {
    const data = await authService.login(email, password);
    dispatch(setSession(data));
    return data.user;
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    const data = await authService.uploadAvatar(file);
    if (user) {
      dispatch(updateUser({ ...user, avatarUrl: data.avatarUrl }));
    }
    return data.avatarUrl;
  };

  const completeProfile = async (
    username: string,
    role: 'client' | 'project_manager'
  ): Promise<User> => {
    const data = await authService.completeProfile(username, role);
    dispatch(setSession(data));
    return data.user;
  };

  const logout = async () => {
    dispatch(setLoading(true));
    try {
      await authService.logout();
    } catch (err: unknown) {
      // Ignore network error on logout
    } finally {
      dispatch(logoutAction());
      router.push(AUTH_ROUTES.SIGNIN);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        checkEmail,
        sendOtp,
        verifyOtp,
        setPassword,
        login,
        uploadAvatar,
        completeProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ── Routing Guards ────────────────────────────────────────────────────────────

interface GuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

/**
 * Route guard that requires the user to be authenticated.
 * Redirects to sign-in page if user is not authenticated.
 */
export function ProtectedRoute({ children, allowedRoles }: GuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(AUTH_ROUTES.SIGNIN);
      } else if (user) {
        if (!user.isProfileCompleted && pathname !== AUTH_ROUTES.COMPLETE_PROFILE && pathname !== AUTH_ROUTES.SELECT_ROLE) {
          router.push(AUTH_ROUTES.SELECT_ROLE);
        } else if (allowedRoles && !allowedRoles.includes(user.role)) {
          // Redirect unauthorized role to their respective home dashboard
          router.push(
            user.role === USER_ROLES.PROJECT_MANAGER
              ? AUTH_ROUTES.PM_DASHBOARD
              : AUTH_ROUTES.CLIENT_DASHBOARD
          );
        }
      }
    }
  }, [isAuthenticated, isLoading, user, router, allowedRoles, pathname]);

  if (isLoading || !isAuthenticated || (user && !user.isProfileCompleted && pathname !== AUTH_ROUTES.COMPLETE_PROFILE && pathname !== AUTH_ROUTES.SELECT_ROLE)) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
          <span className="text-[13px] uppercase tracking-widest text-[var(--on-surface-variant)]">Loading intelligence...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Route guard for guests (unauthenticated users).
 * Redirects to appropriate dashboard if user is already logged in.
 */
export function GuestRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (!user.isProfileCompleted) {
        router.push(AUTH_ROUTES.SELECT_ROLE);
      } else {
        router.push(
          user.role === USER_ROLES.PROJECT_MANAGER
            ? AUTH_ROUTES.PM_DASHBOARD
            : AUTH_ROUTES.CLIENT_DASHBOARD
        );
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
          <span className="text-[13px] uppercase tracking-widest text-[var(--on-surface-variant)]">Synthesizing environment...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
