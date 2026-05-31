'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MAIN_FEATURES } from '../constants';
import { Cpu, Layers, Activity, ShieldCheck, HelpCircle } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu: Cpu,
  Layers: Layers,
  Activity: Activity,
};

export default function Features() {
  return (
    <section className="py-20 bg-card/10 border-t border-border/20 relative z-10 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
            Platform Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            High-Fidelity Operations Mapping
          </p>
          <p className="text-muted-foreground text-base">
            Configure, manage, and scale your application workflows in our dark-adapted, latency-optimized visual workstation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MAIN_FEATURES.map((feature, idx) => {
            const Icon = iconMap[feature.iconName] || HelpCircle;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative rounded-xl border border-border bg-card p-8 hover:bg-card/80 transition-all duration-300 neon-border hover:-translate-y-1"
              >
                {/* Glow backer */}
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 group-hover:from-primary/5 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Icon wrapper */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/50 text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:neon-glow transition-all duration-300 mb-6">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
