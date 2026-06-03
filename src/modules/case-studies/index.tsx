"use client"
import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { CONTRAST } from "./constants/index";
import  Card  from "./components/CaseCard";


export function CaseStudiesModule() {
  return (
      <div className="iq-container py-12 md:py-20">
        <header className="mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 mb-6">
            <MaterialIcon name="verified" className="text-[16px] text-[var(--primary)]" />
            <span className="font-mono text-[13px] text-[var(--primary)]">TRANSFORMING PROJECT GOVERNANCE</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-6xl font-sans font-bold mb-6 leading-none">
            Intelligence in <span className="text-[var(--primary)] italic">Action.</span>
          </motion.h1>
          <p className="text-body-lg text-[var(--on-surface-variant)]">
            Explore how global enterprises use ScopeIQ to eliminate scope drift, optimize resource allocation, and deliver complex projects with 85% higher accuracy.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
          <Card className="md:col-span-8" delay={0}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div>
                <h3 className="font-mono text-[13px] text-[var(--primary)] uppercase tracking-widest mb-2">Enterprise AI Deployment</h3>
                <h2 className="text-4xl font-semibold">Lumina Tech Systems</h2>
              </div>
              <div className="iq-glass rounded-xl p-4 flex flex-col items-end">
                <span className="text-[48px] leading-none font-bold text-[var(--primary)]">85%</span>
                <span className="font-mono text-[13px] text-[var(--on-surface-variant)]">Scope Accuracy</span>
              </div>
            </div>
            <p className="text-body-lg text-[var(--on-surface-variant)] mb-8 max-w-xl relative z-10">
              How a Fortune 500 leader synchronized 12 global teams and reduced developmental drift by 42% in a high-stakes cloud migration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[var(--line)] relative z-10">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[13px] text-[var(--on-surface-variant)]">Project Health</span>
                <div className="flex gap-1">
                  {[1, 1, 1, 0, 0].map((v, i) => <div key={i} className={`h-1 flex-1 rounded-full ${v ? "bg-[var(--primary)]" : "bg-[var(--line)]"}`} />)}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[13px] text-[var(--on-surface-variant)]">Status</span>
                <span className="text-[var(--primary)] font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" /> Optimal
                </span>
              </div>
            </div>
          </Card>

          <Card className="md:col-span-4" delay={0.1}>
            <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-6"><MaterialIcon name="architecture" className="text-[var(--primary)]" /></div>
            <h3 className="font-mono text-[13px] text-[var(--on-surface-variant)] mb-2">Infrastructure</h3>
            <h2 className="text-headline-md font-semibold mb-4">Vertex Urban Design</h2>
            <div className="inline-block px-3 py-1 rounded-lg bg-[var(--primary)]/10 font-mono text-[13px] text-[var(--primary)] mb-6">92% Precision</div>
            <div className="h-24 w-full bg-[var(--surface-container-low)] rounded-xl overflow-hidden flex items-end px-2 gap-1">
              {[40, 55, 45, 70, 85, 95].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.05 }}
                  className="bg-[var(--primary)] w-full rounded-t-sm" style={{ opacity: 0.2 + (i * 0.15) }} />
              ))}
            </div>
          </Card>

          <Card className="md:col-span-4" delay={0.2}>
            <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-6"><MaterialIcon name="biotech" className="text-[var(--primary)]" /></div>
            <h3 className="font-mono text-[13px] text-[var(--on-surface-variant)] mb-2">Bio-Tech Logistics</h3>
            <h2 className="text-headline-md font-semibold mb-4">Aether Genomix</h2>
            <div className="inline-block px-3 py-1 rounded-lg bg-[var(--primary)]/10 font-mono text-[13px] text-[var(--primary)] mb-6">78% Drift Reduction</div>
            <div className="space-y-3">
              <div className="flex justify-between font-mono text-[13px] text-[var(--on-surface-variant)]">
                <span>Efficiency</span>
                <span className="text-[var(--primary)]">+34%</span>
              </div>
              <div className="w-full bg-[var(--line)] h-1.5 rounded-full">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "88%" }} viewport={{ once: true }} transition={{ duration: 1 }}
                  className="bg-[var(--primary)] h-full rounded-full shadow-[0_0_15px_var(--primary)]" />
              </div>
            </div>
          </Card>

          <Card className="md:col-span-8 overflow-hidden" delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-mono text-[13px] text-[var(--on-surface-variant)] mb-2">Financial Systems</h3>
                <h2 className="text-headline-lg font-semibold mb-4">Nexus Capital</h2>
                <p className="text-body-md text-[var(--on-surface-variant)] mb-8">Implementing AI governance across sensitive fintech pipelines without compromising regulatory speed.</p>
              
              </div>
              <div className="rounded-xl bg-gradient-to-br from-[var(--surface-container-high)] to-[var(--surface-container)] min-h-[160px] flex items-center justify-center">
                <MaterialIcon name="account_balance" className="text-[var(--primary)]/50 text-[80px]" />
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">The Drift Eradication</h2>
            <p className="text-body-lg text-[var(--on-surface-variant)] max-w-2xl mx-auto">
              Standard tools react to failures. ScopeIQ prevents them through predictive intelligence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="iq-glass rounded-2xl p-8 relative aspect-square md:aspect-video flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <path d="M 0 150 Q 50 140 100 160 Q 150 180 200 120 Q 250 100 300 140 Q 350 160 400 60" fill="none" stroke="var(--error)" strokeDasharray="4 4" strokeWidth="2" className="opacity-40" />
                <motion.path d="M 0 150 C 50 150 150 145 200 145 C 250 145 350 140 400 140" fill="none" stroke="var(--primary)" strokeWidth="3"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
                <circle cx="400" cy="140" fill="var(--primary)" r="4" />
              </svg>
              <div className="absolute top-6 left-6 font-mono text-[13px] text-[var(--error)]/70">BEFORE: Manual Governance</div>
              <div className="absolute bottom-6 left-6 font-mono text-[13px] text-[var(--primary)]">AFTER: ScopeIQ Intelligence</div>
            </div>
            <div className="space-y-8">
              {CONTRAST.map(([n, t, b]) => (
                <div key={n} className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-full border border-[var(--primary)]/40 flex items-center justify-center text-[var(--primary)] font-bold">{n}</div>
                  <div>
                    <h4 className="text-headline-md font-semibold mb-2">{t}</h4>
                    <p className="text-body-md text-[var(--on-surface-variant)]">{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}


