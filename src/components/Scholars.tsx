"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { scholars, scholarStats } from "@/content/scholars";
import { Badge, Counter, Heading, Reveal, Section } from "./ui";

export function Scholars() {
  const [q, setQ] = useState("");
  const [d, setD] = useState("All");
  const domains = useMemo(() => [...new Set(scholars.map((s) => s.domain))].sort(), []);
  const byYear = useMemo(() => {
    const m = new Map<number, number>();
    scholars.forEach((s) => m.set(s.year, (m.get(s.year) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => a[0] - b[0]);
  }, []);
  const maxY = Math.max(...byYear.map((y) => y[1]));
  const list = scholars.filter((s) => (d === "All" || s.domain === d) && (!q || `${s.name} ${s.title}`.toLowerCase().includes(q.toLowerCase())));

  const stats = [
    { n: scholarStats.phdGuided, l: "Ph.D. scholars guided" },
    { n: scholarStats.phdInProgress, l: "currently guiding" },
    { n: scholarStats.mtechTheses, l: "M.Tech. theses" },
    { n: scholarStats.btechProjects, l: "B.Tech. projects" },
  ];
  return (
    <Section id="scholars">
      <Heading id="scholars" lead="Doctoral scholars at DBATU, listed with their thesis titles and year of completion. Where a second guide supervised, that is shown.">
        Nineteen doctorates in nine research areas.
      </Heading>

      <div className="grid grid-cols-2 border-y border-[var(--line)] md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.l} className={`py-7 ${i ? "border-l border-[var(--line)] pl-6" : ""}`}>
            <p className="num text-[clamp(2.4rem,5vw,4rem)] leading-none">
              <Counter to={s.n} />
              {s.l.includes("projects") && "+"}
            </p>
            <p className="mt-2 text-muted">{s.l}</p>
          </div>
        ))}
      </div>

      <Reveal className="mt-14">
        <h3 className="text-2xl">Completions by year</h3>
        <div className="mt-6 flex h-40 items-end gap-2" role="img" aria-label="Number of Ph.D. completions per year, 2014 to 2026">
          {byYear.map(([y, n]) => (
            <div key={y} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <div className="w-full rounded-t-[2px] bg-[var(--sage)] transition-[height] duration-1000" style={{ height: `${(n / maxY) * 100}%` }} title={`${y}: ${n}`} />
              <span className="num text-xs text-muted">{String(y).slice(2)}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 flex flex-wrap items-center gap-3">
        <label className="relative block min-w-64 flex-1">
          <span className="sr-only">Search scholars or topics</span>
          <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a scholar or research topic" className="h-11 w-full rounded-[3px] border border-[var(--line)] bg-paper pr-3 pl-9" />
        </label>
        <label>
          <span className="sr-only">Filter by field</span>
          <select value={d} onChange={(e) => setD(e.target.value)} className="h-11 rounded-[3px] border border-[var(--line)] bg-paper px-3">
            <option>All</option>
            {domains.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>

      <ol className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {list.map((s) => (
          <li key={s.roll} className="grid gap-x-8 gap-y-2 py-5 md:grid-cols-[5rem_1fr_16rem]">
            <span className="num text-2xl text-muted">{s.year}</span>
            <div>
              <h3 className="font-serif text-[1.25rem] leading-snug">{s.title}</h3>
              <p className="mt-1 text-ink2">{s.name}</p>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <Badge tone="sage">{s.domain}</Badge>
              <span className="text-sm text-muted md:text-right">{s.role === "Co-guide" ? `Co-guide with ${s.coGuide}` : s.coGuide ? `With ${s.coGuide}` : "Guide"}</span>
            </div>
          </li>
        ))}
        {list.length === 0 && <li className="py-12 text-center text-muted">No scholars match. Clear the search to see all nineteen.</li>}
      </ol>
    </Section>
  );
}
