'use client';

import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import { Faq, FeatureBento, GovernanceLoop, RiskEngine, SocialProof, Testimonials } from './components/Section';

export default function HomeModule() {
  return (
    <div className="flex flex-col flex-1">
      {/* Visual cyber layout */}
      <Hero />
      <SocialProof />
      <FeatureBento />
      <GovernanceLoop />
      <RiskEngine />
      <Testimonials />
      <Faq />
    </div>
  );
}
