"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/shared/ThemeProvider";
import overlayImage from "../assets/overlay.png";
import heroBg from "../assets/hero-image.png";
import heroBgLight from "../assets/hero-image-light.png";

export default function Hero() {
  const { theme } = useTheme();

  const heroPreviewImage = theme === "dark" ? heroBg : heroBgLight;

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {theme === "dark" && (
        <div>
          <Image
            src={overlayImage}
            alt="Hero Background"
            fill
            className="object-cover object-center opacity-20"
          />
        </div>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-normal tracking-wider uppercase text-primary"
            >
              <Zap className="h-3 w-3 animate-pulse" />
              AI-POWERED PREDICTION
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold  text-foreground leading-[1.1]"
            >
              See Scope Drift{" "}
              <span className="font-serif font-normal text-primary italic neon-glow relative inline-block bg-primary/10 px-3 py-1 mt-2 rounded border border-primary/20">
                Before
              </span>{" "}
              It Happens
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-4xl text-center text-lg text-muted-foreground leading-relaxed"
            >
              AI-powered project intelligence for modern software teams. Predict
              risks, automate governance, and ship with absolute precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-200 hover:opacity-95 neon-glow">
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="/how-it-works"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-semibold text-foreground hover:bg-secondary/40 transition-all duration-200"
              >
                Watch Demo
              </Link>
            </motion.div>
          </div>

          {/* Right Preview Dashboard Column (High Fidelity Obsidian Cyber UI Mock) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-6xl lg:max-w-none rounded-2xl border border-border bg-card/40 p-1.5 backdrop-blur-md neon-glow"
            >
              <Image
                src={heroPreviewImage}
                alt="Dashboard Preview"
                width={1200}
                height={800}
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
