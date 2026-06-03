"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { CLIENT_FEATURES, PM_FEATURES, STEPS } from "./constants";
import { ViewCard } from "./components/ViewCard";
import Image from "next/image";
import HOW_IMAGE_DARK from "./assets/how-image-dark.png";
import HOW_IMAGE_LIGHT from "./assets/how-image-light.png";
import { useTheme } from "@/components/shared/ThemeProvider";
import { Button } from "@/components/ui/button";

export default function HowItWorksModule() {
  const { theme } = useTheme();

  const howImage = theme === "dark" ? HOW_IMAGE_DARK : HOW_IMAGE_LIGHT;
  return (
    <>
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 md:px-12 overflow-hidden iq-grid-bg py-24">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute inset-0 iq-circuit-bg opacity-50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 max-w-5xl"
        >
          <div className="inline-flex items-center gap-3 iq-glass px-4 py-2 rounded-full mb-10">
            <MaterialIcon
              name="sync_alt"
              className="text-[var(--primary)] text-[18px]"
              filled
            />
            <span className="font-mono text-[13px] text-[var(--primary)] uppercase tracking-[0.2em] font-bold">
              Synchronized Intelligence{" "}
            </span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-[1.3] tracking-tight iq-text-gradient-soft">
            Unified Project Intelligence.
          </h1>
          <p className="text-body-lg text-[var(--on-surface-variant)] max-w-2xl mx-auto">
            Experience the seamless flow of project governance from proposal to
            delivery. A high-fidelity unified environment where PMs and Clients
            see the same truth in real-time.
          </p>
        </motion.div>
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto max-w-6xl lg:max-w-none rounded-2xl border my-6 border-border bg-card/40 p-1.5 backdrop-blur-md neon-glow"
          >
            <Image
              src={howImage}
              alt="Dashboard Preview"
              width={800}
              height={800}
              className="rounded-lg object-cover"
            />
          </motion.div>
        </div>

        <div></div>
      </section>

      <section className="py-24 border-y border-[var(--line)] bg-[var(--surface)]/50">
        <div className="iq-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-16">
              {STEPS.map(([tag, title, body], i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-[var(--line)]"
                >
                  <div className="font-mono text-[13px] font-bold text-[var(--primary)] mb-3 tracking-widest">
                    {tag}
                  </div>
                  <h3 className="text-2xl font-sans font-semibold mb-4">
                    {title}
                  </h3>
                  <p className="text-body-md text-[var(--on-surface-variant)]">
                    {body}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="hidden md:block sticky top-32 h-fit">
              <div className="iq-glass rounded-[32px] p-8 iq-glow">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[13px] font-bold text-[var(--primary)] tracking-widest">
                    AI INSIGHT
                  </span>
                  <MaterialIcon
                    name="auto_awesome"
                    className="text-[var(--primary)] animate-pulse"
                  />
                </div>
                <p className="italic text-[var(--on-surface)]">
                  "Drift detected in Module B. Adjusting timeline by +2 days to
                  maintain 98% quality score."
                </p>
                <div className="mt-8 h-64 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 via-[var(--surface-container)] to-[var(--surface-container-low)] flex items-center justify-center">
                  <MaterialIcon
                    name="hub"
                    className="text-[var(--primary)] text-[96px] iq-pulse-ring"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--surface-container-low)]/40">
        <div className="iq-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-sans  font-bold mb-4 iq-text-gradient-soft">
              Both Sides of the Truth
            </h2>
            <p className="text-body-md text-[var(--on-surface-variant)] max-w-xl mx-auto">
              Same high-integrity data source. Purpose-built tailored
              perspectives.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ViewCard
              title="Project Manager View"
              tag="ADMINISTRATIVE INTEL"
              icon="engineering"
              items={PM_FEATURES}
              accent
            />
            <ViewCard
              title="Client Portal View"
              tag="TRANSPARENCY HUB"
              icon="person"
              items={CLIENT_FEATURES}
            />
          </div>
        </div>
      </section>
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 md:px-12 overflow-hidden iq-grid-bg py-24">
        <h1 className="text-4xl lg:text-6xl font-sans font-semibold leading-tight py-1">Stop Reacting. Start Leading.</h1>
        <p>
          Join teams who have eliminated scope drift and increased
          profitability by 30%.
        </p>
        <div >
          <Button className="bg-[var(--primary)] my-4 px-6 py-6 rounded-xl text-black hover:text-white hover:cursor-pointer hover:bg-[var(--primary-hover)] hover:border-[var(--primary-hover)]">
            Get Started
          </Button>
        </div>
      </section>
    </>
  );
}
