/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        card: "var(--color-card)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        border: "var(--color-border)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        card: "var(--card-radius)",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(3,6,23,0.6)",
        glass: "0 4px 14px rgba(0,0,0,0.35)",
        neon: "0 10px 40px rgba(108,92,231,0.25)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "Segoe UI", "Helvetica", "Arial"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "24px",
        6: "32px",
      },
    },
  },
  plugins: [],
};
