import Accordion from "@/components/ui/Accordion";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Terms of Service — Aspire SmartReach",
  description: "Terms and conditions for using Aspire SmartReach.",
};

const FAQ = [
  {
    question: "How do I cancel my account?",
    answer:
      "You can cancel from account settings or contact support. Cancellation may affect access to paid data and features. See the billing section for refunds.",
  },
  {
    question: "What are the acceptable use rules?",
    answer:
      "Do not use Aspire SmartReach for illegal outreach, spam, or activities that violate the rights of others. We reserve the right to suspend abusive accounts.",
  },
  {
    question: "Do I retain ownership of my content?",
    answer:
      "Yes — you retain ownership of your workspace content. We require a license to host and operate the services on your behalf.",
  },
  {
    question: "How are disputes handled?",
    answer:
      "Our terms include a governing law and dispute resolution section; contractual disputes should be addressed via the channels described in the terms.",
  },
];

export default function Page() {
  return (
    <div className="relative min-h-screen pt-16 pb-6 px-4 sm:px-6" style={{ background: "linear-gradient(180deg,#040617 0%, #071025 60%, #08141f 100%)" }}>
      <Navbar minimal />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(99,102,241,0.05)" }} />
        <div className="absolute right-0 -bottom-8 h-48 w-48 rounded-full blur-2xl" style={{ background: "rgba(34,197,94,0.03)" }} />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl grid grid-cols-1 gap-8 lg:grid-cols-12 min-w-0">
        <section className="lg:col-span-7 min-w-0 rounded-lg p-8" style={{ background: "transparent" }}>
          <h1 className="text-3xl font-extrabold mb-3" style={{ color: "var(--text-primary)" }}>Terms of Service</h1>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            These Terms govern your access to and use of Aspire SmartReach. Please read them carefully before using the service.
          </p>

          <div className="space-y-6 text-sm" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Account Terms</h3>
              <p>
                You are responsible for maintaining the security of your account. Keep your credentials secure and do not share access.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Paid Services & Billing</h3>
              <p>
                Paid features are billed per the subscription plan. Refunds and cancellations are addressed in the billing policy.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Limitation of Liability</h3>
              <p>
                To the extent permitted by law, our liability is limited as described in the agreement. We encourage you to review this section in full.
              </p>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-5 min-w-0 rounded-lg p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", boxShadow: "var(--glow-card)" }}>
          <h4 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Common Questions</h4>
          <Accordion items={FAQ} idPrefix="terms-faq" />

          <div className="mt-6 text-xs text-center" style={{ color: "var(--text-muted)" }}>
            Need more help? Contact <a href="mailto:support@aspire.ai" className="underline font-medium" style={{ color: "var(--color-brand-purple-light)" }}>support@aspire.ai</a>.
          </div>
        </aside>
      </main>
      <Footer minimal />
    </div>
  );
}
