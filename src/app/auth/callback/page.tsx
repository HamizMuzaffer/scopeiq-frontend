'use client';

import React, { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { setAccessToken, setSession } from '@/store/slices/authSlice';
import { authService } from '@/modules/auth/services/authService';
import { AUTH_ROUTES, USER_ROLES } from '@/modules/auth/constants';
import { toast } from 'sonner';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get('accessToken');
    if (token) {
      const handleCallback = async () => {
        try {
          // Temporarily set access token to allow fetchCurrentUser to succeed
          dispatch(setAccessToken(token));
          
          const currentUser = await authService.fetchCurrentUser();
          dispatch(setSession({ user: currentUser, accessToken: token }));
          
          toast.success('Successfully authenticated with Google!');

          if (!currentUser.isProfileCompleted) {
            router.push(AUTH_ROUTES.SELECT_ROLE);
          } else {
            router.push(
              currentUser.role === USER_ROLES.PROJECT_MANAGER
                ? AUTH_ROUTES.PM_DASHBOARD
                : AUTH_ROUTES.CLIENT_DASHBOARD
            );
          }
        } catch (err: unknown) {
          toast.error('Google authentication failed. Please sign in again.');
          router.push(AUTH_ROUTES.SIGNIN);
        }
      };
      handleCallback();
    } else {
      router.push(AUTH_ROUTES.SIGNIN);
    }
  }, [searchParams, dispatch, router]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
      <span className="text-[13px] uppercase tracking-widest text-[var(--on-surface-variant)] font-mono">Authenticating with Google...</span>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center">
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
            <span className="text-[13px] uppercase tracking-widest text-[var(--on-surface-variant)] font-mono">Loading Callback...</span>
          </div>
        }
      >
        <CallbackContent />
      </Suspense>
    </div>
  );
}
