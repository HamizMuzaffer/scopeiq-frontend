"use client";

import React, { useState } from "react";
import { useAuth, ProtectedRoute } from "@/modules/auth/context/AuthContext";
import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { toast } from "sonner";
import {
  TrendingUp,
  AlertTriangle,
  Zap,
  Activity,
  ChevronRight,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Cpu,
} from "lucide-react";

interface PipelineProject {
  id: string;
  name: string;
  client: string;
  completeness: number;
  risk: "LOW" | "MEDIUM" | "HIGH";
  updatedAt: string;
}

export default function PMDashboard() {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const initialPipelines: PipelineProject[] = [
    {
      id: "PRJ-081",
      name: "Cyber Security Audit Scope",
      client: "Aegis Industries",
      completeness: 85,
      risk: "LOW",
      updatedAt: "2 mins ago",
    },
    {
      id: "PRJ-094",
      name: "AWS Cloud Infrastructure Migration",
      client: "Horizon Venture Partners",
      completeness: 40,
      risk: "HIGH",
      updatedAt: "24 mins ago",
    },
    {
      id: "PRJ-056",
      name: "OAuth2 & JWT Microservice Auth",
      client: "Sovereign Crypto LLC",
      completeness: 95,
      risk: "LOW",
      updatedAt: "1 hour ago",
    },
    {
      id: "PRJ-073",
      name: "Decentralized Storage Schema Design",
      client: "Helios Data Labs",
      completeness: 65,
      risk: "MEDIUM",
      updatedAt: "3 hours ago",
    },
  ];

  const [pipelines, setPipelines] = useState<PipelineProject[]>(initialPipelines);

  const stats = [
    {
      label: "ACTIVE PIPELINES",
      value: "12 / 16",
      desc: "4 scopes pending feedback",
      icon: Cpu,
      color: "text-[var(--primary)]",
      bgColor: "bg-[var(--primary)]/10",
      glowColor: "rgba(223, 255, 0, 0.2)",
    },
    {
      label: "PENDING SIGNOFFS",
      value: "5",
      desc: "2 marked critical path",
      icon: AlertTriangle,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
      glowColor: "rgba(251, 191, 36, 0.2)",
    },
    {
      label: "AI CONFIDENCE LEVEL",
      value: "98.4%",
      desc: "Based on 452 historical audits",
      icon: Zap,
      color: "text-[var(--primary)]",
      bgColor: "bg-[var(--primary)]/10",
      glowColor: "rgba(223, 255, 0, 0.2)",
    },
    {
      label: "TELEMETRY TRAIL",
      value: "2.4k req",
      desc: "Active logging node",
      icon: Activity,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      glowColor: "rgba(96, 165, 250, 0.2)",
    },
  ];

  const recentLogs = [
    { time: "22:42:01", tag: "AUTH", text: "Silent JWT access token rotation verified successfully." },
    { time: "22:38:15", tag: "UPLOAD", text: "New avatar file uploaded via multer to S3 storage bucket." },
    { time: "22:15:30", tag: "PROFILE", text: "Onboarding completed: user role set to project_manager." },
    { time: "21:50:09", tag: "API", text: "POST request validated schema for /users/complete-profile." },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Telemetry workspace updated successfully.");
      setPipelines((prev) =>
        prev.map((p) => ({
          ...p,
          completeness: Math.min(100, p.completeness + Math.floor(Math.random() * 5)),
        }))
      );
    }, 800);
  };

  const triggerDiagnostic = (id: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Running diagnostic sequence for ${id}...`,
        success: `AI Diagnostic complete: No syntax deviations detected.`,
        error: "Diagnostic pipeline failure.",
      }
    );
  };

  return (
    <ProtectedRoute allowedRoles={["project_manager"]}>
      <div className="space-y-8 font-sans">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--on-surface-variant)]/80">
                Workspace: PM-Control-Panel
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              Operational Control Center
            </h1>
            <p className="text-sm text-[var(--on-surface-variant)] mt-1">
              Welcome back, <span className="font-semibold text-foreground">{user?.fullName}</span>. Check active scopes and AI diagnostics below.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--line)] bg-[var(--surface-container-low)] hover:bg-[var(--surface-container-high)] text-xs font-mono rounded-lg transition-all cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-[var(--primary)]" : ""}`} />
              Sync workspace
            </button>
            <button
              onClick={() => toast.info("Diagnostics pipeline is working normally.")}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer shadow-[0_0_15px_rgba(223,255,0,0.2)]"
            >
              <Sliders className="h-3.5 w-3.5" />
              Global Config
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
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
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-right from-transparent via-[var(--primary)]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Workspace Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Pipeline Table */}
          <div className="lg:col-span-2 iq-glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Active Scoping Workspace
                  </h3>
                  <p className="text-xs text-[var(--on-surface-variant)]/80 mt-0.5">
                    Real-time compilation progress of active scoping requests.
                  </p>
                </div>
                <span className="font-mono text-[9px] bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] px-2.5 py-1 rounded border border-[var(--line)]">
                  COUNT: {pipelines.length} UNITS
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--line)] text-[10px] text-[var(--on-surface-variant)]/60 uppercase">
                      <th className="pb-3 font-semibold">Project Code / Name</th>
                      <th className="pb-3 font-semibold">Client Partner</th>
                      <th className="pb-3 font-semibold">AI Risk</th>
                      <th className="pb-3 font-semibold">Completeness</th>
                      <th className="pb-3 font-semibold text-right">Operation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)] text-xs text-[var(--on-surface)]">
                    {pipelines.map((p) => (
                      <tr key={p.id} className="group hover:bg-[var(--surface-container-low)]/50 transition-colors">
                        <td className="py-4.5 pr-2">
                          <div className="font-bold text-foreground text-sm tracking-tight">{p.id}</div>
                          <div className="text-[10px] text-[var(--on-surface-variant)]/70 truncate max-w-[170px] mt-0.5">
                            {p.name}
                          </div>
                        </td>
                        <td className="py-4.5 pr-2 text-[var(--on-surface-variant)] font-sans">
                          {p.client}
                        </td>
                        <td className="py-4.5 pr-2">
                          <span
                            className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              p.risk === "LOW"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : p.risk === "MEDIUM"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse"
                            }`}
                          >
                            {p.risk}
                          </span>
                        </td>
                        <td className="py-4.5 pr-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-[var(--surface-container-high)] rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-[var(--primary)] h-full rounded-full"
                                style={{ width: `${p.completeness}%` }}
                              />
                            </div>
                            <span className="font-bold text-[10px]">{p.completeness}%</span>
                          </div>
                        </td>
                        <td className="py-4.5 text-right">
                          <button
                            onClick={() => triggerDiagnostic(p.id)}
                            className="inline-flex items-center gap-1 text-[10px] text-[var(--primary)] border border-[var(--primary)]/30 hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 px-2.5 py-1 rounded transition-all cursor-pointer"
                          >
                            Analyze
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-t border-[var(--line)] pt-4 mt-6 flex items-center justify-between text-[11px] text-[var(--on-surface-variant)]/60 font-mono">
              <span>Database Sync Status: 100% synchronized</span>
              <button
                onClick={() => toast.info("Feature scheduled for next version sprint.")}
                className="text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View all pipelines
              </button>
            </div>
          </div>

          {/* Telemetry Log Panel */}
          <div className="iq-glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  System Logs
                </h3>
                <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
              </div>
              <p className="text-xs text-[var(--on-surface-variant)]/80 mb-6 font-mono">
                TELEMETRY FEED // COMPILER_STDOUT
              </p>

              <div className="space-y-4 font-mono text-[11px] text-[var(--on-surface-variant)]">
                {recentLogs.map((log, i) => (
                  <div key={i} className="flex gap-3 items-start border-l border-[var(--line)] pl-3 py-1">
                    <span className="text-[var(--primary)] shrink-0 font-bold">{log.time}</span>
                    <div>
                      <span className="bg-[var(--surface-container-high)] text-foreground text-[8px] font-bold px-1 py-0.5 rounded mr-1.5 border border-[var(--line)]">
                        {log.tag}
                      </span>
                      <span className="text-[var(--on-surface)]">{log.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-[var(--line)] pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[10px] text-[var(--on-surface-variant)] font-mono">
                <ShieldCheck className="h-4 w-4 text-[var(--primary)]" />
                <span>Security framework: SSL & JWT active</span>
              </div>
              <button
                onClick={() => toast.info("Diagnostic export file generated.")}
                className="w-full py-2.5 rounded-lg border border-[var(--line)] hover:border-[var(--primary)]/40 text-center font-mono text-[10px] uppercase text-foreground hover:bg-[var(--primary)]/5 transition-all cursor-pointer"
              >
                Dump System Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
