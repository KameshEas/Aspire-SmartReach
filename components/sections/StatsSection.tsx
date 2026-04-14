"use client";

import FadeInView from "@/components/animations/FadeInView";
import CountUp from "@/components/ui/CountUp";
import { TrendingUp, Users, Mail, Clock } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: 3.2, suffix: "\u00d7", label: "Higher Reply Rates", color: "var(--color-brand-emerald)" },
  { icon: Users, value: 500, suffix: "+", label: "Sales Teams", color: "var(--color-brand-purple-light)" },
  { icon: Mail, value: 10, suffix: "M+", label: "Messages Sent", color: "var(--color-brand-blue-light)" },
  { icon: Clock, value: 68, suffix: "%", label: "Time Saved", color: "var(--color-brand-emerald)" },
];

export default function StatsSection() {
  return (
    <section id="stats" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <FadeInView>
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Proven <span className="gradient-text">Results</span>
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center" style={{ color: "var(--text-secondary)" }}>
            Real numbers from real teams using Aspire SmartReach to transform their outreach.
          </p>
        </FadeInView>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeInView key={s.label} delay={i * 0.1}>
              <div className="glow-card flex flex-col items-center gap-3 p-8 text-center">
                <s.icon className="h-8 w-8" style={{ color: s.color }} />
                <span className="text-4xl font-extrabold" style={{ color: s.color }}>
                  <CountUp end={s.value} duration={2} decimals={s.value % 1 !== 0 ? 1 : 0} />
                  {s.suffix}
                </span>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{s.label}</span>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
