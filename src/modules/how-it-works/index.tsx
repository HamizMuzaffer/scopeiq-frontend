'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WORKFLOW_STEPS } from './constants';
import { homeHelper } from '../home/helpers/homeHelper';
import { HelpCircle, GitFork, Sliders, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function HowItWorksModule() {
  const [componentsCount, setComponentsCount] = useState(5);
  const [integrationsCount, setIntegrationsCount] = useState(2);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimResult(null);
    
    toast.info('Running scoping simulations...', {
      description: 'Calculating dependency nodes and edge connections...',
    });

    setTimeout(() => {
      const complexity = homeHelper.calculateProjectScopingComplexity(componentsCount, integrationsCount);
      setIsSimulating(false);
      setSimResult(complexity);
      toast.success('Simulation complete!', {
        description: `Project Scoping Complexity classified as ${complexity}.`,
      });
    }, 1200);
  };

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
            <GitFork className="h-3.5 w-3.5" />
            Operational Pipelines
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Seamless Workflow <br />
            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              Orchestration
            </span>
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            From architecture schema input to dynamic, type-safe Redux state bindings—discover how ScopeIQ aligns your development workflow in four technical phases.
          </p>
        </div>

        {/* Workflow Steps Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
          {WORKFLOW_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative p-6 rounded-xl border border-border bg-card hover:bg-card/90 transition-all duration-200 flex flex-col justify-between"
            >
              {/* Connector line for desktop */}
              {idx < 3 && (
                <span className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-border/40 z-20" />
              )}

              <div>
                <span className="block font-mono text-3xl font-extrabold text-primary/30 mb-4 tracking-tight">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Complexity Simulator Widget */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-8 backdrop-blur-md neon-glow relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border/20 pb-4 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Scoping Complexity Simulator</h3>
              <p className="text-xs text-muted-foreground">Adjust components and test operational classifications in real-time.</p>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase">
                <span>UI Components Count</span>
                <span className="text-primary font-bold">{componentsCount} Nodes</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={componentsCount}
                onChange={(e) => setComponentsCount(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase">
                <span>External Integrations</span>
                <span className="text-primary font-bold">{integrationsCount} Edges</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={integrationsCount}
                onChange={(e) => setIntegrationsCount(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Run button */}
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-95 neon-glow disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                  <span>Compiling Edge Graphs...</span>
                </>
              ) : (
                <>
                  <Cpu className="h-4 w-4" />
                  <span>Run Scoping Estimate</span>
                </>
              )}
            </button>

            {/* Classification Result display */}
            <div className="relative min-h-[50px]">
              {simResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-muted-foreground">Estimated Classification</span>
                      <span className="text-sm font-bold text-foreground">Scoping Complexity: {simResult}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded uppercase">
                    <Sparkles className="h-3 w-3" /> Auto Verified
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
