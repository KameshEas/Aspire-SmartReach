"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, TrendingUp, Mail, BarChart3 } from "lucide-react";
import TypewriterText from "@/components/animations/TypewriterText";

const dashboardText =
  "Hey {{firstName}}, noticed {{company}} just expanded into APAC -- congrats! We helped similar teams boost reply rates by 3.2x. Would love 15 min to show how. Free this Thursday?";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full blur-[120px]" style={{ background: "rgba(124,58,237,0.1)" }} />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[120px]" style={{ background: "rgba(37,99,235,0.1)" }} />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Left -- Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{ border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)", color: "var(--color-brand-purple-light)" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Sales Outreach
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--text-primary)" }}>
            Outreach that feels{" "}
            <span className="gradient-text">human</span>,<br />
            scales like a{" "}
            <span className="gradient-text">machine</span>.
          </h1>
          <p className="max-w-lg text-lg" style={{ color: "var(--text-secondary)" }}>
            Aspire SmartReach crafts hyper-personalized messages, automates
            multi-channel sequences, and delivers real-time analytics -- so your
            team closes more deals with less effort.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="/signup" className="btn-primary">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </a>
            <button className="btn-ghost">
              <Play className="h-4 w-4" />
              Watch Demo
            </button>
          </div>
          <p className="pt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            Trusted by 500+ sales teams. No credit card required.
          </p>
        </motion.div>
        {/* Right -- AI Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glow-card overflow-hidden" style={{ padding: 0 }}>
            {/* Dashboard header */}
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                <Mail className="h-4 w-4" style={{ color: "var(--color-brand-purple)" }} />
                AI Message Composer
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "var(--color-brand-emerald)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--color-brand-emerald)" }}>Live</span>
              </div>
            </div>
            {/* Typing area */}
            <div className="px-5 py-4 min-h-[140px] font-mono text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <TypewriterText text={dashboardText} speed={30} />
            </div>
            {/* Dashboard metrics bar */}
            <div className="grid grid-cols-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              {[
                { icon: TrendingUp, label: "Reply Rate", value: "47%", color: "var(--color-brand-emerald)" },
                { icon: BarChart3, label: "Success Score", value: "94", color: "var(--color-brand-purple-light)" },
                { icon: Sparkles, label: "AI Confidence", value: "High", color: "var(--color-brand-blue-light)" },
              ].map((m) => (
                <div key={m.label} className="flex flex-col items-center gap-1 px-4 py-3" style={{ background: "var(--bg-card)" }}>
                  <m.icon className="h-4 w-4" style={{ color: m.color }} />
                  <span className="text-lg font-bold" style={{ color: m.color }}>{m.value}</span>
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
