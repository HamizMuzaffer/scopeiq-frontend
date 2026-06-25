"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { AuthShell } from "@/components/shared/layout/AuthShell";
import { useAuth, ProtectedRoute } from "../context/AuthContext";
import { FIELDS } from "./constants";
import { AUTH_ROUTES, USER_ROLES, USERNAME_REGEX } from "../constants";
import { toast } from "sonner";

const completeProfileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(USERNAME_REGEX, "Username can only contain letters, numbers, and underscores"),
  company: z.string().optional(),
});

type CompleteProfileFormValues = z.infer<typeof completeProfileSchema>;

function CompleteProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRole = searchParams.get("role") || "";
  const { user, uploadAvatar, completeProfile } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Validate and parse role
  const role =
    rawRole === USER_ROLES.PROJECT_MANAGER
      ? USER_ROLES.PROJECT_MANAGER
      : USER_ROLES.CLIENT;

  // Redirect to select-role if no valid role query parameter is present
  useEffect(() => {
    if (!rawRole || (rawRole !== USER_ROLES.PROJECT_MANAGER && rawRole !== USER_ROLES.CLIENT)) {
      router.push(AUTH_ROUTES.SELECT_ROLE);
    }
  }, [rawRole, router]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      full_name: user?.fullName || "",
      username: user?.username || "",
      company: "",
    },
  });

  // Pre-fill fields if user info is loaded (e.g. from Google OAuth callback)
  useEffect(() => {
    if (user) {
      if (user.fullName) setValue("full_name", user.fullName);
      if (user.username) setValue("username", user.username);
      if (user.avatarUrl) setAvatarUrl(user.avatarUrl);
    }
  }, [user, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl((prevUrl) => {
        if (prevUrl && prevUrl.startsWith("blob:")) {
          URL.revokeObjectURL(prevUrl);
        }
        return URL.createObjectURL(file);
      });
    }
  };

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (avatarUrl && avatarUrl.startsWith("blob:")) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  const onSubmit = async (values: CompleteProfileFormValues) => {
    setSubmitting(true);
    try {
      // 1. Upload Avatar to S3 if a new local file is selected
      if (avatarFile) {
        try {
          await uploadAvatar(avatarFile);
        } catch (uploadErr) {
          toast.error("Failed to upload profile photo. Please try again.");
          setSubmitting(false);
          return;
        }
      }

      // 2. Complete Profile Details (only username and role, to avoid DTO whitelisting errors)
      await completeProfile(values.username, role);
      toast.success("Profile personalization complete!");
      router.push(AUTH_ROUTES.ACCOUNT_CREATED);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to complete profile registration.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="text-center md:text-left mb-10">
        <h2 className="text-4xl font-bold text-primary mb-2">Complete Profile</h2>
        <p className="text-body-md text-(--on-surface-variant)">Tell us who you are to finalize your workspace.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <label className="font-mono text-[13px] text-(--on-surface-variant)">Profile Photo</label>
          <div className="relative group">
            <div className="w-24 h-24 rounded-full iq-glass flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:border-[var(--primary)]/60 group-hover:scale-105 iq-glow cursor-pointer">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <MaterialIcon name="add_a_photo" className="text-(--on-surface-variant) text-4xl group-hover:text-primary transition-colors" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={submitting}
                aria-label="Upload"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[var(--primary)] text-[var(--on-primary)] w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--surface)] pointer-events-none">
              <MaterialIcon name="add" className="text-lg" weight={600} />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {FIELDS.map((f) => (
            <div key={f.id} className="space-y-2">
              <label htmlFor={f.id} className="font-mono text-[13px] text-(--on-surface-variant) ml-1">{f.label}</label>
              <div className="iq-glass rounded-lg flex items-center px-4 py-3 focus-within:border-[var(--primary)]/60 focus-within:shadow-[0_0_15px_color-mix(in_oklab,var(--primary)_20%,transparent)] transition-all">
                <MaterialIcon name={f.icon} className="text-(--on-surface-variant) mr-3" />
                <input
                  id={f.id}
                  placeholder={f.placeholder}
                  disabled={submitting}
                  {...register(f.id as any)}
                  className="bg-transparent border-0 focus:ring-0 focus:outline-none w-full text-body-md placeholder:text-(--on-surface-variant)/40"
                />
              </div>
              {errors[f.id as keyof CompleteProfileFormValues] && (
                <span className="text-xs text-[var(--error)] font-mono ml-1">
                  {errors[f.id as keyof CompleteProfileFormValues]?.message}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="pt-4 space-y-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="hover:cursor-pointer w-full bg-[var(--primary)] text-[var(--on-primary)] py-4 rounded-lg font-mono text-[13px] font-bold uppercase tracking-wider hover:brightness-110 transition-all iq-glow-strong flex items-center justify-center gap-2"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-[var(--on-primary)] border-t-transparent rounded-full animate-spin" />
            ) : null}
            Continue
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export function CompleteProfilePage() {
  return (
    <ProtectedRoute>
      <AuthShell
        leftPanel={
          <div className="relative z-10 max-w-md">
            <h1 className="text-4xl font-bold mb-6">Personalize your intelligence hub.</h1>
            <p className="text-body-lg text-(--on-surface-variant) mb-12">
              Your profile is the anchor for ScopeIQ's AI governance engine. Setting these details allows us to tailor project insights specifically to your role and organizational hierarchy.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "verified_user", title: "Identity Secure", body: "End-to-end encrypted profile data." },
                { icon: "insights", title: "AI-Tailored", body: "Insights adapted to your company size." },
              ].map((c) => (
                <div key={c.title} className="iq-glass p-6 rounded-xl">
                  <MaterialIcon name={c.icon} className="text-primary mb-4" filled />
                  <p className="font-mono text-[13px]">{c.title}</p>
                  <p className="text-body-sm text-(--on-surface-variant) mt-2">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
              <span className="text-[13px] uppercase tracking-widest text-[var(--on-surface-variant)] font-mono">Loading setup parameters...</span>
            </div>
          }
        >
          <CompleteProfileContent />
        </Suspense>
      </AuthShell>
    </ProtectedRoute>
  );
}

