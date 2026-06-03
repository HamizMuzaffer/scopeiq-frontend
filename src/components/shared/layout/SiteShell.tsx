import type { ReactNode } from "react";


export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--on-surface)] flex flex-col">
      <main className="pt-20 flex-1">{children}</main>
    </div>
  );
}
