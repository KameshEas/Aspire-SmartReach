/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Brand */
        "brand-purple":       "#7C3AED",
        "brand-blue":         "#2563EB",
        "brand-purple-light": "#A78BFA",
        "brand-blue-light":   "#60A5FA",
        "brand-emerald":      "#10B981",
        /* Background scale */
        "bg-base":            "#080C1A",
        "bg-surface":         "#0D1225",
        "bg-card":            "#111829",
        "bg-elevated":        "#18203A",
        /* Text */
        "text-primary":       "#F8FAFC",
        "text-secondary":     "#94A3B8",
        "text-muted":         "#64748B",
        /* Legacy aliases */
        primary:              "var(--brand-purple)",
        background:           "var(--bg-base)",
        surface:              "var(--bg-surface)",
        card:                 "var(--bg-card)",
        success:              "#10B981",
        warning:              "#F59E0B",
        error:                "#EF4444",
      },
      borderRadius: {
        sm:  "6px",
        md:  "12px",
        lg:  "16px",
        xl:  "24px",
        "2xl": "32px",
      },
      boxShadow: {
        card:     "0 8px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(124,58,237,0.12)",
        "glow-purple": "0 0 40px rgba(124,58,237,0.35)",
        "glow-blue":   "0 0 40px rgba(37,99,235,0.25)",
        cta:      "0 12px 40px rgba(124,58,237,0.40)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "gradient-brand":   "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)",
        "gradient-surface": "linear-gradient(180deg, #0D1225 0%, #080C1A 100%)",
        "gradient-card":    "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(37,99,235,0.05) 100%)",
        "gradient-radial":  "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        marquee:   "marquee 28s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
