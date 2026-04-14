"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Zap,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Password strength helper                                           */
/* ------------------------------------------------------------------ */
const PW_RULES = [
  { label: "8+ characters", test: (p: string) => p.length >= 8 },
  { label: "Uppercase & lowercase", test: (p: string) => /[A-Z]/.test(p) && /[a-z]/.test(p) },
  { label: "A number", test: (p: string) => /\d/.test(p) },
  { label: "A symbol", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];
function getStrength(pw: string) {
  if (!pw) return 0;
  return PW_RULES.filter((r) => r.test(pw)).length;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [wsStatus, setWsStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [showCopilot, setShowCopilot] = useState(false);
  const [formFocused, setFormFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const wsTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const strength = getStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  // Delay copilot bubble appearance
  useEffect(() => {
    const t = setTimeout(() => setShowCopilot(true), 6000);
    return () => clearTimeout(t);
  }, []);

  // Simulated workspace availability check
  useEffect(() => {
    if (!workspace) { setWsStatus("idle"); return; }
    setWsStatus("checking");
    if (wsTimer.current) clearTimeout(wsTimer.current);
    wsTimer.current = setTimeout(() => {
      setWsStatus(workspace.toLowerCase() === "taken" ? "taken" : "available");
    }, 900);
    return () => { if (wsTimer.current) clearTimeout(wsTimer.current); };
  }, [workspace]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 2000);
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:p-6 overflow-x-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 h-64 w-64 rounded-full blur-[120px]"
          style={{ background: "rgba(124,58,237,0.08)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-[120px]"
          style={{ background: "rgba(37,99,235,0.06)" }}
        />
      </div>

      <main className="relative z-10 grid w-full max-w-5xl min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* ============================================================ */}
        {/* Left Column — Branding (dimmed when form is focused)         */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: formFocused ? 0.5 : 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden flex-col items-start space-y-8 text-left lg:col-span-5 lg:flex min-w-0"
          style={{ transition: "opacity 0.4s ease" }}
        >
          {/* Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
                style={{ background: "var(--gradient-brand)", boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
              >
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <Link href="/" className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-brand-purple)" }}>
                Aspire SmartReach
              </Link>
            </div>

            {/* Copilot chat bubble — delayed appearance */}
            <AnimatePresence>
              {showCopilot && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-4 pt-4"
                >
                  <div className="relative shrink-0">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ background: "var(--gradient-brand)", border: "2px solid rgba(124,58,237,0.3)" }}
                    >
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div
                      className="absolute bottom-0 right-0 h-3 w-3 rounded-full"
                      style={{ background: "var(--color-brand-emerald)", border: "2px solid var(--bg-base)" }}
                    />
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-none p-4"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <p className="mb-1 text-sm font-semibold" style={{ color: "var(--color-brand-purple-light)" }}>
                      Need help setting up?
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      I can guide you through workspace setup after you create your account.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight" style={{ color: "var(--text-primary)" }}>
              Scale your impact with{" "}
              <span className="gradient-text">Intelligent</span> automation.
            </h2>
            <div className="flex flex-wrap gap-3">
              {["AI-Powered Personalization", "Omnichannel Flows"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <CheckCircle className="h-3.5 w-3.5" style={{ color: "var(--color-brand-emerald)" }} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* Right Column — Sign Up Card (only this block updated)      */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-7 min-w-0"
        >
          <div
            className="relative overflow-hidden rounded-[2rem] p-6 shadow-2xl sm:p-8 md:p-12 w-full min-w-0"
            style={{
              background: "var(--bg-card)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--glow-card)",
              maxWidth: 'calc(100vw - 3rem)',
            }}
          >
            {/* Top nav row */}
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
                style={{ color: "var(--text-secondary)" }}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Landing
              </Link>
              <Link
                href="/login"
                className="text-sm font-semibold underline-offset-4 hover:underline"
                style={{ color: "var(--color-brand-emerald)" }}
              >
                Login
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h3 id="signup-heading" className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Create your workspace
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                Join 1,500+ teams using Aspire SmartReach.
              </p>
            </div>

            {/* ------ Form (focus handled on the form to control left-column dimming) ------ */}
            <form
              id="signup-form"
              className="space-y-5 min-w-0"
              onSubmit={handleSubmit}
              onFocus={() => setFormFocused(true)}
              onBlur={() => setTimeout(() => setFormFocused(false), 100)}
              aria-labelledby="signup-heading"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="ml-1 flex items-baseline gap-2 text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    Name
                    <span className="text-[11px] font-normal" style={{ color: "var(--text-muted)" }}>Optional</span>
                  </label>
                  <input id="name" name="name" type="text" autoComplete="name" placeholder="Enter your name" className="input-field" />
                </div>
                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="ml-1 text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    Email Address <span style={{ color: "var(--color-brand-purple-light)" }}>*</span>
                  </label>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className="input-field" required aria-required="true" />
                </div>
              </div>

              {/* Workspace URL */}
              <div className="space-y-1.5">
                <label htmlFor="workspace" className="ml-1 text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  Workspace URL <span style={{ color: "var(--color-brand-purple-light)" }}>*</span>
                </label>
                <div className="relative flex min-w-0">
                  <input
                    id="workspace"
                    name="workspace"
                    type="text"
                    placeholder="your-workspace"
                    value={workspace}
                    onChange={(e) => setWorkspace(e.target.value.replace(/[^a-z0-9-]/gi, "").toLowerCase())}
                    className="input-field flex-1 min-w-0"
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    required
                    aria-describedby="workspace-status"
                    autoComplete="off"
                  />
                  <span
                    className="flex items-center border border-l-0 px-4 text-sm font-medium"
                    style={{
                      background: "var(--bg-elevated)",
                      color: "var(--text-muted)",
                      borderColor: "var(--border-subtle)",
                      borderRadius: "0 var(--radius-xl) var(--radius-xl) 0",
                    }}
                  >
                    .aspire.ai
                  </span>
                </div>
                {/* Workspace status */}
                {workspace && (
                  <div id="workspace-status" role="status" aria-live="polite" className="ml-1 mt-1 flex items-center gap-1.5 text-xs font-medium">
                    {wsStatus === "checking" && (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: "var(--text-muted)" }} />
                        <span style={{ color: "var(--text-muted)" }}>Checking availability…</span>
                      </>
                    )}
                    {wsStatus === "available" && (
                      <>
                        <CheckCircle className="h-3.5 w-3.5" style={{ color: "var(--color-brand-emerald)" }} />
                        <span style={{ color: "var(--color-brand-emerald)" }}>{workspace}.aspire.ai is available</span>
                      </>
                    )}
                    {wsStatus === "taken" && (
                      <>
                        <XCircle className="h-3.5 w-3.5" style={{ color: "#EF4444" }} />
                        <span style={{ color: "#EF4444" }}>Already taken — try another name</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="ml-1 text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  Password <span style={{ color: "var(--color-brand-purple-light)" }}>*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field w-full pr-12"
                    required
                    aria-describedby="password-rules"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 transition-colors"
                    style={{ color: "var(--text-secondary)", background: "var(--bg-elevated)" }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                  </button>
                </div>
                {/* Strength bars */}
                <div className="mt-2 flex gap-1 px-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1.5 flex-1 rounded-full transition-all duration-300"
                      style={{
                        background: i < strength
                          ? strength <= 2 ? "#F59E0B" : "var(--color-brand-emerald)"
                          : "var(--border-subtle)",
                      }}
                    />
                  ))}
                </div>
                {/* Password rules */}
                {password.length > 0 && (
                  <div id="password-rules" className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 px-1" aria-live="polite">
                    {PW_RULES.map((rule) => {
                      const pass = rule.test(password);
                      return (
                        <span key={rule.label} className="flex items-center gap-1.5 text-[11px]"
                          style={{ color: pass ? "var(--color-brand-emerald)" : "var(--text-muted)" }}>
                          {pass ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {rule.label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="ml-1 text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  Confirm Password <span style={{ color: "var(--color-brand-purple-light)" }}>*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field w-full"
                  required
                  aria-describedby="confirm-status"
                  autoComplete="new-password"
                />
                {confirmPassword.length > 0 && (
                  <div id="confirm-status" className="ml-1 mt-1 flex items-center gap-1.5 text-[11px] font-medium" aria-live="polite">
                    {passwordsMatch ? (
                      <>
                        <CheckCircle className="h-3 w-3" style={{ color: "var(--color-brand-emerald)" }} />
                        <span style={{ color: "var(--color-brand-emerald)" }}>Passwords match</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3" style={{ color: "#EF4444" }} />
                        <span style={{ color: "#EF4444" }}>Passwords do not match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Terms */}
              <label
                htmlFor="terms"
                className="flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="mt-0.5 h-5 w-5 shrink-0 rounded"
                  style={{ accentColor: "var(--color-brand-purple)" }}
                />
                <span className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  I agree to the {" "}
                  <Link href="/terms" className="font-semibold underline" style={{ color: "var(--color-brand-purple-light)" }}>Terms of Service</Link>{" "}
                  and {" "}
                  <Link href="/privacy" className="font-semibold underline" style={{ color: "var(--color-brand-purple-light)" }}>Privacy Policy</Link>.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary relative w-full py-4 text-base font-bold tracking-wide disabled:opacity-70"
                style={{ boxShadow: "var(--glow-cta)" }}
                aria-live="polite"
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span>Create Workspace</span>
                    <Zap className="h-5 w-5" />
                  </div>
                )}
              </button>
              <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
                Takes less than 30 seconds
              </p>
            </form>

            {/* Divider */}
            <div className="relative flex items-center py-6">
              <div className="flex-grow" style={{ borderTop: "1px solid var(--border-default)" }} />
              <span
                className="mx-4 shrink-0 text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: "var(--text-secondary)" }}
              >
                or continue with
              </span>
              <div className="flex-grow" style={{ borderTop: "1px solid var(--border-default)" }} />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                className="social-btn w-full"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  color: "#1F2937",
                }}
                aria-label="Continue with Google"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="social-btn w-full"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                }}
                aria-label="Continue with GitHub"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Card decoration */}
            <div
              className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full blur-[60px]"
              style={{ background: "rgba(37,99,235,0.04)" }}
            />
          </div>
        </motion.div>

        {/* Mobile branding (below form) */}
        <div className="flex flex-col items-center space-y-4 text-center lg:hidden">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold" style={{ color: "var(--color-brand-purple)" }}>
              Aspire SmartReach
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Start automating outreach in minutes.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="fixed bottom-4 left-0 w-full px-8 text-center text-[10px] font-light uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        <span>&copy; {new Date().getFullYear()} Aspire SmartReach</span>
        <span className="mx-2 hidden md:inline">&bull;</span>
        <span className="hidden md:inline">Secure ISO 27001 Certified Environment</span>
      </footer>
    </div>
  );
}