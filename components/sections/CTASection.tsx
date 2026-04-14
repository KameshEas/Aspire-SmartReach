"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section id="cta" className="relative py-28 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]" style={{ background: "rgba(124,58,237,0.15)" }} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <span
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
          style={{ border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)", color: "var(--color-brand-purple-light)" }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Limited Early Access
        </span>
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
          Ready to <span className="gradient-text">transform</span> your outreach?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg" style={{ color: "var(--text-secondary)" }}>
          Join 500+ sales teams already using Aspire SmartReach to close deals
          faster with AI-powered personalization.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#" className="btn-primary text-base px-8 py-3">
            Get Early Access
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#" className="btn-ghost text-base px-8 py-3">
            Schedule a Demo
          </a>
        </div>
        <p className="mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
          Free 14-day trial &bull; No credit card required &bull; Cancel anytime
        </p>
      </motion.div>
    </section>
  );
}
