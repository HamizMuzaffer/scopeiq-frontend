'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_MILESTONES, CORE_VALUES } from './constants';
import { ShieldAlert, Award, Compass, Users2, Activity } from 'lucide-react';

export default function AboutModule() {
  return (
    <div className="flex-1 py-16 sm:py-24 font-sans relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <Compass className="h-3.5 w-3.5" />
            Our Mission Statement
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight"
          >
            A Platform Built to Align <br />
            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              Logic & Action
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            ScopeIQ was conceived by a specialized team of systems architects and product designers who grew tired of misaligned software milestones, vague scopes, and excessive engineering overhead.
          </motion.p>
        </div>

        {/* Timeline Section */}
        <div className="mb-24 space-y-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground border-b border-border/20 pb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary animate-pulse" /> Corporate Roadmap
          </h2>
          
          <div className="relative pl-6 sm:pl-8 border-l border-border/30 max-w-3xl mx-auto space-y-12">
            {TIMELINE_MILESTONES.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative space-y-2"
              >
                {/* Node Dot */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-primary neon-glow">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                    {milestone.year}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">
                    {milestone.title}
                  </h3>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground border-b border-border/20 pb-4 flex items-center gap-2">
            <Users2 className="h-5 w-5 text-primary" /> System Principles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_VALUES.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-border bg-card hover:bg-card/90 transition-all duration-200"
              >
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-primary" />
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
