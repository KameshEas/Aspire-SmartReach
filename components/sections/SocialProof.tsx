"use client";

import { motion } from "framer-motion";

const logos = [
  "Salesforce",
  "HubSpot",
  "Stripe",
  "Notion",
  "Slack",
  "Zoom",
  "Figma",
  "Linear",
];

export default function SocialProof() {
  return (
    <section className="relative overflow-hidden py-10" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
        Trusted by innovative teams worldwide
      </p>
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16">
          {logos.concat(logos).map((name, i) => (
            <motion.span
              key={`${name}-${i}`}
              className="whitespace-nowrap text-xl font-bold select-none transition-colors"
              style={{ color: "var(--text-muted)", opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
