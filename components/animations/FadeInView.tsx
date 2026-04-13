"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import React from "react";

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;         // seconds
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;      // px
  once?: boolean;
  duration?: number;
}

const getVariants = (direction: string, distance: number): Variants => {
  const axes: Record<string, { x?: number; y?: number }> = {
    up:    { y: distance },
    down:  { y: -distance },
    left:  { x: distance },
    right: { x: -distance },
    none:  {},
  };

  return {
    hidden: { opacity: 0, ...axes[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 25,
      },
    },
  };
};

/**
 * Wraps children in a viewport-triggered fade + slide animation.
 * Respects prefers-reduced-motion.
 */
export default function FadeInView({
  children,
  className = "",
  delay     = 0,
  direction = "up",
  distance  = 24,
  once      = true,
  duration  = 0.6,
}: FadeInViewProps) {
  const reduced  = useReducedMotion();
  const variants = getVariants(direction, reduced ? 0 : distance);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      transition={{ delay: reduced ? 0 : delay, duration }}
    >
      {children}
    </motion.div>
  );
}
