import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn how ${site.name} finds, tests and verifies coupon codes so you always save.`,
};

export default function AboutPage() {
  return (
    <LegalPage title="About Us">
      <p>
        {site.name} is an independent savings platform on a simple mission: help
        shoppers pay less. Every day our team gathers promo codes and deals from
        hundreds of brands, tests them, and publishes only the ones that work.
      </p>
      <h2>How we verify coupons</h2>
      <p>
        Each code on our site is checked against the merchant&apos;s checkout.
        Working codes get a <strong>Verified</strong> badge and a live success
        rate based on feedback from real users. When a code stops working, we
        remove or flag it — so you never waste time on dead codes.
      </p>
      <h2>How we make money</h2>
      <p>
        {site.name} is free to use. When you click a link or use a code and go on
        to make a purchase, we may earn a small commission from the merchant at
        no additional cost to you. This is what keeps our team verifying deals
        and our service free. It never affects which coupons we show or how we
        rank them.
      </p>
      <h2>Get in touch</h2>
      <p>
        Found an expired code or have a store you&apos;d like us to cover? We&apos;d
        love to hear from you — visit our <a href="/contact">contact page</a>.
      </p>
    </LegalPage>
  );
}
