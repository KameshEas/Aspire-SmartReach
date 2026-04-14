import { Zap } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer className="px-6 py-10" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <a href="#" className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--text-primary)" }}>
          <Zap className="h-4 w-4" style={{ color: "var(--color-brand-purple)" }} />
          Aspire SmartReach
        </a>
        <div className="flex gap-6">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-xs transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }}>
              {l.label}
            </a>
          ))}
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          &copy; {new Date().getFullYear()} Aspire SmartReach. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
