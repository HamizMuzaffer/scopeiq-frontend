import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { LANDING_BRANDS, LANDING_FEATURES, GOVERNANCE_STEPS, LANDING_TESTIMONIALS, LANDING_FAQS } from "../constants/content";

export function SocialProof() {
  return (
    <section className="py-16 border-y border-[var(--on-surface-variant)]/10  bg-[var(--on-surface-variant)]/10">
      <div className="iq-container">
        <p className="text-center font-mono text-[13px] text-primary uppercase tracking-widest mb-10">
          Trusted by next-gen startups
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6 opacity-60">
          {LANDING_BRANDS.map((b) => (
            <span key={b} className="font-[Geist] text-2xl font-bold tracking-tight text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeatureBento() {
  return (
    <section className="py-24  mx-auto max-w-7xl">
      <div className="iq-container">
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Architected for Speed.</h2>
          <p className="text-body-md text-[var(--on-surface-variant)] max-w-xl">
            Everything you need to eliminate uncertainty and keep your projects profitable from inception to delivery.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LANDING_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className={`iq-glass p-8 rounded-3xl group hover:border-[var(--primary)]/50 transition-all duration-300 ${f.span === 2 ? "md:col-span-2" : ""}`}
            >
              {"visual" in f && f.visual === "warning" ? (
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <IconBadge name={f.icon} />
                    <h3 className="text-headline-md font-semibold mb-3">{f.title}</h3>
                    <p className="text-body-md text-[var(--on-surface-variant)]">{f.body}</p>
                  </div>
                  <div className="flex-1 w-full bg-[var(--surface-container)] rounded-2xl p-4 border border-[var(--line)]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-[var(--error)] animate-pulse" />
                      <span className="text-[11px] font-mono">Warning: Unscheduled API Change</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-[var(--line)] rounded-full" />
                      <div className="h-2 w-2/3 bg-[var(--line)] rounded-full" />
                    </div>
                  </div>
                </div>
              ) : "visual" in f && f.visual === "ring" ? (
                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="flex-1">
                    <IconBadge name={f.icon} />
                    <h3 className="text-headline-md font-semibold mb-3">{f.title}</h3>
                    <p className="text-body-md text-[var(--on-surface-variant)]">{f.body}</p>
                  </div>
                  <div className="flex-1 flex justify-center py-4">
                    <RingPercent value={75} />
                  </div>
                </div>
              ) : (
                <>
                  <IconBadge name={f.icon} />
                  <h3 className="text-headline-md font-semibold mb-3">{f.title}</h3>
                  <p className="text-body-md text-[var(--on-surface-variant)]">{f.body}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconBadge({ name }: { name: string }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-6 text-[var(--primary)] group-hover:iq-glow transition-all">
      <MaterialIcon name={name} />
    </div> 
  );
}

function RingPercent({ value }: { value: number }) {
  const offset = 283 - (283 * value) / 100;
  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--line)" strokeWidth="8" />
        <motion.circle
          cx="50" cy="50" r="45" fill="none" stroke="var(--primary)" strokeWidth="8"
          strokeDasharray="283"
          initial={{ strokeDashoffset: 283 }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-headline-md text-[var(--primary)]">{value}%</div>
    </div>
  );
}

export function GovernanceLoop() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="iq-container relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-semibold mb-4">The Governance Loop</h2>
          <p className="text-body-md text-[var(--on-surface-variant)]">A seamless workflow that keeps intelligence at the center.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-12">
          {GOVERNANCE_STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex gap-8 group"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full bg-[var(--surface)] flex items-center justify-center font-bold text-[var(--primary)] z-10 border ${
                    i === 0
                      ? "border-[var(--primary)] shadow-[0_0_15px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
                      : i === 1 ? "border-[var(--primary)]/40" : "border-[var(--primary)]/20"
                  }`}
                >
                  {s.n}
                </div>
                {i < GOVERNANCE_STEPS.length - 1 && (
                  <div className="w-px h-full bg-gradient-to-b from-[var(--primary)]/50 to-transparent" />
                )}
              </div>
              <div className="pb-12">
                <h4 className="text-headline-md font-semibold mb-2">{s.title}</h4>
                <p className="text-body-md text-[var(--on-surface-variant)]">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RiskEngine() {
  return (
    <section className="py-24 bg-[var(--surface-container-low)] overflow-hidden">
      <div className="iq-container">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] font-mono text-[12px] mb-6">
              PROPRIETARY ENGINE
            </div>
            <h2 className="text-3xl font-semibold mb-6 leading-tight">
              Predictive Governance <br />
              <span className="text-[var(--primary)]">Powered by LLMs.</span>
            </h2>
            <p className="text-body-md text-[var(--on-surface-variant)] mb-8">
              ScopeIQ doesn't just track tasks; it understands the semantic meaning of your team's work. By analyzing the intent behind code changes and design iterations, we forecast bottlenecks weeks before they appear.
            </p>
            <ul className="space-y-4">
              {["Semantic Drift Detection", "Probability Weighted Timelines", "Automated Mitigation Strategy"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[var(--on-surface)]">
                  <MaterialIcon name="check_circle" className="text-[var(--primary)] text-xl" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-[var(--primary)]/5 rounded-full blur-3xl" />
            <div className="iq-glass rounded-3xl p-8 relative overflow-hidden h-[400px] flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[var(--primary)]/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--primary)]/20 flex items-center justify-center iq-glow-strong iq-pulse-ring">
                    <MaterialIcon name="psychology" className="text-[var(--primary)] text-3xl" />
                  </div>
                </div>
                {[
                  { pos: "top-10 left-10", icon: "terminal" },
                  { pos: "bottom-10 right-10", icon: "forum" },
                  { pos: "top-1/2 right-4", icon: "task_alt" },
                ].map((n) => (
                  <div key={n.icon} className={`absolute ${n.pos} flex flex-col items-center gap-2`}>
                    <div className="w-10 h-10 rounded-lg bg-[var(--surface-container-high)] border border-[var(--line)] flex items-center justify-center text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">
                      <MaterialIcon name={n.icon} />
                    </div>
                  </div>
                ))}
                <div className="absolute top-1/4 right-1/4 animate-bounce text-xs font-mono text-[var(--primary)]/70">Estimating...</div>
                <div className="absolute bottom-1/3 left-1/4 animate-pulse text-xs font-mono text-[var(--iq-secondary)]/70">Drift Detected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="iq-container">
        <h2 className="text-center text-3xl font-semibold mb-16">Loved by Lead Architects.</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {LANDING_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`iq-glass p-8 rounded-3xl border-l-4 ${t.border === "primary" ? "border-l-[var(--primary)]" : "border-l-[var(--iq-secondary)]"}`}
            >
              <p className="text-body-lg italic mb-8">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--surface-container-high)] flex items-center justify-center text-[var(--primary)] font-bold">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-mono text-[13px] font-bold text-[var(--on-surface)]">{t.name}</p>
                  <p className="text-[11px] text-[var(--on-surface-variant)] uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );    
}

export function Faq() {
  return (
    <section className="py-24 bg-[var(--surface-container-lowest)]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <h2 className="text-3xl font-semibold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {LANDING_FAQS.map((f) => (
            <details key={f.q} className="iq-glass rounded-2xl group">
              <summary className="list-none p-6 flex justify-between items-center cursor-pointer text-headline-md font-semibold">
                {f.q}
                <MaterialIcon name="expand_more" className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-6 pt-0 text-body-md text-[var(--on-surface-variant)]">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingCta() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[var(--primary)]/10 opacity-30 blur-3xl rounded-full scale-50" />
      <div className="iq-container relative z-10 text-center">
        <div className="iq-glass p-12 md:p-16 rounded-[40px] border border-[var(--primary)]/30">
          <h2 className="text-display-lg font-bold mb-6">Stop Reacting. Start Leading.</h2>
          <p className="text-body-lg text-[var(--on-surface-variant)] max-w-xl mx-auto mb-10">
            Join 500+ teams who have eliminated scope drift and increased profitability by 30%.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[var(--primary)] text-[var(--on-primary)] px-10 py-5 rounded-2xl font-bold text-lg iq-glow hover:scale-105 transition-transform">
              Deploy ScopeIQ Now
            </button>
            <button className="iq-glass px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[var(--surface-container)] transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
