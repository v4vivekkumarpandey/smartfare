import React from "react";

/**
 * Renders a small, safe markdown subset (no raw HTML, no
 * dangerouslySetInnerHTML — every element is a real React element with
 * string props):
 *   ## heading      -> h2
 *   ### heading     -> h3
 *   - item          -> bulleted list
 *   blank line      -> paragraph break
 *   **bold**        -> <strong>
 *   [text](url)     -> <a target="_blank" rel="noopener noreferrer">
 *   ![alt](src)     -> block-level <img> (must be alone on its own line)
 *   | a | b |
 *   | - | - |       -> <table> (header row + |---|---| separator required)
 */
function isSafeHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("/") ||
    href.startsWith("#")
  );
}

function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={`${keyBase}-${i}`}>{p.slice(2, -2)}</strong>;
    }
    const linkMatch = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(p);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      if (isSafeHref(href)) {
        return (
          <a
            key={`${keyBase}-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 underline underline-offset-2 hover:text-brand-900"
          >
            {label}
          </a>
        );
      }
    }
    return <React.Fragment key={`${keyBase}-${i}`}>{p}</React.Fragment>;
  });
}

const imageLineRe = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;

function isTableRow(line: string): boolean {
  return line.startsWith("|") && line.endsWith("|") && line.length > 1;
}

function parseTableRow(row: string): string[] {
  return row
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

export function PostBody({ body }: { body: string }) {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let table: string[] = [];
  let key = 0;

  const flushList = () => {
    if (list.length) {
      const items = [...list];
      blocks.push(
        <ul key={`ul-${key++}`} className="my-4 space-y-2 pl-5">
          {items.map((it, i) => (
            <li key={i} className="list-disc text-ink-700">
              {renderInline(it, `li-${key}-${i}`)}
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  const flushTable = () => {
    if (!table.length) return;
    const rows = [...table];
    table = [];

    if (rows.length < 2) {
      rows.forEach((row, i) => {
        blocks.push(
          <p key={`p-${key++}`} className="my-3 leading-relaxed text-ink-700">
            {renderInline(row, `p-fallback-${key}-${i}`)}
          </p>
        );
      });
      return;
    }

    const headerCells = parseTableRow(rows[0]);
    const separatorCells = parseTableRow(rows[1]);
    const isValidSeparator = separatorCells.every((c) => /^:?-+:?$/.test(c));

    if (!isValidSeparator) {
      rows.forEach((row, i) => {
        blocks.push(
          <p key={`p-${key++}`} className="my-3 leading-relaxed text-ink-700">
            {renderInline(row, `p-fallback-${key}-${i}`)}
          </p>
        );
      });
      return;
    }

    const bodyRows = rows.slice(2).map(parseTableRow);
    const tableKey = key++;
    blocks.push(
      <div key={`table-${tableKey}`} className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink-300">
              {headerCells.map((cell, i) => (
                <th key={i} className="py-2 pr-4 font-semibold text-ink-900">
                  {renderInline(cell, `th-${tableKey}-${i}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, ri) => (
              <tr key={ri} className="border-b border-ink-100">
                {row.map((cell, ci) => (
                  <td key={ci} className="py-2 pr-4 text-ink-700">
                    {renderInline(cell, `td-${tableKey}-${ri}-${ci}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      flushTable();
      continue;
    }

    if (isTableRow(line)) {
      flushList();
      table.push(line);
      continue;
    }
    if (table.length) flushTable();

    const imgMatch = imageLineRe.exec(line);
    if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3 key={`h3-${key++}`} className="mt-6 text-lg font-bold text-ink-900">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2 key={`h2-${key++}`} className="mt-8 text-xl font-bold text-ink-900">
          {line.slice(3)}
        </h2>
      );
    } else if (imgMatch) {
      flushList();
      const [, alt, src] = imgMatch;
      if (isSafeHref(src)) {
        // eslint-disable-next-line @next/next/no-img-element -- markdown image URLs are arbitrary/unsized, so next/image's required dimensions don't apply
        blocks.push(<img key={`img-${key++}`} src={src} alt={alt} loading="lazy" className="my-6 w-full rounded-lg" />);
      } else {
        blocks.push(
          <p key={`p-${key++}`} className="my-3 leading-relaxed text-ink-700">
            {line}
          </p>
        );
      }
    } else if (line.startsWith("- ")) {
      list.push(line.slice(2));
    } else {
      flushList();
      blocks.push(
        <p key={`p-${key++}`} className="my-3 leading-relaxed text-ink-700">
          {renderInline(line, `p-${key}`)}
        </p>
      );
    }
  }
  flushList();
  flushTable();

  return <div>{blocks}</div>;
}
