'use client';

import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';

export default function HomeModule() {
  return (
    <div className="flex flex-col flex-1">
      {/* Visual cyber layout */}
      <Hero />
      <Features />
    </div>
  );
}
