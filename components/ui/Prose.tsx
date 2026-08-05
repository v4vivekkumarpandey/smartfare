import { Breadcrumbs } from "./Breadcrumbs";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900">
        {title}
      </h1>
      {updated && (
        <p className="mt-1 text-sm text-ink-500">Last updated: {updated}</p>
      )}
      <div className="prose mt-6 space-y-4 text-ink-700 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-900 [&_a]:text-brand-600 [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed">
        {children}
      </div>
    </div>
  );
}
