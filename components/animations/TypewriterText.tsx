"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;          // ms per character
  delay?: number;          // ms before starting
  cursor?: boolean;
  className?: string;
  onComplete?: () => void;
}

/**
 * Animates text character-by-character.
 * Skips animation when prefers-reduced-motion is set.
 */
export default function TypewriterText({
  text,
  speed     = 40,
  delay     = 0,
  cursor    = true,
  className = "",
  onComplete,
}: TypewriterTextProps) {
  const reduced               = useReducedMotion();
  const [displayed, setDisplayed] = useState(reduced ? text : "");
  const [done, setDone]       = useState(reduced);
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduced) {
      setDisplayed(text);
      setDone(true);
      onComplete?.();
      return;
    }

    setDisplayed("");
    setDone(false);
    let idx = 0;

    const start = setTimeout(() => {
      timerRef.current = setInterval(() => {
        idx++;
        setDisplayed(text.slice(0, idx));
        if (idx >= text.length) {
          clearInterval(timerRef.current!);
          setDone(true);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, delay, reduced]);

  return (
    <span className={className}>
      {displayed}
      {cursor && !done && (
        <span
          aria-hidden
          className="inline-block w-0.5 h-[1em] bg-purple-400 ml-0.5 align-middle animate-pulse"
        />
      )}
    </span>
  );
}
