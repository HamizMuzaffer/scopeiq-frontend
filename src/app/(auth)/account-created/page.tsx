"use client"
import { motion } from "framer-motion";
import { useMemo } from "react";
import { AuthShell } from "@/components/shared/layout/AuthShell";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import Link from "next/link";
import Image from "next/image";

export default function AccountCreatedPage() {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, () => ({
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      dur: Math.random() * 10 + 10,
      delay: -Math.random() * 20,
    })), []);

  return (
    <AuthShell fullBleed>
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((p, i) => (
          <span key={i} className="absolute rounded-full bg-[var(--primary)] blur-[2px]"
            style={{
              width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`,
              animation: `iq-float ${p.dur}s linear infinite`, animationDelay: `${p.delay}s`, opacity: 0.4,
            }} />
        ))}
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full iq-glow-pulse-anim z-0" />

      <main className="relative z-10 w-full max-w-2xl mx-auto min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="relative mb-12">
          <div className="relative flex items-center justify-center">
            <Image src="/logo.png" alt="ScopeIQ Logo" width={96} height={96} className="w-16 h-16 md:w-24 md:h-24 object-contain" />
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-3xl font-semibold tracking-tight mb-4">
          Account successfully created
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-body-lg text-[var(--on-surface-variant)] max-w-md mb-16">
          Welcome to the future of project intelligence. Your workspace is ready for takeoff.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Link href="/"
            className="group relative inline-flex items-center justify-center px-12 py-5 text-headline-md font-semibold text-[var(--on-primary)] bg-[var(--primary)] shadow-[0_10px_40px_color-mix(in_oklab,var(--primary)_25%,transparent)] hover:shadow-[0_15px_60px_color-mix(in_oklab,var(--primary)_40%,transparent)] transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative flex items-center gap-2">
              Go To Dashboard <MaterialIcon name="arrow_forward" className="text-[24px]" />
            </span>
          </Link>
        </motion.div>
      </main>
    </AuthShell>
  );
}
