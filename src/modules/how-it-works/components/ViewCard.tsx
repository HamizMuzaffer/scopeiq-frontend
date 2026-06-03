import { MaterialIcon } from "@/components/shared/MaterialIcon";

export function ViewCard({ title, tag, icon, items, accent }: { title: string; tag: string; icon: string; items: Array<{ icon: string; title: string; body: string }>; accent?: boolean }) {
  return (
    <div className={`iq-glass rounded-[32px] p-8 md:p-12 transition-all duration-500 group ${accent ? "hover:border-[var(--primary)]/40" : "hover:border-[var(--primary)]/20"}`}>
      <div className="flex items-center gap-6 mb-10">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all ${accent ? "bg-[var(--primary)]/10 border-[var(--primary)]/30 group-hover:bg-[var(--primary)]/20" : "bg-[var(--surface-container)] border-[var(--line)]"}`}>
          <MaterialIcon name={icon} className={`text-3xl ${accent ? "text-[var(--primary)]" : ""}`} />
        </div>
        <div>
          <h4 className="text-2xl font-bold">{title}</h4>
          <span className={`font-mono text-[13px] font-bold tracking-widest ${accent ? "text-[var(--primary)]/80" : "text-[var(--on-surface-variant)]"}`}>{tag}</span>
        </div>
      </div>
      <ul className="space-y-8">
        {items.map((it) => (
          <li key={it.title} className="flex items-start gap-6">
            <MaterialIcon name={it.icon} className={accent ? "text-[var(--primary)] mt-1" : "text-[var(--on-surface-variant)] mt-1"} />
            <div>
              <p className="font-bold mb-1">{it.title}</p>
              <p className="text-body-md text-[var(--on-surface-variant)]">{it.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
