"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AuthShell } from "@/components/shared/layout/AuthShell";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { useRouter } from "next/navigation";

export function VerifyEmailPage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [secs, setSecs] = useState(179);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (secs <= 0) return;
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const filled = digits.every((d) => d.length === 1);

  const set = (i: number, v: string) => {
    const ch = v.slice(-1).replace(/\D/g, "");
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    if (ch && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <AuthShell
      leftPanel={
        <>
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
        </>
      }
    >
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
              20%
            </span>
          </div>
          <div className="h-1 w-full bg-[var(--surface-container-high)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "20%" }}
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
              alex@enterprise.com
            </span>
            . Please enter it below to continue.
          </p>
        </div>
        <div className="flex justify-between gap-2 md:gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digits[i] && i > 0)
                  refs.current[i - 1]?.focus();
              }}
              inputMode="numeric"
              maxLength={1}
              className="otp-input w-12 h-16 md:w-14 md:h-20 bg-[var(--surface-container)]/60 backdrop-blur border border-[var(--line)] rounded-lg text-center text-headline-lg font-semibold text-[var(--primary)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/30 focus:outline-none transition-all"
            />
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={!filled}
          className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 group uppercase tracking-wider text-sm transition-all ${
            filled
              ? "bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110 iq-glow"
              : "bg-[var(--primary)]/40 text-[var(--on-primary)]/60 cursor-not-allowed"
          }`}
        >
          Verify Code{" "}
          <MaterialIcon
            name="arrow_forward"
            className="group-hover:translate-x-1 transition-transform"
          />
        </motion.button>
        <div className="flex items-center justify-between font-mono text-[13px]">
          <span className="text-[var(--on-surface-variant)] flex items-center gap-2">
            <MaterialIcon name="schedule" className="text-sm" /> Code expires in{" "}
            <span className="text-[var(--on-surface)]">
              {mm}:{ss}
            </span>
          </span>
          <button
            disabled={secs > 0}
            onClick={() => setSecs(179)}
            className={`hover:cursor-pointer text-[var(--primary)] ${secs > 0 ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
          >
            Resend Code
          </button>
        </div>
      </motion.div>
    </AuthShell>
  );
}
