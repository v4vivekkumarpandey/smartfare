import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms governing your use of ${site.name}.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="August 5, 2026">
      <p>
        By accessing {site.domain} you agree to these Terms of Use. If you do not
        agree, please do not use the site.
      </p>

      <h2>Coupons and offers</h2>
      <p>
        We work hard to keep coupon codes and deals accurate and up to date, but
        offers change frequently and may expire or sell out without notice. We do
        not guarantee that any code will work, and we are not responsible for the
        pricing, availability or fulfilment of any merchant&apos;s products or
        services. Always confirm the final price on the merchant&apos;s site
        before purchasing.
      </p>

      <h2>Affiliate relationships</h2>
      <p>
        {site.name} participates in affiliate programs and may earn a commission
        when you purchase through links on our site, at no extra cost to you.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All trademarks, logos and brand names are the property of their
        respective owners and are used for identification purposes only. Their
        use does not imply endorsement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The site is provided &quot;as is&quot; without warranties of any kind. To
        the fullest extent permitted by law, {site.name} is not liable for any
        loss arising from your use of the site or reliance on any offer.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:support@${site.domain}`}>support@{site.domain}</a>.
      </p>
    </LegalPage>
  );
}
