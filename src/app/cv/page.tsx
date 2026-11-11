import type { Metadata } from "next";
import { profile, profileLinks, metricSources } from "@/content/profile";
import { ranks, leadership } from "@/content/career";
import { patents, patentStatusLabel } from "@/content/patents";
import { scholarStats } from "@/content/scholars";
import { books, awards } from "@/content/credentials";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = { title: "Academic CV", alternates: { canonical: "/cv" } };

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mt-8 mb-2 border-b border-[var(--line)] pb-1 text-2xl">{children}</h2>;

export default function CV() {
  const gs = metricSources[1];
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <PrintButton />
      <h1 className="text-4xl">{profile.name}</h1>
      <p className="mt-1 text-ink2">{profile.title}, {profile.department}, {profile.institution}</p>
      <p className="mt-1">{profile.email}</p>

      <H>Education</H>
      <ul className="list-disc pl-5">
        <li>Ph.D., Communication and Signal Processing, IIT Delhi, 2008 (QIP fellow, 2001–2004)</li>
        <li>M.E., Electronics, SGGS College of Engineering and Technology, Nanded, 1995</li>
        <li>B.E., SGGS College of Engineering and Technology, Nanded, 1990</li>
      </ul>

      <H>Appointments</H>
      <ul className="list-disc pl-5">{ranks.slice(0, 3).map((r) => <li key={r.title}>{r.title}, {r.from.slice(0, 4)}–{r.to === "present" ? "present" : r.to.slice(0, 4)}</li>)}</ul>

      <H>Leadership at DBATU</H>
      <ul className="list-disc pl-5">{leadership.filter((r) => r.group === "administrative").slice(0, 6).map((r) => <li key={r.title}>{r.title}, {r.from.slice(0, 4)}–{r.to.slice(0, 4)}</li>)}</ul>

      <H>Research metrics (source and date)</H>
      <ul className="list-disc pl-5">{metricSources.map((m) => <li key={m.source}>{m.source} ({m.retrieved}): {m.citations?.toLocaleString("en-IN")} citations, h-index {m.hIndex}, i10-index {m.i10}</li>)}</ul>
      <p className="mt-2 text-sm text-muted">Scholar profile: {gs.url}</p>

      <H>Mentorship</H>
      <p>{scholarStats.phdGuided} Ph.D. scholars guided, {scholarStats.phdInProgress} in progress; {scholarStats.mtechTheses} M.Tech. theses; {scholarStats.btechProjects} B.Tech. projects.</p>

      <H>Books</H>
      <ul className="list-disc pl-5">{books.map((b) => <li key={b.title}>{b.title}. {b.publisher}.{b.isbn ? ` ISBN ${b.isbn}.` : ""}</li>)}</ul>

      <H>Patents and designs</H>
      <ul className="list-disc pl-5">{patents.map((p) => <li key={p.id}>{p.title}. {patentStatusLabel[p.status]}, {p.numberLabel} {p.number}.</li>)}</ul>

      <H>Awards</H>
      <ul className="list-disc pl-5">{awards.map((a) => <li key={a.title}>{a.title}, {a.by}, {a.year}</li>)}</ul>

      <H>Profiles</H>
      <ul className="list-disc pl-5">{profileLinks.map((l) => <li key={l.id}>{l.label}: {l.url}</li>)}</ul>
    </main>
  );
}
