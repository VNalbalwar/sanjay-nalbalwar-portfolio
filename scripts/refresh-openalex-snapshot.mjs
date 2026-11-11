// Refresh src/content/openalex-snapshot.json from OpenAlex. Run: OPENALEX_API_KEY=... node scripts/refresh-openalex-snapshot.mjs
import { writeFileSync } from "node:fs";
const AUTHOR = "A5058413396";
const key = process.env.OPENALEX_API_KEY ? `&api_key=${process.env.OPENALEX_API_KEY}` : "";
const typ = (t) => (t === "paratext" ? null : t === "conference-paper" || t === "proceedings-article" ? "conference" : t === "book-chapter" ? "chapter" : t === "book" ? "book" : "journal");
const works = [];
let cursor = "*";
while (cursor) {
  const r = await fetch(`https://api.openalex.org/works?filter=author.id:${AUTHOR}&per-page=200&cursor=${encodeURIComponent(cursor)}&select=title,publication_year,doi,type,primary_location,authorships${key}`);
  if (!r.ok) throw new Error(`OpenAlex ${r.status}`);
  const d = await r.json();
  for (const w of d.results) {
    const title = w.title?.trim(), type = typ(w.type ?? "");
    if (!title || !w.publication_year || !type) continue;
    const pl = w.primary_location ?? {};
    works.push({ title, year: w.publication_year, type, venue: pl.source?.display_name ?? "", doi: w.doi?.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "") ?? null, url: pl.landing_page_url ?? null, authors: w.authorships.map((a) => a.author.display_name) });
  }
  cursor = d.meta.next_cursor ?? "";
  if (!d.results.length) break;
}
writeFileSync(new URL("../src/content/openalex-snapshot.json", import.meta.url), JSON.stringify({ retrieved: new Date().toISOString().slice(0, 10), source: `OpenAlex author ${AUTHOR}`, works }));
console.log(`${works.length} works written`);
