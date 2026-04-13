"use client";

import React from "react";

type Variant = "primary" | "ghost" | "outline";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-md gap-1.5",
  md: "px-6 py-3 text-[0.9375rem] rounded-xl gap-2",
  lg: "px-8 py-4 text-base rounded-xl gap-2",
};

const variantStyles: Record<Variant, string> = {
  primary: [
    "text-white font-semibold tracking-wide border-0",
    "btn-primary",
  ].join(" "),
  ghost: [
    "text-white font-medium border border-white/10",
    "hover:border-purple-500/50 hover:bg-purple-500/10",
    "transition-all duration-200",
    "bg-transparent",
  ].join(" "),
  outline: [
    "bg-transparent font-medium",
    "border border-white/10 text-white",
    "hover:border-purple-500/60 hover:bg-purple-500/10",
    "transition-all duration-200",
  ].join(" "),
};

export default function Button({
  variant = "primary",
  size    = "md",
  leftIcon,
  rightIcon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const base = [
    "inline-flex items-center justify-center cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C1A]",
    sizeStyles[size],
    variantStyles[variant],
    className,
  ].join(" ");

  return (
    <button className={base} {...rest}>
      {leftIcon  && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
