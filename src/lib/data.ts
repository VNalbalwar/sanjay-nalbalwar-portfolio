import { biodataPublications, inferDomain } from "@/content/publications-biodata";
import type { Publication } from "@/content/types";

const ORCID = "0000-0001-7307-0243";
const OPENALEX_AUTHOR = "A5058413396";
const DAY = 60 * 60 * 24;

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

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

export type PublicationsResult = { items: Publication[]; liveCount: number; retrieved: string; live: boolean };

/** ORCID records (with DOIs) merged with the curated biodata list; duplicates collapse by normalised title. */
export async function getPublications(): Promise<PublicationsResult> {
  let live: Publication[] = [];
  try {
    live = await fetchOrcid();
  } catch {
    live = [];
  }
  const byTitle = new Map<string, Publication>();
  for (const p of live) byTitle.set(norm(p.title), p);
  for (const p of biodataPublications) {
    const key = norm(p.title);
    const hit = byTitle.get(key);
    // Keep ORCID's DOI/link, but add the biodata's indexing note.
    if (hit) byTitle.set(key, { ...hit, indexing: p.indexing ?? hit.indexing, venue: hit.venue || p.venue });
    else byTitle.set(key, p);
  }
  const items = [...byTitle.values()].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  return { items, liveCount: live.length, retrieved: new Date().toISOString().slice(0, 10), live: live.length > 0 };
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
