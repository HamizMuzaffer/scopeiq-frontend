import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  children: ReactNode;
  leftPanel?: ReactNode;
  fullBleed?: boolean;
}

export function AuthShell({ children, leftPanel, fullBleed }: Props) {
  if (fullBleed) {
    return (
      <div className="min-h-screen bg-[var(--surface)] text-[var(--on-surface)] relative overflow-hidden">
        <header className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-6 md:px-12 py-6">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="ScopeIQ" width={32} height={32} priority />
          </Link>
        </header>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex overflow-x-hidden">
      <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[var(--surface-container-lowest)] border-r border-[var(--line)] items-center justify-center p-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--primary)]/10 blur-[120px] rounded-full pointer-events-none" />
        <Link href="/" className="absolute top-6 left-6 md:left-12 z-20 flex items-center">
          <Image src="/logo.png" alt="ScopeIQ" width={32} height={32} priority />
        </Link>
        {leftPanel ?? <DefaultLeftPanel />}
      </section>
      <section className="w-full md:w-1/2 flex flex-col bg-[var(--surface)] relative">
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-12">
          {children}
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[var(--primary)]/10 blur-[120px] rounded-full pointer-events-none" />
      </section>
    </div>
  );
}

function DefaultLeftPanel() {
  return (
    <div className="relative z-10 max-w-md">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] font-mono text-[13px] mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
        AI-Powered Governance
      </span>
      <h2 className="text-6xl font-semibold text-[var(--on-surface)] leading-tight mb-6">
        Project Intelligence, <span className="iq-text-gradient">Synthesized.</span>
      </h2>
      <p className="text-body-lg text-[var(--on-surface-variant)]">
        Connect your workflow and let AI extract the critical path. Real-time governance for high-velocity teams.
      </p>
    </div>
  );
}
