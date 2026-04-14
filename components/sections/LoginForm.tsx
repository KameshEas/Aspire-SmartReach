"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Zap, Loader2, Sparkles } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Sign in failed");
        setSubmitting(false);
        return;
      }

      // store a short-lived dev token locally; real auth will replace this
      try {
        if (data?.token) localStorage.setItem("token", data.token);
      } catch (err) {
        // ignore storage errors in some environments
      }

      // redirect to dashboard on success
      router.push("/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:p-6 overflow-x-hidden" style={{ background: "var(--bg-base)" }}>
      <main className="relative z-10 grid w-full max-w-5xl min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* Left branding (matching signup look) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden flex-col items-start space-y-6 text-left lg:col-span-5 lg:flex min-w-0"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg" style={{ background: "var(--gradient-brand)" }}>
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <Link href="/" className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-brand-purple)" }}>
              Aspire SmartReach
            </Link>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold leading-tight" style={{ color: "var(--text-primary)" }}>
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Sign in to continue to your workspace and manage intelligent automation.
            </p>
          </div>
        </motion.div>

        {/* Right column - Login card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-7 min-w-0">
          <div className="relative overflow-hidden rounded-[1.5rem] p-6 sm:p-8 w-full min-w-0 mx-auto" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", boxShadow: "var(--glow-card)", maxWidth: 'min(720px, calc(100vw - 3rem))' }}>

            <div className="mb-6 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                <ArrowLeft className="h-4 w-4" />
                Back to Landing
              </Link>
              <Link href="/signup" className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: "var(--color-brand-emerald)" }}>
                Create account
              </Link>
            </div>

            <header className="mb-6">
              <h3 id="login-heading" className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Sign in to Aspire SmartReach
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                Securely sign in to manage automations and reach more customers.
              </p>
            </header>

            <form id="login-form" className="space-y-4 min-w-0" onSubmit={handleSubmit} aria-labelledby="login-heading">
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="ml-1 text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  Email Address
                </label>
                <input id="login-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field w-full min-w-0" required />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="login-password" className="ml-1 text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  Password
                </label>
                <div className="relative">
                  <input id="login-password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field w-full pr-12" required autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5" style={{ color: "var(--text-secondary)", background: "var(--bg-elevated)" }} aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4" style={{ accentColor: "var(--color-brand-purple)" }} />
                  Remember me
                </label>
                <Link href="#" className="text-sm font-medium" style={{ color: "var(--color-brand-purple-light)" }}>Forgot password?</Link>
              </div>

              <button type="submit" disabled={submitting} className="btn-primary relative w-full py-3 text-base font-bold tracking-wide disabled:opacity-70" style={{ boxShadow: "var(--glow-cta)" }}>
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <div className="flex items-center justify-center gap-3"><span>Sign In</span><Zap className="h-5 w-5" /></div>}
              </button>

              <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>Signing in is secure and fast</p>
              {error && <p className="text-center text-sm text-red-400 mt-2">{error}</p>}
            </form>

            <div className="relative flex items-center py-6">
              <div className="flex-grow" style={{ borderTop: "1px solid var(--border-default)" }} />
              <span className="mx-4 shrink-0 text-xs font-medium uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>or continue with</span>
              <div className="flex-grow" style={{ borderTop: "1px solid var(--border-default)" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button type="button" className="social-btn w-full" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", color: "#1F2937" }} aria-label="Continue with Google">
                <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>

              <button type="button" className="social-btn w-full" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }} aria-label="Continue with GitHub">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                GitHub
              </button>
            </div>

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full blur-[60px]" style={{ background: "rgba(37,99,235,0.04)" }} />
          </div>
        </motion.div>

        {/* Mobile branding (below form) */}
        <div className="flex flex-col items-center space-y-4 text-center lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "var(--gradient-brand)" }}>
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold" style={{ color: "var(--color-brand-purple)" }}>Aspire SmartReach</span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Sign in and get back to work.</p>
        </div>
      </main>
    </div>
  );
}
