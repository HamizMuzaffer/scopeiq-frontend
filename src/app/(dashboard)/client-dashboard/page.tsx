"use client";

import React, { useState } from "react";
import { useAuth, ProtectedRoute } from "@/modules/auth/context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FileText,
  Clock,
  Layers,
  ChevronRight,
  CheckCircle2,
  Lock,
  Workflow,
  Sparkles,
  HelpCircle,
  Signature,
} from "lucide-react";

interface PendingScope {
  id: string;
  name: string;
  manager: string;
  status: "AWAITING_REVIEW" | "SIGNED_OFF";
  costEstimate: string;
  eta: string;
}

export default function ClientDashboard() {
  const { user } = useAuth();
  const [scopes, setScopes] = useState<PendingScope[]>([
    {
      id: "SCP-094",
      name: "AWS Cloud Infrastructure Migration Scope",
      manager: "Aura Vance (PM)",
      status: "AWAITING_REVIEW",
      costEstimate: "$14,500",
      eta: "July 12, 2026",
    },
    {
      id: "SCP-073",
      name: "Decentralized Storage Schema Design",
      manager: "Aura Vance (PM)",
      status: "AWAITING_REVIEW",
      costEstimate: "$8,200",
      eta: "July 28, 2026",
    },
  ]);

  const timelineSteps = [
    {
      phase: "01",
      title: "Onboarding & Credentials",
      desc: "User configuration and secure identity check.",
      status: "COMPLETED",
    },
    {
      phase: "02",
      title: "S3 Metadata Registry",
      desc: "Cloud object container initialization & sync.",
      status: "COMPLETED",
    },
    {
      phase: "03",
      title: "Scope Compiler Engine",
      desc: "AI path calculations & automated structural mapping.",
      status: "ACTIVE",
    },
    {
      phase: "04",
      title: "Deployment & Verification",
      desc: "Final sandbox audit and production system deploy.",
      status: "LOCKED",
    },
  ];

  const clientStats = [
    {
      label: "PENDING ACTION",
      value: scopes.filter((s) => s.status === "AWAITING_REVIEW").length.toString(),
      desc: "Requires operator signoff",
      icon: Signature,
      color: "text-[var(--primary)]",
      bgColor: "bg-[var(--primary)]/10",
      glowColor: "rgba(223, 255, 0, 0.2)",
    },
    {
      label: "COMPLETED DELIVERABLES",
      value: "8 units",
      desc: "Fully audited in ledger",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      glowColor: "rgba(16, 185, 129, 0.2)",
    },
    {
      label: "TOTAL PROJECT CODES",
      value: "3 active",
      desc: "Tracking in real-time",
      icon: Layers,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      glowColor: "rgba(96, 165, 250, 0.2)",
    },
    {
      label: "AI OPTIMIZED SAVINGS",
      value: "42.8 hrs",
      desc: "Equivalent to 12% boost",
      icon: Sparkles,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      glowColor: "rgba(192, 132, 252, 0.2)",
    },
  ];

  const handleSignoff = (id: string, name: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Cryptographically signing ${id}...`,
        success: () => {
          setScopes((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: "SIGNED_OFF" } : s))
          );
          return `Scope ${id} signed off. Dispatched to PM workflow.`;
        },
        error: "Signoff transmission error.",
      }
    );
  };

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <div className="space-y-8 font-sans">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--on-surface-variant)]/80">
                Workspace: Client-Hub
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              Client Intelligence Center
            </h1>
            <p className="text-sm text-[var(--on-surface-variant)] mt-1">
              Welcome back, <span className="font-semibold text-foreground">{user?.fullName}</span>. Access project timelines, costs, and complete outstanding signoffs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toast.info("Feedback ticket form initialized.")}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--line)] bg-[var(--surface-container-low)] hover:bg-[var(--surface-container-high)] text-xs font-mono rounded-lg transition-all cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Request Help
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {clientStats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="iq-glass rounded-2xl p-5 relative overflow-hidden group hover:border-[var(--primary)]/30 transition-all duration-300"
              style={{
                boxShadow: `0 0 25px -10px ${stat.glowColor}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--on-surface-variant)]/70">
                  {stat.label}
                </span>
                <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
                  <stat.icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="text-2xl font-bold tracking-tight mb-1 text-foreground">
                {stat.value}
              </div>
              <p className="text-[11px] text-[var(--on-surface-variant)]/80 font-mono">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Deliverables and Interactive Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Approvals Table */}
          <div className="lg:col-span-2 iq-glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Authorizations Ledger
                  </h3>
                  <p className="text-xs text-[var(--on-surface-variant)]/80 mt-0.5">
                    Review and finalize project scopes designed by your PM operator.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {scopes.length === 0 ? (
                  <div className="text-center py-8 font-mono text-sm text-[var(--on-surface-variant)]">
                    No pending authorizations found. All schemas signed off!
                  </div>
                ) : (
                  scopes.map((s) => (
                    <div
                      key={s.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4.5 rounded-xl bg-[var(--surface-container-low)] border border-[var(--line)] gap-4 hover:border-[var(--primary)]/20 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/5 px-2 py-0.5 rounded border border-[var(--primary)]/25">
                            {s.id}
                          </span>
                          <span className="font-heading text-sm font-bold text-foreground truncate max-w-[250px]">
                            {s.name}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--on-surface-variant)]/80 font-mono">
                          <span>Owner: {s.manager}</span>
                          <span>Budget: {s.costEstimate}</span>
                          <span>Target: {s.eta}</span>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center">
                        {s.status === "SIGNED_OFF" ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Authorized
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSignoff(s.id, s.name)}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-[var(--on-primary)] bg-[var(--primary)] hover:brightness-110 px-4 py-2 rounded-lg transition-all cursor-pointer shadow-[0_0_10px_rgba(223,255,0,0.15)]"
                          >
                            <Signature className="h-3.5 w-3.5" />
                            Signoff Scope
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-[var(--line)] pt-4 mt-6 text-[11px] text-[var(--on-surface-variant)]/60 font-mono flex justify-between items-center">
              <span>All signatures are cryptographically recorded.</span>
              <button
                onClick={() => toast.info("No older scope ledger available.")}
                className="text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View History Ledger
              </button>
            </div>
          </div>

          {/* Interactive Timeline Panel */}
          <div className="iq-glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Workflow className="h-5 w-5 text-[var(--primary)]" />
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  AI Pipeline Milestone
                </h3>
              </div>
              <p className="text-xs text-[var(--on-surface-variant)]/80 mb-6">
                Visual compilation stream of the current onboarding & architecture setup.
              </p>

              <div className="space-y-6 relative before:absolute before:inset-y-2 before:left-[17px] before:w-[1px] before:bg-[var(--line)]">
                {timelineSteps.map((step) => {
                  const isCompleted = step.status === "COMPLETED";
                  const isActive = step.status === "ACTIVE";
                  const isLocked = step.status === "LOCKED";

                  return (
                    <div key={step.phase} className="flex gap-4 relative z-10 items-start">
                      <div
                        className={`h-9.5 w-9.5 rounded-full flex items-center justify-center font-mono text-xs font-bold border shrink-0 transition-all ${
                          isCompleted
                            ? "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30 shadow-[0_0_12px_rgba(223,255,0,0.1)]"
                            : isActive
                            ? "bg-[var(--surface-container-high)] text-foreground border-[var(--primary)] shadow-[0_0_15px_rgba(223,255,0,0.2)] animate-pulse"
                            : "bg-[var(--surface-container-lowest)] text-[var(--on-surface-variant)]/40 border-[var(--line)]"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4.5 w-4.5" />
                        ) : isLocked ? (
                          <Lock className="h-3.5 w-3.5" />
                        ) : (
                          step.phase
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-heading text-sm font-bold ${
                              isLocked ? "text-[var(--on-surface-variant)]/40" : "text-foreground"
                            }`}
                          >
                            {step.title}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-ping" />
                          )}
                        </div>
                        <p
                          className={`text-xs ${
                            isLocked ? "text-[var(--on-surface-variant)]/30" : "text-[var(--on-surface-variant)]/80"
                          }`}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 border-t border-[var(--line)] pt-4">
              <button
                onClick={() => toast.info("Deep telemetry visualizations are under development.")}
                className="w-full py-2.5 rounded-lg border border-[var(--line)] hover:border-[var(--primary)]/40 text-center font-mono text-[10px] uppercase text-foreground hover:bg-[var(--primary)]/5 transition-all cursor-pointer"
              >
                Inspect Telemetry Node
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
