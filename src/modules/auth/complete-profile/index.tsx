"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { AuthShell } from "@/components/shared/layout/AuthShell";
import { useRouter } from "next/navigation";
import { FIELDS } from "./constants";


export function CompleteProfilePage() {
    const router = useRouter();
    return (
        <AuthShell leftPanel={
            <div className="relative z-10 max-w-md">
                <span className="font-mono text-[13px] text-[var(--primary)] tracking-widest uppercase mb-4 block">Onboarding Phase 03</span>
                <h1 className="text-headline-xl font-semibold mb-6">Personalize your intelligence hub.</h1>
                <p className="text-body-lg text-[var(--on-surface-variant)] mb-12">
                    Your profile is the anchor for ScopeIQ's AI governance engine. Setting these details allows us to tailor project insights specifically to your role and organizational hierarchy.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    {[
                        { icon: "verified_user", title: "Identity Secure", body: "End-to-end encrypted profile data." },
                        { icon: "insights", title: "AI-Tailored", body: "Insights adapted to your company size." },
                    ].map((c) => (
                        <div key={c.title} className="iq-glass p-6 rounded-xl">
                            <MaterialIcon name={c.icon} className="text-[var(--primary)] mb-4" filled />
                            <p className="font-mono text-[13px]">{c.title}</p>
                            <p className="text-body-sm text-[var(--on-surface-variant)] mt-2">{c.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        }>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                <div className="text-center md:text-left mb-10">
                    <h2 className="text-headline-lg font-semibold mb-2">Complete Profile</h2>
                    <p className="text-body-md text-[var(--on-surface-variant)]">Tell us who you are to finalize your workspace.</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); router.push("/verify-email"); }} className="space-y-8">
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <label className="font-mono text-[13px] text-[var(--on-surface-variant)]">Profile Photo</label>
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full iq-glass flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:border-[var(--primary)]/60 group-hover:scale-105 iq-glow cursor-pointer">
                                <MaterialIcon name="add_a_photo" className="text-[var(--on-surface-variant)] text-4xl group-hover:text-[var(--primary)] transition-colors" />
                                <input type="file" aria-label="Upload" className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-[var(--primary)] text-[var(--on-primary)] w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--surface)]">
                                <MaterialIcon name="add" className="text-lg" weight={600} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {FIELDS.map((f) => (
                            <div key={f.id} className="space-y-2">
                                <label htmlFor={f.id} className="font-mono text-[13px] text-[var(--on-surface-variant)] ml-1">{f.label}</label>
                                <div className="iq-glass rounded-lg flex items-center px-4 py-3 focus-within:border-[var(--primary)]/60 focus-within:shadow-[0_0_15px_color-mix(in_oklab,var(--primary)_20%,transparent)] transition-all">
                                    <MaterialIcon name={f.icon} className="text-[var(--on-surface-variant)] mr-3" />
                                    <input id={f.id} placeholder={f.placeholder}
                                        className="bg-transparent border-0 focus:ring-0 focus:outline-none w-full text-body-md placeholder:text-[var(--on-surface-variant)]/40" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 space-y-4">
                        <motion.button whileTap={{ scale: 0.98 }} type="submit"
                            className="w-full bg-[var(--primary)] text-[var(--on-primary)] py-4 rounded-lg font-mono text-[13px] font-bold uppercase tracking-wider hover:brightness-110 transition-all iq-glow-strong">
                            Continue
                        </motion.button>
                        <p className="text-center text-body-sm text-[var(--on-surface-variant)]">
                            Step 3 of 3 • <button type="button" onClick={() => router.push("/account-created")} className="text-[var(--primary)] hover:underline font-medium">Skip for now</button>
                        </p>
                    </div>
                </form>
            </motion.div>
        </AuthShell>
    );
}
