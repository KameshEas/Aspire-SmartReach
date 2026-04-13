"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;       // ms
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Animates a number from 0 to `end` once when it enters the viewport.
 */
export default function CountUp({
  end,
  duration = 1800,
  decimals = 0,
  prefix   = "",
  suffix   = "",
  className = "",
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref   = useRef<HTMLSpanElement>(null);
  const ran   = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ran.current) {
          ran.current = true;
          observer.disconnect();
          animate();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function animate() {
    const start     = performance.now();
    const factor    = Math.pow(10, decimals);

    function step(now: number) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end * factor) / factor);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
}
