'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HERO_STATS } from '../constants';
import { Terminal, Shield, ArrowRight, Cpu, Zap, Activity } from 'lucide-react';
import { toast } from 'sonner';

export default function Hero() {
  const handleTriggerDemoToast = () => {
    toast.success('Initializing Neural Core Demo...', {
      description: 'System modules configured successfully.',
    });
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-primary"
            >
              <Zap className="h-3 w-3 animate-pulse" />
              Obsidian Cyber System Active
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]"
            >
              Project Scoping <br />
              <span className="text-primary neon-glow relative inline-block bg-primary/10 px-3 py-1 mt-2 rounded border border-primary/20">
                Visualized
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground leading-relaxed"
            >
              Align your architectural logic with developer operations instantly. Stop guess-estimating. Chart dependencies in our sleek high-fidelity dashboard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={handleTriggerDemoToast}
                className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-200 hover:opacity-95 neon-glow"
              >
                Launch Console
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <Link
                href="/how-it-works"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-semibold text-foreground hover:bg-secondary/40 transition-all duration-200"
              >
                Analyze Workflows
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 border-t border-border/20 pt-8"
            >
              {HERO_STATS.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Preview Dashboard Column (High Fidelity Obsidian Cyber UI Mock) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl border border-border bg-card/40 p-1.5 backdrop-blur-md neon-glow"
            >
              {/* Top Window Bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/20 bg-card/60 rounded-t-xl">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-destructive/80"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
                  <span className="h-3 w-3 rounded-full bg-primary/80"></span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>scopeiq-neural-viz ~ bash</span>
                </div>
                <span className="w-9"></span>
              </div>

              {/* Mock Scoping Terminal Content */}
              <div className="p-6 font-mono text-xs sm:text-sm text-foreground space-y-4 min-h-[300px] bg-card rounded-b-xl flex flex-col justify-between">
                
                {/* Node Grid Graphic mockup */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-muted-foreground border-b border-border/10 pb-2">
                    <span className="flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5 text-primary" /> Active Nodes</span>
                    <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-primary animate-pulse" /> 120ms Latency</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors flex flex-col gap-1 cursor-pointer">
                      <span className="text-[10px] text-primary uppercase font-bold">Node_Alpha</span>
                      <span className="text-[11px] truncate">Redux Store Sync</span>
                      <span className="text-[9px] text-emerald-500 font-semibold mt-1">● SYNCED</span>
                    </div>

                    <div className="p-3 rounded border border-border bg-card/60 flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Node_Beta</span>
                      <span className="text-[11px] truncate">Router Middleware</span>
                      <span className="text-[9px] text-primary font-semibold mt-1">○ PENDING</span>
                    </div>

                    <div className="p-3 rounded border border-border bg-card/60 flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Node_Gamma</span>
                      <span className="text-[11px] truncate">OAuth Security</span>
                      <span className="text-[9px] text-emerald-500 font-semibold mt-1">● SECURE</span>
                    </div>
                  </div>
                </div>

                {/* Animated console logger */}
                <div className="space-y-1.5 bg-background/50 p-3 rounded border border-border/10">
                  <div className="text-[11px] text-primary flex items-center gap-1">
                    <span>$</span>
                    <span>scopeiq scope-graph --generate</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground space-y-1">
                    <p>› Compiling system architecture map...</p>
                    <p className="text-emerald-500">✔ Generated 18 edge connections successfully.</p>
                    <p>› Injecting Redux action hooks...</p>
                  </div>
                </div>

                {/* Scope Visual Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase">
                    <span>System Allocation</span>
                    <span>94.8% Complete</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '94.8%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-primary neon-glow"
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
