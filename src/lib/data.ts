import { biodataPublications, inferDomain } from "@/content/publications-biodata";
import type { Publication } from "@/content/types";

const ORCID = "0000-0001-7307-0243";
const OPENALEX_AUTHOR = "A5058413396";
const DAY = 60 * 60 * 24;

// Title key: ignores case, punctuation, hyphens and British/American "-isation/-ization" spelling.
const norm = (s: string) => s.toLowerCase().replace(/-/g, "").replace(/isation/g, "ization").replace(/[^a-z0-9]+/g, " ").trim();

type OrcidSummary = {
  title?: { title?: { value?: string } };
  type?: string;
  "journal-title"?: { value?: string } | null;
  "publication-date"?: { year?: { value?: string } } | null;
  "external-ids"?: { "external-id"?: { "external-id-type": string; "external-id-value": string }[] };
  url?: { value?: string } | null;
};

function orcidType(t = ""): Publication["type"] {
  if (t.includes("conference")) return "conference";
  if (t.includes("book-chapter") || t.includes("book")) return "chapter";
  return "journal";
}

async function fetchOrcid(): Promise<Publication[]> {
  const res = await fetch(`https://pub.orcid.org/v3.0/${ORCID}/works`, {
    headers: { Accept: "application/json" },
    next: { revalidate: DAY, tags: ["publications"] },
  });
  if (!res.ok) throw new Error(`ORCID ${res.status}`);
  const data = (await res.json()) as { group?: { "work-summary": OrcidSummary[] }[] };
  const out: Publication[] = [];
  for (const g of data.group ?? []) {
    const w = g["work-summary"][0];
    const title = w.title?.title?.value?.trim();
    const year = Number(w["publication-date"]?.year?.value);
    if (!title || !year) continue;
    const doi = w["external-ids"]?.["external-id"]?.find((e) => e["external-id-type"] === "doi")?.["external-id-value"];
    out.push({
      title,
      venue: w["journal-title"]?.value ?? "",
      year,
      type: orcidType(w.type),
      domain: inferDomain(title),
      doi: doi?.replace(/^https?:\/\/(dx\.)?doi\.org\//i, ""),
      url: w.url?.value ?? undefined,
      source: "orcid",
    });
  }
  return out;
}

type OaWork = {
  title: string | null;
  publication_year: number | null;
  doi: string | null;
  type: string | null;
  primary_location: { source: { display_name: string | null } | null; landing_page_url: string | null } | null;
  authorships: { author: { display_name: string } }[];
};

function oaType(t = ""): Publication["type"] | null {
  if (t === "paratext") return null;
  if (t === "conference-paper" || t === "proceedings-article") return "conference";
  if (t === "book-chapter") return "chapter";
  if (t === "book") return "book";
  return "journal";
}

const cleanDoi = (d?: string | null) => d?.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "") || undefined;

/** OpenAlex indexes new papers automatically (Crossref, publishers), so this catches work that ORCID lacks. */
async function fetchOpenAlexWorks(): Promise<Publication[]> {
  const out: Publication[] = [];
  let cursor = "*";
  for (let page = 0; page < 5 && cursor; page++) {
    const url = `https://api.openalex.org/works?filter=author.id:${OPENALEX_AUTHOR}&per-page=200&cursor=${encodeURIComponent(cursor)}&select=title,publication_year,doi,type,primary_location,authorships`;
    const res = await fetch(url, { next: { revalidate: DAY, tags: ["publications"] } });
    if (!res.ok) throw new Error(`OpenAlex ${res.status}`);
    const data = (await res.json()) as { results: OaWork[]; meta: { next_cursor: string | null } };
    for (const w of data.results) {
      const title = w.title?.trim();
      const type = oaType(w.type ?? "");
      if (!title || !w.publication_year || !type) continue;
      out.push({
        title,
        venue: w.primary_location?.source?.display_name ?? "",
        year: w.publication_year,
        type,
        domain: inferDomain(title),
        doi: cleanDoi(w.doi),
        url: w.primary_location?.landing_page_url ?? undefined,
        authors: w.authorships.map((a) => a.author.display_name),
        source: "openalex",
      });
    }
    cursor = data.meta.next_cursor ?? "";
    if (!data.results.length) break;
  }
  return out;
}

export type PublicationsResult = { items: Publication[]; sources: { orcid: number; openalex: number; biodata: number }; retrieved: string; live: boolean };

/**
 * Three sources merged into one list. Order of precedence for each field: ORCID, OpenAlex, biodata.
 * Duplicates collapse by DOI or normalised title. Nothing is invented: every record comes from one of the three.
 */
export async function getPublications(): Promise<PublicationsResult> {
  const [orcid, openalex] = await Promise.all([fetchOrcid().catch(() => [] as Publication[]), fetchOpenAlexWorks().catch(() => [] as Publication[])]);
  const byKey = new Map<string, Publication>();
  const byDoi = new Map<string, string>();
  const add = (p: Publication) => {
    const tk = norm(p.title);
    const key = (p.doi && byDoi.get(p.doi.toLowerCase())) || tk;
    const hit = byKey.get(key);
    if (!hit) {
      byKey.set(tk, p);
      if (p.doi) byDoi.set(p.doi.toLowerCase(), tk);
      return;
    }
    byKey.set(key, {
      ...hit,
      venue: hit.venue || p.venue,
      doi: hit.doi ?? p.doi,
      url: hit.url ?? p.url,
      authors: hit.authors ?? p.authors,
      indexing: hit.indexing ?? p.indexing,
      type: hit.source === "biodata" ? p.type : hit.type,
    });
    const merged = byKey.get(key)!;
    if (merged.doi) byDoi.set(merged.doi.toLowerCase(), key);
  };
  [...orcid, ...openalex, ...biodataPublications].forEach(add);
  const items = [...byKey.values()].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  return { items, sources: { orcid: orcid.length, openalex: openalex.length, biodata: biodataPublications.length }, retrieved: new Date().toISOString().slice(0, 10), live: orcid.length + openalex.length > 0 };
}

export type LiveMetrics = { works: number; citations: number; hIndex: number; i10: number; byYear: { year: number; works: number; cites: number }[]; retrieved: string } | null;

export async function getOpenAlexMetrics(): Promise<LiveMetrics> {
  try {
    const res = await fetch(`https://api.openalex.org/authors/${OPENALEX_AUTHOR}`, { next: { revalidate: DAY, tags: ["metrics"] } });
    if (!res.ok) return null;
    const a = (await res.json()) as {
      works_count: number;
      cited_by_count: number;
      summary_stats: { h_index: number; i10_index: number };
      counts_by_year: { year: number; works_count: number; cited_by_count: number }[];
    };
    return {
      works: a.works_count,
      citations: a.cited_by_count,
      hIndex: a.summary_stats.h_index,
      i10: a.summary_stats.i10_index,
      byYear: a.counts_by_year.map((c) => ({ year: c.year, works: c.works_count, cites: c.cited_by_count })).sort((x, y) => x.year - y.year),
      retrieved: new Date().toISOString().slice(0, 10),
    };
  } catch {
    return null;
  }
}
