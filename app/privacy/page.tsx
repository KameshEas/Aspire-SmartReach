import Accordion from "@/components/ui/Accordion";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Privacy Policy — Aspire SmartReach",
  description: "How Aspire SmartReach collects, uses, and protects your information.",
};

const FAQ = [
  {
    question: "What information do you collect?",
    answer:
      "We collect information you provide directly (account details, workspace name), usage data (feature usage, errors), and technical data (browser, IP). We never sell personal data.",
  },
  {
    question: "How is my data used?",
    answer:
      "Data is used to provide and improve our services, personalize your experience, secure accounts, and communicate important updates. Aggregated analytics help us improve product quality.",
  },
  {
    question: "Can I delete my data?",
    answer:
      "Yes — contact support to request deletion of your account and associated data, or use the account settings when available to remove your workspace.",
  },
  {
    question: "How is data secured?",
    answer:
      "We use industry-standard encryption in transit and at rest, regular audits, and access controls. For enterprise customers we offer contract-level security controls.",
  },
];

export default function Page() {
  return (
    <div className="relative min-h-screen pt-16 pb-6 px-4 sm:px-6" style={{ background: "linear-gradient(180deg,#061220 0%, #071225 50%, #020313 100%)" }}>
      <Navbar minimal />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-32 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(124,58,237,0.06)" }} />
        <div className="absolute -right-28 bottom-8 h-64 w-64 rounded-full blur-2xl" style={{ background: "rgba(37,99,235,0.04)" }} />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl grid grid-cols-1 gap-8 lg:grid-cols-12 min-w-0">
        <section className="lg:col-span-7 min-w-0 rounded-lg p-8" style={{ background: "transparent" }}>
          <h1 className="text-3xl font-extrabold mb-3" style={{ color: "var(--text-primary)" }}>Privacy Policy</h1>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            Last updated: April 14, 2026. Aspire SmartReach (&quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy. This policy explains what information we collect and how we use it.
          </p>

          <div className="space-y-6 text-sm" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Information We Collect</h3>
              <p>
                Account and profile information, workspace configuration, content you create, billing and payment details when applicable, and anonymized usage metrics.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>How We Use Information</h3>
              <p>
                To deliver services, detect abuse, personalize features, provide support, and for legal and security purposes. We may send transactional emails about your account.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Third Parties</h3>
              <p>
                We use select service providers (hosting, analytics, payments). We share data only as necessary to provide services and with your consent.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Contact</h3>
              <p>
                Questions? Email <a href="mailto:support@aspire.ai" className="font-semibold underline" style={{ color: "var(--color-brand-purple-light)" }}>support@aspire.ai</a>.
              </p>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-5 min-w-0 rounded-lg p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", boxShadow: "var(--glow-card)" }}>
          <h4 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h4>
          <Accordion items={FAQ} idPrefix="privacy-faq" />

          <div className="mt-6 text-xs text-center" style={{ color: "var(--text-muted)" }}>
            By using our services you agree to the <Link href="/terms" className="underline font-medium" style={{ color: "var(--color-brand-purple-light)" }}>Terms of Service</Link>.
          </div>
        </aside>
      </main>
      <Footer minimal/>
    </div>
  );
}
