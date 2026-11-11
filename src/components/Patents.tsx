import { patents } from "@/content/patents";
import { fmtDate } from "@/lib/format";
import { Heading, Reveal, Section } from "./ui";

export function Patents() {
  return (
    <Section id="patents" tone="surface">
      <Heading id="patents" lead="All nine entries from the biodata, in its order. Each shows only the details it records: numbers, jurisdiction and the filing, publication and grant dates where they are given.">
        Patents and designs.
      </Heading>

      <ul className="border-b border-[var(--line)]">
        {patents.map((p) => {
          const rows: [string, string][] = [[p.numberLabel, p.number]];
          if (p.jurisdiction) rows.push(["Jurisdiction", p.jurisdiction]);
          if (p.filed) rows.push(["Filed", fmtDate(p.filed)]);
          if (p.published) rows.push(["Published", fmtDate(p.published)]);
          if (p.granted) rows.push(["Granted", fmtDate(p.granted)]);
          return (
            <Reveal key={p.id}>
              <li className="grid gap-x-12 gap-y-4 border-t border-[var(--line)] py-8 md:grid-cols-12">
                <div className="md:col-span-7">
                  {p.type && <p className="mb-2 text-sm text-muted">{p.type}</p>}
                  <h3 className="text-[clamp(1.3rem,2.2vw,1.75rem)] leading-snug">{p.title}</h3>
                  {p.remarks && (
                    <ul className="mt-3 space-y-1 text-[0.97rem] text-ink2">
                      {p.remarks.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <dl className="grid grid-cols-[auto_1fr] content-start gap-x-6 gap-y-1.5 text-[0.97rem] md:col-span-5">
                  {rows.map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-muted">{k}</dt>
                      <dd className="num">{v}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
