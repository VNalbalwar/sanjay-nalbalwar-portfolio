"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import type { Publication } from "@/content/types";
import { DOMAINS } from "@/content/publications-biodata";
import { profileLinks } from "@/content/profile";
import { Badge, ExternalLink, Heading, Section, ease, fmtDate } from "./ui";

const PAGE = 10;
const typeLabel = { journal: "Journal", conference: "Conference", chapter: "Book chapter", book: "Book" } as const;

export function Library({ items, live, retrieved, sources }: { items: Publication[]; live: boolean; retrieved: string; sources: { orcid: number; openalex: number; biodata: number } }) {
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q);
  const [domain, setDomain] = useState("All");
  const [type, setType] = useState("All");
  const [year, setYear] = useState("All");
  const [page, setPage] = useState(0);
  const years = useMemo(() => [...new Set(items.map((p) => p.year))].sort((a, b) => b - a), [items]);

  const filtered = useMemo(() => {
    const n = dq.trim().toLowerCase();
    return items.filter((p) => (domain === "All" || p.domain === domain) && (type === "All" || p.type === type) && (year === "All" || p.year === +year) && (!n || `${p.title} ${p.venue} ${p.indexing ?? ""}`.toLowerCase().includes(n)));
  }, [items, dq, domain, type, year]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const shown = filtered.slice(page * PAGE, page * PAGE + PAGE);
  const sel = "h-11 rounded-[3px] border border-[var(--line)] bg-paper px-3 text-[0.95rem]";

  return (
    <Section id="library">
      <Heading id="library" lead={`${items.length} records, merged from ORCID (${sources.orcid}), OpenAlex (${sources.openalex}) and the biodata (${sources.biodata}), with duplicates removed. ${live ? `Live sources read ${fmtDate(retrieved)}.` : "Live sources could not be reached just now, so only the biodata list is shown."} New papers appear here as they reach ORCID or OpenAlex.`}>
        Every listed paper, searchable.
      </Heading>

      <div className="sticky top-16 z-10 -mx-2 grid gap-3 border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_92%,transparent)] px-2 py-4 backdrop-blur md:grid-cols-[1fr_auto_auto_auto]">
        <label className="relative block">
          <span className="sr-only">Search publications</span>
          <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} placeholder="Search titles, journals, indexing" className={`${sel} w-full pl-9`} type="search" />
        </label>
        <label>
          <span className="sr-only">Research domain</span>
          <select value={domain} onChange={(e) => { setDomain(e.target.value); setPage(0); }} className={`${sel} w-full`}>
            <option>All</option>
            {DOMAINS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Publication type</span>
          <select value={type} onChange={(e) => { setType(e.target.value); setPage(0); }} className={`${sel} w-full`}>
            <option value="All">All types</option>
            <option value="journal">Journal</option>
            <option value="conference">Conference</option>
            <option value="chapter">Book chapter</option>
            <option value="book">Book</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Year</span>
          <select value={year} onChange={(e) => { setYear(e.target.value); setPage(0); }} className={`${sel} w-full`}>
            <option value="All">All years</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "record" : "records"}
      </p>

      <AnimatePresence mode="wait">
        <motion.ol key={`${page}-${dq}-${domain}-${type}-${year}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} className="mt-2 divide-y divide-[var(--line)]">
          {shown.map((p) => {
            const href = p.doi ? `https://doi.org/${p.doi}` : p.url;
            return (
              <li key={p.title + p.year} className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[5rem_1fr_auto]">
                <span className="num text-2xl text-muted">{p.year}</span>
                <div>
                  <h3 className="font-serif text-[1.3rem] leading-snug">{href ? <ExternalLink href={href}>{p.title}</ExternalLink> : p.title}</h3>
                  {p.authors && p.authors.length > 0 && (
                    <p className="mt-1 text-[0.95rem] text-ink2">
                      {p.authors.slice(0, 8).join(", ")}
                      {p.authors.length > 8 ? ` and ${p.authors.length - 8} more` : ""}
                    </p>
                  )}
                  {p.venue && <p className="mt-1 text-ink2 italic">{p.venue}</p>}
                  {p.indexing && <p className="mt-1 text-sm text-muted">Listed in: {p.indexing}</p>}
                </div>
                <div className="flex flex-wrap content-start gap-2 md:max-w-48 md:justify-end">
                  <Badge>{typeLabel[p.type]}</Badge>
                  <Badge tone="sage">{p.domain}</Badge>
                  {p.doi && <Badge tone="brass">DOI</Badge>}
                </div>
              </li>
            );
          })}
        </motion.ol>
      </AnimatePresence>
      {shown.length === 0 && <p className="py-16 text-center text-muted">No records match these filters. Clear the search or choose &ldquo;All&rdquo;.</p>}

      <nav aria-label="Publication pages" className="mt-8 flex items-center justify-between border-t border-[var(--ink)] pt-5">
        <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="flex items-center gap-1 disabled:opacity-30">
          <ChevronLeft size={18} /> Previous
        </button>
        <span className="text-sm text-muted">
          Page {page + 1} of {pages}
        </span>
        <button onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1} className="flex items-center gap-1 disabled:opacity-30">
          Next <ChevronRight size={18} />
        </button>
      </nav>

      <p className="mt-12 text-ink2">
        The complete record lives on the official profiles:{" "}
        {profileLinks.filter((l) => l.kind === "research").map((l, i, a) => (
          <span key={l.id}>
            <ExternalLink href={l.url}>{l.label}</ExternalLink>
            {i < a.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
    </Section>
  );
}
