import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 5, 2026">
      <p>
        This Privacy Policy explains how {site.name} (&quot;we&quot;,
        &quot;us&quot;) collects, uses and safeguards information when you use{" "}
        {site.domain}.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Usage data:</strong> pages viewed, coupons revealed, device and
          browser type, collected via analytics cookies.
        </li>
        <li>
          <strong>Information you provide:</strong> details you send us by email,
          such as feedback or support requests.
        </li>
      </ul>

      <h2>How we use cookies</h2>
      <p>
        We use cookies and similar technologies for analytics (e.g. Google
        Analytics) and to measure the performance of advertising campaigns
        (e.g. Google Ads). Third-party affiliate networks may also set cookies to
        attribute purchases you make after clicking an outbound link. You can
        control cookies through your browser settings.
      </p>

      <h2>Advertising (Google AdSense)</h2>
      <p>
        We use third-party advertising companies, including Google, to serve ads
        on some pages of this site (such as our blog). These vendors may use
        cookies and similar technologies to serve ads based on your prior visits
        to this and other websites.
      </p>
      <ul>
        <li>
          Google&apos;s use of advertising cookies enables it and its partners to
          serve ads to you based on your visits to our site and/or other sites on
          the internet.
        </li>
        <li>
          You may opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          , or opt out of some third-party vendors&apos; use of cookies at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
            aboutads.info
          </a>
          .
        </li>
        <li>
          For visitors in the EEA/UK, ad personalisation is subject to your
          consent choices (see the cookie banner). See also{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            How Google uses information from sites that use its services
          </a>
          .
        </li>
      </ul>

      <h2>Affiliate links</h2>
      <p>
        Many outbound links on {site.name} are affiliate links. If you make a
        purchase after clicking one, we may earn a commission. This does not
        change the price you pay.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have the right to access, correct or
        delete your personal data, or to opt out of certain data uses. To make a
        request, email us at{" "}
        <a href={`mailto:privacy@${site.domain}`}>privacy@{site.domain}</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        posted on this page with a revised date.
      </p>
    </LegalPage>
  );
}
