'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthShell } from '@/components/shared/layout/AuthShell';
import { MaterialIcon } from '@/components/shared/MaterialIcon';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuth, GuestRoute } from '../context/AuthContext';
import { AUTH_ROUTES } from '../constants';
import { toast } from 'sonner';

const setPasswordSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;

const fieldLabelClassName =
  'font-mono text-[13px] text-[var(--on-surface-variant)] block ml-1 uppercase tracking-widest opacity-70';

const fieldInputClassName =
  'h-auto w-full rounded border border-[var(--line)] bg-[var(--surface-container-lowest)] px-5 py-4 text-body-md shadow-none focus-visible:border-[var(--primary)] focus-visible:ring-1 focus-visible:ring-[var(--primary)]/60';

function SetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const tempToken = searchParams.get('tempToken') || '';
  const { setPassword } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SetPasswordFormValues) => {
    if (!email || !tempToken) {
      toast.error('Verification credentials are missing. Please start again.');
      router.push(AUTH_ROUTES.SIGNIN);
      return;
    }
    setSubmitting(true);
    try {
      await setPassword(email, values.password, tempToken, values.fullName);
      toast.success('Account created successfully!');
      router.push(AUTH_ROUTES.SELECT_ROLE);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to establish security credentials.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm space-y-10"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[13px] text-[var(--on-surface-variant)] uppercase tracking-widest">
            Verification Progress
          </span>
          <span className="font-mono text-[13px] text-[var(--primary)]">
            60%
          </span>
        </div>
        <div className="h-1 w-full bg-[var(--surface-container-high)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ duration: 1 }}
            className="h-full bg-[var(--primary)]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-sans font-semibold">Set Password</h2>
        <p className="text-lg text-[var(--on-surface-variant)]">
          Complete your account setup details
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-6">
          <Field className="gap-2">
            <FieldLabel htmlFor="fullName" className={fieldLabelClassName}>
              Full Name
            </FieldLabel>
            <Input
              id="fullName"
              type="text"
              disabled={submitting}
              {...register('fullName')}
              placeholder="Alex Sterling"
              className={fieldInputClassName}
            />
            {errors.fullName && (
              <span className="text-xs text-[var(--error)] font-mono mt-1 ml-1">
                {errors.fullName.message}
              </span>
            )}
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="password" className={fieldLabelClassName}>
              Password
            </FieldLabel>
            <Input
              id="password"
              type="password"
              disabled={submitting}
              {...register('password')}
              placeholder="Create a strong password"
              className={fieldInputClassName}
            />
            {errors.password && (
              <span className="text-xs text-[var(--error)] font-mono mt-1 ml-1">
                {errors.password.message}
              </span>
            )}
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="confirmPassword" className={fieldLabelClassName}>
              Confirm Password
            </FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              disabled={submitting}
              {...register('confirmPassword')}
              placeholder="Repeat your password"
              className={fieldInputClassName}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-[var(--error)] font-mono mt-1 ml-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </Field>
        </FieldGroup>

        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={submitting}
            className="hover:cursor-pointer group h-auto w-full rounded bg-[var(--primary)] py-4 font-mono text-[13px] text-[var(--on-primary)] hover:bg-[var(--primary)] hover:brightness-110 iq-glow"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-[var(--on-primary)] border-t-transparent rounded-full animate-spin mr-2 inline-block" />
            ) : null}
            COMPLETE SIGNUP{' '}
            <MaterialIcon
              name="arrow_forward"
              className="text-[18px] transition-transform group-hover:translate-x-1"
            />
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export function SetPasswordModule() {
  return (
    <GuestRoute>
      <AuthShell>
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
              <span className="text-[13px] uppercase tracking-widest text-[var(--on-surface-variant)] font-mono">
                Initializing setup data...
              </span>
            </div>
          }
        >
          <SetPasswordContent />
        </Suspense>
      </AuthShell>
    </GuestRoute>
  );
}
