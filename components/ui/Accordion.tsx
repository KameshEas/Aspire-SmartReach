"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Item = { question: string; answer: string };

export default function Accordion({ items, idPrefix = "acc" }: { items: Item[]; idPrefix?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const isOpen = openIndex === idx;
        const btnId = `${idPrefix}-btn-${idx}`;
        const panelId = `${idPrefix}-panel-${idx}`;
        return (
          <div key={idx} className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
            <button
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-3 p-3"
              style={{ color: "var(--text-primary)" }}
            >
              <span style={{ fontWeight: 600 }}>{it.question}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} style={{ color: "var(--text-secondary)" }} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="px-3 pb-3"
                >
                  <div style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>{it.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
