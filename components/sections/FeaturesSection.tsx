"use client";

import FadeInView from "@/components/animations/FadeInView";
import { Brain, Workflow, BarChart3, Shield, Globe, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Crafted Messages",
    description: "Every message is uniquely generated using prospect data, ensuring authentic personalization at scale.",
  },
  {
    icon: Workflow,
    title: "Smart Sequences",
    description: "Automated multi-channel sequences adapt in real-time based on prospect engagement signals.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track open rates, reply rates, and conversion metrics with live dashboards and alerts.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption, SSO, and role-based access controls.",
  },
  {
    icon: Globe,
    title: "Multi-Channel Reach",
    description: "Engage prospects across email, LinkedIn, and phone from a single unified platform.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Connect your CRM and start sending in minutes. No code required, no lengthy onboarding.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-6" style={{ background: "var(--bg-surface)" }}>
      <div className="mx-auto max-w-6xl">
        <FadeInView>
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Everything you need to{" "}
            <span className="gradient-text">close more deals</span>
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center" style={{ color: "var(--text-secondary)" }}>
            A complete AI-powered outreach platform built for modern sales teams.
          </p>
        </FadeInView>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeInView key={f.title} delay={i * 0.08}>
              <div className="glow-card flex flex-col gap-4 p-7 h-full">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{ background: "rgba(124,58,237,0.1)" }}
                >
                  <f.icon className="h-5 w-5" style={{ color: "var(--color-brand-purple-light)" }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.description}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
