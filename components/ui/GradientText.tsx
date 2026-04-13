import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  from?: string;
  to?: string;
}

/**
 * Purple-to-blue gradient text. Accepts an `as` prop to render any HTML tag.
 */
export default function GradientText({
  children,
  className = "",
  as: Tag = "span",
  from = "#A78BFA",
  to   = "#60A5FA",
}: GradientTextProps) {
  return (
    <Tag
      className={["gradient-text", className].join(" ")}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      {children}
    </Tag>
  );
}
