"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthShell } from "@/components/shared/layout/AuthShell";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth, GuestRoute } from "../context/AuthContext";
import { AUTH_ROUTES, OTP_EXPIRY_SECONDS } from "../constants";
import { toast } from "sonner";

const otpSchema = z.object({
  code: z.string().length(6, "Verification code must be exactly 6 digits"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { verifyOtp, sendOtp } = useAuth();

  const [secs, setSecs] = useState(OTP_EXPIRY_SECONDS);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (secs <= 0) return;
    const timer = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secs]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  const onSubmit = async (values: OtpFormValues) => {
    if (!email) {
      toast.error("Email address is missing. Please start again.");
      router.push(AUTH_ROUTES.SIGNIN);
      return;
    }
    setSubmitting(true);
    try {
      const { tempToken } = await verifyOtp(email, values.code);
      toast.success("Email verified successfully!");
      router.push(
        `${AUTH_ROUTES.SET_PASSWORD}?email=${encodeURIComponent(email)}&tempToken=${encodeURIComponent(tempToken)}`
      );
    } catch (err: any) {
      const rawMsg = err.response?.data?.message || err.message || "Invalid or expired verification code.";
      const msg = Array.isArray(rawMsg) ? rawMsg.join('. ') : rawMsg;
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await sendOtp(email);
      setSecs(OTP_EXPIRY_SECONDS);
      toast.success("New verification code sent!");
    } catch (err: any) {
      const rawMsg = err.response?.data?.message || err.message || "Failed to resend code.";
      const msg = Array.isArray(rawMsg) ? rawMsg.join('. ') : rawMsg;
      toast.error(msg);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[13px] text-[var(--on-surface-variant)] uppercase tracking-widest">
            Verification Progress
          </span>
          <span className="font-mono text-[13px] text-[var(--primary)]">
            40%
          </span>
        </div>
        <div className="h-1 w-full bg-[var(--surface-container-high)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ duration: 1 }}
            className="h-full bg-[var(--primary)]"
          />
        </div>
      </div>
      <div>
        <h2 className="text-headline-xl font-semibold mb-3 tracking-tight">
          Verify your email
        </h2>
        <p className="text-body-md text-[var(--on-surface-variant)]">
          We've sent a 6-digit verification code to{" "}
          <span className="text-[var(--on-surface)] font-medium">
            {email || "your email"}
          </span>
          . Please enter it below to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center py-2">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
                disabled={submitting}
              >
                <InputOTPGroup className="gap-2 md:gap-3">
                  <InputOTPSlot index={0} className="w-12 h-16 md:w-14 md:h-20 text-headline-lg font-semibold border bg-[var(--surface-container)]/60 text-[var(--primary)] focus-visible:border-[var(--primary)]" />
                  <InputOTPSlot index={1} className="w-12 h-16 md:w-14 md:h-20 text-headline-lg font-semibold border bg-[var(--surface-container)]/60 text-[var(--primary)] focus-visible:border-[var(--primary)]" />
                  <InputOTPSlot index={2} className="w-12 h-16 md:w-14 md:h-20 text-headline-lg font-semibold border bg-[var(--surface-container)]/60 text-[var(--primary)] focus-visible:border-[var(--primary)]" />
                  <InputOTPSlot index={3} className="w-12 h-16 md:w-14 md:h-20 text-headline-lg font-semibold border bg-[var(--surface-container)]/60 text-[var(--primary)] focus-visible:border-[var(--primary)]" />
                  <InputOTPSlot index={4} className="w-12 h-16 md:w-14 md:h-20 text-headline-lg font-semibold border bg-[var(--surface-container)]/60 text-[var(--primary)] focus-visible:border-[var(--primary)]" />
                  <InputOTPSlot index={5} className="w-12 h-16 md:w-14 md:h-20 text-headline-lg font-semibold border bg-[var(--surface-container)]/60 text-[var(--primary)] focus-visible:border-[var(--primary)]" />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!isValid || submitting}
          className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 group uppercase tracking-wider text-sm transition-all ${
            isValid && !submitting
              ? "bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110 iq-glow cursor-pointer"
              : "bg-[var(--primary)]/40 text-[var(--on-primary)]/60 cursor-not-allowed"
          }`}
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-[var(--on-primary)] border-t-transparent rounded-full animate-spin mr-2" />
          ) : null}
          Verify Code{" "}
          <MaterialIcon
            name="arrow_forward"
            className="group-hover:translate-x-1 transition-transform"
          />
        </motion.button>
      </form>

      <div className="flex items-center justify-between font-mono text-[13px]">
        <span className="text-[var(--on-surface-variant)] flex items-center gap-2">
          <MaterialIcon name="schedule" className="text-sm" /> Code expires in{" "}
          <span className="text-[var(--on-surface)]">
            {mm}:{ss}
          </span>
        </span>
        <button
          type="button"
          disabled={secs > 0 || submitting}
          onClick={handleResend}
          className={`hover:cursor-pointer text-[var(--primary)] ${secs > 0 ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
        >
          Resend Code
        </button>
      </div>
    </motion.div>
  );
}

export function VerifyEmailPage() {
  return (
    <GuestRoute>
      <AuthShell
        leftPanel={
          <div className="relative z-10 max-w-lg">
            <h2 className="text-6xl font-bold mb-6 leading-tight">
              Securing the next era of{" "}
              <span className="text-[var(--primary)]">intelligence.</span>
            </h2>
            <p className="text-body-lg text-[var(--on-surface-variant)]">
              Join 500+ enterprises managing complex project governance through
              AI-driven oversight and precision monitoring.
            </p>
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
              <span className="text-[13px] uppercase tracking-widest text-[var(--on-surface-variant)] font-mono">Loading verification info...</span>
            </div>
          }
        >
          <VerifyEmailContent />
        </Suspense>
      </AuthShell>
    </GuestRoute>
  );
}

