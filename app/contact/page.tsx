import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { LegalPage } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${site.name} team about coupons, partnerships or feedback.`,
};

export default function ContactPage() {
  return (
    <LegalPage title="Contact Us">
      <p>
        We&apos;re here to help. Whether you spotted an expired code, want to
        suggest a store, or are interested in a partnership, reach out and
        we&apos;ll get back to you.
      </p>

      <div className="not-prose mt-6 rounded-card border border-ink-100 bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Mail width={20} height={20} />
          </span>
          <div>
            <p className="text-sm text-ink-500">Email us at</p>
            <a
              href={`mailto:support@${site.domain}`}
              className="text-lg font-bold text-ink-900 hover:text-brand-600"
            >
              support@{site.domain}
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm text-ink-500">
          We typically respond within 1–2 business days.
        </p>
      </div>

      <h2>What to include</h2>
      <ul>
        <li>The store and coupon in question (a link helps).</li>
        <li>What happened when you tried the code.</li>
        <li>Any screenshots, if relevant.</li>
      </ul>
    </LegalPage>
  );
}
