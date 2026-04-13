import React from "react";

type Color = "purple" | "blue" | "emerald" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  dot?: boolean;
  className?: string;
}

const colorStyles: Record<Color, string> = {
  purple:  "bg-purple-500/15 text-purple-300 border-purple-500/30",
  blue:    "bg-blue-500/15 text-blue-300 border-blue-500/30",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  neutral: "bg-white/5 text-slate-300 border-white/10",
};

const dotColors: Record<Color, string> = {
  purple:  "bg-purple-400",
  blue:    "bg-blue-400",
  emerald: "bg-emerald-400",
  neutral: "bg-slate-400",
};

export default function Badge({ children, color = "purple", dot = false, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1",
        "text-xs font-medium tracking-wide uppercase",
        "border rounded-full",
        colorStyles[color],
        className,
      ].join(" ")}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[color]}`} aria-hidden />
      )}
      {children}
    </span>
  );
}
