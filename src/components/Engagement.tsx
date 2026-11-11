"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { fdpsOrganised, international, organised, type Event } from "@/content/engagement";
import { Badge, Counter, Heading, Section, ease } from "./ui";

// Equirectangular projection over South and Southeast Asia: lon 45–115, lat -2–34.
const P = (lon: number, lat: number) => [((lon - 45) / 70) * 760 + 20, 330 - ((lat + 2) / 36) * 320] as const;
const home = P(73.3, 18.2);
const places = [
  { name: "Kuala Lumpur", year: "2010", at: P(101.7, 3.1) },
  { name: "Dubai", year: "2016", at: P(55.3, 25.2) },
  { name: "BAUST, Bangladesh", year: "2025", at: P(88.9, 25.8) },
  { name: "Chattogram", year: "2026", at: P(91.8, 22.4) },
];
const tabs = [
  { k: "abroad", label: "Abroad" },
  { k: "organised", label: "Organised" },
  { k: "fdp", label: "FDPs and STTPs organised" },
] as const;

function Row({ e }: { e: Event }) {
  return (
    <li className="grid gap-x-6 gap-y-1 border-t border-[var(--line)] py-4 sm:grid-cols-[12rem_1fr_auto]">
      <span className="text-ink2">{e.when}</span>
      <span className="font-serif text-[1.15rem] leading-snug">{e.title}</span>
      <span className="flex flex-wrap items-start gap-2 sm:justify-end">
        <span className="text-sm text-muted">{e.where}</span>
        <Badge tone={e.role === "Organised" ? "brass" : "sage"}>{e.role}</Badge>
      </span>
    </li>
  );
}

export function Engagement() {
  const [t, setT] = useState<(typeof tabs)[number]["k"]>("abroad");
  const counts = [
    { n: 4, l: "international conferences abroad, as session chair" },
    { n: 8, l: "conferences and events organised" },
    { n: 15, l: "FDPs, STTPs and CEPs organised" },
    { n: 31, l: "short-term programmes attended" },
    { n: 21, l: "workshops attended" },
    { n: 13, l: "conferences attended" },
  ];
  return (
    <Section id="engagement">
      <Heading id="engagement" lead="Roles are kept distinct: chairing a session abroad, organising an event, conducting a programme and attending one are different things, and are listed that way.">
        In the room: abroad, at home, and as host.
      </Heading>

      <svg viewBox="0 0 800 340" className="w-full" role="img" aria-label="Route map from Lonere, Maharashtra to Kuala Lumpur, Dubai and Bangladesh">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (<line key={`v${i}`} x1={20 + i * 126.6} x2={20 + i * 126.6} y1="10" y2="330" stroke="var(--line-soft)" />))}
        {[0, 1, 2, 3, 4].map((i) => (<line key={`h${i}`} y1={10 + i * 80} y2={10 + i * 80} x1="20" x2="780" stroke="var(--line-soft)" />))}
        {places.map((p, i) => {
          const mx = (home[0] + p.at[0]) / 2, my = Math.min(home[1], p.at[1]) - 70;
          return <motion.path key={p.name} d={`M${home[0]} ${home[1]} Q${mx} ${my} ${p.at[0]} ${p.at[1]}`} fill="none" stroke="var(--brass)" strokeWidth="1.4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease, delay: 0.2 + i * 0.2 }} />;
        })}
        <g><circle cx={home[0]} cy={home[1]} r="7" fill="var(--forest)" /><text x={home[0] + 12} y={home[1] + 18} fontSize="13" fill="var(--ink)">Lonere</text></g>
        {places.map((p) => (
          <g key={p.name}><circle cx={p.at[0]} cy={p.at[1]} r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" /><text x={p.at[0] + 10} y={p.at[1] + 4} fontSize="13" fill="var(--ink)">{p.name} <tspan fill="var(--muted)">{p.year}</tspan></text></g>
        ))}
      </svg>

      <div className="mt-12 grid grid-cols-2 gap-y-8 md:grid-cols-6">
        {counts.map((c) => (
          <div key={c.l} className="pr-4">
            <p className="num text-4xl"><Counter to={c.n} /></p>
            <p className="mt-1 text-[0.9rem] leading-snug text-muted">{c.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-2" role="tablist" aria-label="Engagement type">
        {tabs.map((x) => (
          <button key={x.k} role="tab" aria-selected={t === x.k} onClick={() => setT(x.k)} className={`rounded-full border px-5 py-2.5 transition ${t === x.k ? "border-[var(--forest)] bg-[var(--forest)] text-[var(--forest-fg)]" : "border-[var(--line)] hover:border-[var(--ink)]"}`}>
            {x.label}
          </button>
        ))}
      </div>
      <ul className="mt-6" role="tabpanel">
        {t === "abroad" && [...international].reverse().map((e) => <Row key={e.title} e={e} />)}
        {t === "organised" && organised.map((e) => <Row key={e.title} e={e} />)}
        {t === "fdp" && fdpsOrganised.map((f) => (<li key={f} className="border-t border-[var(--line)] py-4 text-[1.05rem]">{f}</li>))}
      </ul>
    </Section>
  );
}
