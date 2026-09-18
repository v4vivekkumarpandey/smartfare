import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Editorial Process",
  description: `How the ${site.name} editorial team researches, writes and keeps provider reviews up to date.`,
  alternates: { canonical: "/editorial-process" },
};

export default function EditorialProcessPage() {
  return (
    <LegalPage title="Our Editorial Process">
      <p>
        Reviews and comparisons on {site.name} are researched and written by our
        editorial team, not generated on demand for a single query. This page
        explains how that research is done and what it does — and doesn&apos;t
        — include.
      </p>
      <h2>How we research a provider</h2>
      <p>
        For every review we start from each provider&apos;s own pricing pages,
        plan documentation and terms of service, since those are the source of
        truth for what a plan actually includes and what it renews at. We then
        cross-check that against publicly available information: independent
        user reviews, support-community threads, uptime/status pages and
        official changelogs, to catch gaps between marketing copy and what
        customers actually report.
      </p>
      <p>
        We do not run our own hosting benchmarks or claim in-house lab testing
        unless a specific article says so explicitly. Where an article
        describes typical performance, feature behavior or support quality, it
        reflects this aggregated research rather than a first-hand test by our
        team — we&apos;d rather be upfront about that than imply testing that
        didn&apos;t happen.
      </p>
      <h2>Keeping reviews current</h2>
      <p>
        Providers change pricing, plans and features often. When we become
        aware a review is out of date — through our own periodic re-checks or
        reader feedback — we update the article and its dates instead of
        leaving it stale. Coupon codes referenced in reviews follow the same
        verification process described in <a href="/about">About Us</a>.
      </p>
      <h2>How we make money</h2>
      <p>
        {site.name} may earn a commission when you sign up through a link on
        the site, at no extra cost to you. Our editorial team decides what to
        cover and how to rank options based on the research above — commercial
        relationships don&apos;t change what we write.
      </p>
      <h2>Spotted something outdated?</h2>
      <p>
        If a price, feature or claim in one of our reviews is out of date,
        please <a href="/contact">let us know</a> and we&apos;ll correct it.
      </p>
    </LegalPage>
  );
}
