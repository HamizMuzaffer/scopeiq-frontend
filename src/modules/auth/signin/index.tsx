"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthShell } from "@/components/shared/layout/AuthShell";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth, GuestRoute } from "../context/AuthContext";
import { AUTH_ROUTES } from "../constants";
import { toast } from "sonner";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid work email address"),
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid work email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const fieldLabelClassName =
  "font-mono text-[13px] text-[var(--on-surface-variant)] block ml-1 uppercase tracking-widest opacity-70";

const fieldInputClassName =
  "h-auto w-full rounded border border-[var(--line)] bg-[var(--surface-container-lowest)] px-5 py-4 text-body-md shadow-none focus-visible:border-[var(--primary)] focus-visible:ring-1 focus-visible:ring-[var(--primary)]/60";

type SignInFormValues = {
  email: string;
  password?: string;
};

export function SignInModule() {
  const router = useRouter();
  const { checkEmail, sendOtp, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(showPassword ? loginSchema : emailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: { email: string; password?: string }) => {
    setSubmitting(true);
    try {
      if (!showPassword) {
        const { exists } = await checkEmail(values.email);
        if (exists) {
          setShowPassword(true);
          toast.success("Welcome back! Please enter your password to log in.");
        } else {
          await sendOtp(values.email);
          toast.success("Verification code sent! Please check your email inbox.");
          router.push(`${AUTH_ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(values.email)}`);
        }
      } else {
        if (!values.password) {
          toast.error("Password is required.");
          return;
        }
        await login(values.email, values.password);
        toast.success("Logged in successfully!");
      }
    } catch (err: any) {
      const rawMsg = err.response?.data?.message || err.message || "An authentication error occurred.";
      const msg = Array.isArray(rawMsg) ? rawMsg.join('. ') : rawMsg;
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <GuestRoute>
      <AuthShell>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-sans font-semibold">Welcome to ScopeIQ</h2>
            <p className="text-lg text-[var(--on-surface-variant)]">
              {showPassword ? "Enter your password to sign in" : "Enter your email to continue"}
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-6">
              <Field className="gap-2">
                <FieldLabel htmlFor="email" className={fieldLabelClassName}>
                  Work Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  disabled={showPassword || submitting}
                  {...register("email")}
                  placeholder="name@company.com"
                  className={fieldInputClassName}
                />
                {errors.email && (
                  <span className="text-xs text-[var(--error)] font-mono mt-1 ml-1">{errors.email.message}</span>
                )}
              </Field>
              {showPassword && (
                <Field className="gap-2">
                  <FieldLabel htmlFor="password" className={fieldLabelClassName}>
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    disabled={submitting}
                    {...register("password")}
                    placeholder="Enter your password"
                    className={fieldInputClassName}
                  />
                  {errors.password && (
                    <span className="text-xs text-[var(--error)] font-mono mt-1 ml-1">{errors.password.message}</span>
                  )}
                </Field>
              )}
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
                {showPassword ? "SIGN IN" : "CONTINUE"}{" "}
                <MaterialIcon
                  name="arrow_forward"
                  className="text-[18px] transition-transform group-hover:translate-x-1"
                />
              </Button>
            </motion.div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--line)]" /></div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-widest">
              <span className="bg-[var(--surface)] px-4 text-[var(--on-surface-variant)]/60">or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={submitting}
              className="hover:cursor-pointer flex items-center justify-center gap-3 bg-[var(--surface-container-lowest)] border border-[var(--line)] py-3 rounded hover:bg-[var(--surface-container-low)] transition-colors"
            >
              <MaterialIcon name="g_translate" className="text-[18px]" />
              <span className="font-mono text-[12px] uppercase">Google</span>
            </button>
          </div>
        </motion.div>
      </AuthShell>
    </GuestRoute>
  );
}

