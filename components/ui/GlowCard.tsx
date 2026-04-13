import React from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

/**
 * Metric / stat card with sharp outer glow and hover lift.
 */
export default function GlowCard({ children, className = "", interactive = true }: GlowCardProps) {
  return (
    <div
      className={[
        "glow-card",
        interactive ? "cursor-default" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
