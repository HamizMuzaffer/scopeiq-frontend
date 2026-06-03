"use client";
import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { TEAM, VALUES } from "./constants";



export function AboutModule() {
  return (
      <>
      <section className="pt-24 pb-24 mx-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[13px] text-[var(--primary)] tracking-widest uppercase mb-6 block">
              Our Genesis
            </span>
            <h1 className="font-display text-[clamp(40px,7vw,64px)] font-bold leading-[1.05] tracking-[-0.04em] mb-8">
              Architecting Predictability.
            </h1>
            <p className="text-[18px] leading-relaxed text-[var(--on-surface-variant)] max-w-xl">
              ScopeIQ was born from a singular realization: project failure isn't caused by a lack of effort, but by a lack of visibility. We've built the world's first AI-native governance layer to turn scope drift from an inevitability into a historical footnote.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-[var(--primary)]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative rounded-2xl overflow-hidden border border-[var(--line)] iq-glass">
              <img
                alt="Premium abstract visualization of project intelligence"
                className="w-full h-[500px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyJgWa92QqsFO632xSCiFKAu1qozlkBcRYg1eE3ExR4KoNlaSKcEOz8jT6M9ojfgfFnz5wzSM6oOQfbv20fge1KLkM7Le6a-hRv8e4GRZAmJqEKmKmrGl7BtYLIgKjSToYqWIw5s2mcbYFPIUFUSllABC7_AedXyK58jVDfx9cE0ioSTUiySEUXAEBU20EDGXC5SlxPPRle3kTbLgP9tXUa8b1gR_QRI9a1AG-NdJx3XaMG3sMzIkdnUuHuz1KadMCiTGVe2xc3Ezc"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Drift Gap */}
      <section className="lg:py-32 py-12 bg-[var(--surface-container-lowest)] overflow-hidden px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 ">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] mb-6">
              The Cost of Invisibility
            </h2>
            <p className="text-[16px] text-[var(--on-surface-variant)] max-w-2xl mx-auto">
              Without proactive governance, every decision pushes you further from your goal. We call this the Drift Gap.
            </p>
          </div>
          <div className="relative h-[400px] flex items-center justify-center">
            <div className="absolute w-full h-px bg-white/10 left-0" />
            <div
              className="absolute w-[80%] h-[2px] shadow-[0_0_20px_rgba(223,255,0,0.3)]"
              style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
            />
            <div className="absolute left-0 -top-12">
              <span className="font-mono text-[13px] text-[var(--on-surface-variant)]">Project Start</span>
            </div>
            <div className="absolute right-[20%] -top-12">
              <span className="font-mono text-[13px] text-[var(--primary)]">Target Delivery</span>
            </div>
            <svg className="absolute w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1000 400" preserveAspectRatio="none">
              <motion.path
                d="M 0 200 Q 500 200 1000 50"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="8 8"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
              <circle cx="1000" cy="50" fill="#869585" r="4" />
              <text className="fill-[var(--on-surface-variant)] text-xs font-mono" x="860" y="30">
                Uncontrolled Drift
              </text>
            </svg>
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
              <motion.div
                animate={{ boxShadow: ["0 0 20px rgba(223,255,0,0.4)", "0 0 50px rgba(223,255,0,0.8)", "0 0 20px rgba(223,255,0,0.4)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center"
              >
                <MaterialIcon name="bolt" className="text-[var(--on-primary)] text-sm" filled />
              </motion.div>
              <div className="mt-4 iq-glass p-4 rounded-xl border border-[var(--primary)]/30">
                <p className="font-mono text-[13px] text-[var(--primary)]">ScopeIQ Corrective Signal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="lg:py-32 py-16 iq-container text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl lg:text-5xl font-bold leading-tight tracking-[-0.04em] mb-12"
        >
          Our Mission is to{" "}
          <span className="text-[var(--primary)]" style={{ textShadow: "0 0 30px rgba(223,255,0,0.5)" }}>
            eliminate complexity
          </span>{" "}
          <br className="hidden md:block" /> and restore <span className="italic">intentionality</span> to creation.
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
          {[
            { t: "Vision 2030", b: "A world where every high-stakes project is completed on time, on budget, and without compromise through ubiquitous AI governance." },
            { t: "The Standard", b: 'To define the global standard for project intelligence, making "Scope Drift" a relic of the manual-management era.' },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-left p-10 rounded-3xl border border-[var(--line)] bg-gradient-to-br from-[var(--surface-container-high)] to-[var(--surface)]"
            >
              <h3 className="font-display text-[28px] font-semibold mb-4 text-[var(--primary)]">{c.t}</h3>
              <p className="text-[18px] leading-relaxed text-[var(--on-surface-variant)]">{c.b}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-[var(--surface-container-low)]">
        <div className="iq-container">
          <h2 className="font-display text-4xl text-center font-semibold tracking-[-0.03em] mb-8">
            The Values of Intelligence
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="iq-glass p-8 rounded-[24px] border border-[var(--line)] hover:border-[var(--primary)]/50 transition-colors duration-500"
              >
                <MaterialIcon name={v.icon} className="text-[var(--primary)] text-3xl mb-6" filled />
                <h4 className="font-display text-[24px] font-semibold mb-4">{v.title}</h4>
                <p className="text-[16px] text-[var(--on-surface-variant)] leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="font-display text-[clamp(32px,5vw,48px)] font-semibold tracking-[-0.03em] mb-4">
              The Architects
            </h2>
            <p className="text-[16px] text-[var(--on-surface-variant)] max-w-md">
              Engineers, ethicists, and designers from the world's leading labs.
            </p>
          </div>
          <button className="font-mono text-[13px] text-[var(--primary)] flex items-center gap-2 group">
            Join the team
            <MaterialIcon name="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="space-y-4"
            >
              <div className="aspect-square grayscale hover:grayscale-0 transition-all duration-700 rounded-2xl overflow-hidden bg-[var(--surface-container-high)]">
                <img alt={m.name} className="w-full h-full object-cover" src={m.img} />
              </div>
              <div>
                <p className="font-mono text-[13px] text-[var(--primary)]">{m.role}</p>
                <h5 className="font-display text-[20px] font-semibold">{m.name}</h5>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      </>
  );
}
