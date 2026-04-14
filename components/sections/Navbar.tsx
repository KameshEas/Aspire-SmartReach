"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Results", href: "#stats" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
      style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          <Zap className="h-5 w-5" style={{ color: "var(--color-brand-purple)" }} />
          <span>Aspire</span>
          <span className="gradient-text">SmartReach</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
              {l.label}
            </a>
          ))}
          <a href="/signup" className="btn-primary text-sm px-5 py-2">Get Early Access</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: "var(--text-secondary)" }} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden" style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  {l.label}
                </a>
              ))}
              <a href="/signup" onClick={() => setOpen(false)} className="btn-primary text-sm text-center">Get Early Access</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
