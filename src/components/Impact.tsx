"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { metricSources } from "@/content/profile";
import type { LiveMetrics } from "@/lib/data";
import { Counter, ExternalLink, Heading, Reveal, Section, fmtDate } from "./ui";

export function Impact({ live, pubCount }: { live: LiveMetrics; pubCount: number }) {
  const rows = metricSources
    .filter((m) => m.source !== "Biodata 2026")
    .map((m) => (live && m.source === "OpenAlex" ? { ...m, citations: live.citations, hIndex: live.hIndex, i10: live.i10, works: `${live.works} works`, retrieved: live.retrieved, how: "Public API" as const } : m));
  const first = metricSources[0];
  const cols: { k: "citations" | "hIndex" | "i10"; l: string }[] = [
    { k: "citations", l: "Citations" },
    { k: "hIndex", l: "h-index" },
    { k: "i10", l: "i10-index" },
  ];
  return (
    <Section id="impact">
      <Heading id="impact" lead="Platforms count differently and refresh on their own schedules, so each figure is shown against its source and the date it was read. None is merged or averaged.">
        Research impact, source by source.
      </Heading>

      <div className="grid gap-px overflow-hidden rounded-[3px] border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
        {cols.map((c) => (
          <div key={c.k} className="bg-paper p-7">
            <p className="text-muted">{c.l}</p>
            <div className="mt-4 space-y-3">
              {rows.map((r) => (
                <div key={r.source} className="flex items-baseline justify-between gap-4 border-t border-[var(--line-soft)] pt-3 first:border-0 first:pt-0">
                  <span className="text-sm text-ink2">{r.source}</span>
                  <span className={`num ${r === rows[0] ? "text-4xl text-forest" : "text-3xl"}`}>
                    <Counter to={r[c.k] ?? 0} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Reveal className="mt-14 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left text-[0.95rem]">
          <caption className="sr-only">Where each metric comes from</caption>
          <thead>
            <tr className="border-b border-[var(--ink)] text-muted">
              <th className="py-3 pr-4 font-normal">Source</th>
              <th className="py-3 pr-4 font-normal">How it was obtained</th>
              <th className="py-3 pr-4 font-normal">Retrieved</th>
              <th className="py-3 font-normal">Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.source} className="border-b border-[var(--line)] align-top">
                <td className="py-4 pr-4">
                  <ExternalLink href={r.url}>{r.source}</ExternalLink>
                </td>
                <td className="py-4 pr-4 text-ink2">{r.how}</td>
                <td className="py-4 pr-4 whitespace-nowrap">{fmtDate(r.retrieved)}</td>
                <td className="py-4 text-ink2">{[r.works, r.note].filter(Boolean).join(". ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <div className="mt-20 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <h3 className="text-3xl">Output beyond citations</h3>
          <dl className="mt-6 space-y-5">
            {[
              [first.works ?? "", "journal and conference papers, as reported in the biodata"],
              [`${pubCount}`, "records searchable in the library below, merged from ORCID, OpenAlex and the biodata"],
              ["5 + 25", "books and book chapters, as reported in the biodata"],
            ].map(([n, l]) => (
              <div key={l} className="border-t border-[var(--line)] pt-4">
                <dt className="num text-2xl">{n}</dt>
                <dd className="text-[0.95rem] text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="md:col-span-8">
          {live ? (
            <>
              <h3 className="text-3xl">Citations per year</h3>
              <p className="mb-4 text-sm text-muted">OpenAlex, retrieved {fmtDate(live.retrieved)}. Scholar counts are higher because it indexes more venues.</p>
              <div className="h-72 w-full" role="img" aria-label="Bar chart of citations per year from OpenAlex">
                <ResponsiveContainer>
                  <BarChart data={live.byYear} margin={{ left: -18, right: 4, top: 8 }}>
                    <CartesianGrid stroke="var(--line)" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "var(--muted)", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "var(--line)" }} />
                    <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: "var(--line-soft)" }} contentStyle={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 3, color: "var(--ink)" }} />
                    <Bar dataKey="cites" name="Citations" fill="var(--sage)" radius={[2, 2, 0, 0]} isAnimationActive animationDuration={1400} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
