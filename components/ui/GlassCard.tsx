import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

/**
 * Glassmorphism surface card with optional neon glow edge.
 */
export default function GlassCard({ children, className = "", glow = false }: GlassCardProps) {
  return (
    <div
      className={[
        "glass",
        glow ? "border-purple-500/25 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(124,58,237,0.2),0_0_60px_rgba(124,58,237,0.1)]" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
