"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { AuthShell } from "@/components/shared/layout/AuthShell";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROLES } from "./constants";



export function SelectRolePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  return (
    <AuthShell leftPanel={
      <div className="relative z-10 max-w-lg">
        <span className="text-[var(--primary)] font-mono text-4xl font-bold">Intelligent Governance</span>
        <h2 className="text-2xl font-semibold mt-4 mb-6">Elevate your project delivery standards.</h2>
        <p className="text-body-lg text-[var(--on-surface-variant)]">
          ScopeIQ uses AI to synchronize expectations between managers and clients, ensuring transparency at every milestone.
        </p>
        <div className="mt-12 flex items-center gap-4">
          <div className="w-12 h-px bg-[var(--primary)]" />
          <span className="font-mono text-2xl text-[var(--primary)]">Trusted by 200+ Agencies</span>
        </div>
      </div>
    }>
      <div className="w-full max-w-xl">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold mb-2">Choose your workspace</h1>
          <p className="text-body-md text-[var(--on-surface-variant)]">Select the role that best describes your daily activities.</p>
        </header>
        <div className="space-y-4">
          {ROLES.map((r) => {
            const active = selected === r.id;
            return (
              <motion.button
                key={r.id}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelected(r.id)}
                className={`hover:cursor-pointer group relative w-full text-left p-6 md:p-8 rounded-xl border transition-all duration-300 ${active
                  ? "border-[var(--primary)] bg-[var(--surface-container-high)] shadow-[0_0_40px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
                  : "border-[var(--line)] bg-[var(--surface-container-low)] hover:bg-[var(--surface-container)]"
                  }`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg bg-[var(--surface-container-highest)] flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform">
                    <MaterialIcon name={r.icon} className="text-3xl md:text-4xl" />
                  </div>
                  <div className="flex-grow flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-headline-md font-semibold mb-1">{r.title}</h3>
                      <p className="text-body-md text-[var(--on-surface-variant)]">{r.body}</p>
                    </div>
                    {active && (
                      <div className="flex-shrink-0 text-[var(--primary)]">
                        <MaterialIcon name="check_circle" className="text-2xl md:text-3xl" filled />
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/auth/welcome" className="font-mono text-[13px] text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] flex items-center gap-2">
            <MaterialIcon name="arrow_back" className="text-sm" /> Back to Sign In
          </Link>
          <button
            disabled={!selected}
            onClick={() => router.push("/auth/complete-profile")}
            className={`w-full sm:w-auto px-10 py-4 rounded-lg font-semibold transition-all ${selected
              ? "bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110 shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
              : "bg-[var(--primary)]/50 text-[var(--on-primary)] opacity-50 cursor-not-allowed"
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    </AuthShell>
  );
}
