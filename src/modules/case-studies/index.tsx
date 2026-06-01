'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CASE_STUDIES, CATEGORIES } from './constants';
import { caseStudiesHelper } from './helpers/caseStudiesHelper';
import { FolderGit2, ArrowUpRight, BarChart3, Database } from 'lucide-react';

export default function CaseStudiesModule() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStudies = caseStudiesHelper.filterStudiesByCategory(
    CASE_STUDIES,
    selectedCategory
  );

  return (
    <div className="flex-1 py-16 sm:py-24 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <FolderGit2 className="h-3.5 w-3.5" />
            Platform Verifications
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Proven Architectural <br />
            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              Breakthroughs
            </span>
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            See how major software enterprises solved complex dependency scoping bottlenecks and optimized their production systems using ScopeIQ.
          </p>
        </div>

        {/* Categories Tabs Filter */}
        <div className="flex justify-center gap-2 mb-12 border-b border-border/10 pb-6">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 ${selectedCategory === category
                ? 'bg-primary text-primary-foreground neon-glow'
                : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={study.id}
                className="group relative rounded-xl border border-border bg-card p-8 hover:bg-card/90 transition-all duration-300 neon-border cursor-pointer flex flex-col justify-between min-h-[320px]"
              >
                <div>
                  {/* Category Badge & Arrow */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-primary uppercase bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">
                      {study.category}
                    </span>
                    <span className="h-8 w-8 rounded-full border border-border/60 bg-secondary/20 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Title & Client */}
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                    Client: {study.client}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {study.description}
                  </p>
                </div>

                {/* Big Metric Badge Footer */}
                <div className="mt-8 border-t border-border/10 pt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      Verified Result
                    </span>
                    <span className="text-lg font-extrabold text-foreground tracking-tight">
                      {study.metric}
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
