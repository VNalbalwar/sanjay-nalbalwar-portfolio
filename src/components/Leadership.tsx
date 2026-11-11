"use client";

import { useState } from "react";
import { leadership, newPrograms } from "@/content/career";
import type { Role } from "@/content/types";
import { Counter, Heading, Section } from "./ui";

const groups: { key: Role["group"]; label: string }[] = [
  { key: "administrative", label: "University administration" },
  { key: "statutory", label: "Statutory bodies" },
  { key: "national", label: "State and national bodies" },
  { key: "external", label: "External audit and programmes" },
];

const yr = (s: string) => (/^\d{4}/.test(s) ? s.slice(0, 4) : s);
const span = (r: Role) => (r.from === "—" ? "Short spells" : r.to === "present" ? `${yr(r.from)} – present` : r.from === r.to ? yr(r.from) : `${yr(r.from)} – ${yr(r.to)}`);

export function Leadership() {
  const [g, setG] = useState<Role["group"]>("administrative");
  const rows = leadership.filter((r) => r.group === g);
  return (
    <Section id="leadership" tone="forest">
      <Heading id="leadership" lead="All university roles below ended on 31 July 2026 with the close of his administrative tenure; state and national roles are shown with their own terms as recorded.">
        Governing a university, and shaping how a state teaches engineering.
      </Heading>

      <div className="grid gap-px overflow-hidden rounded-[3px] bg-[color-mix(in_srgb,var(--forest-fg)_28%,transparent)] md:grid-cols-4">
        {[
          { n: 455, l: "affiliated colleges under academic audit as Dean" },
          { n: 12, l: "new programmes approved, 2022–2024" },
          { n: 16, l: "programmes whose curricula he designed (5 UG, 11 PG)" },
          { n: 9, l: "years across the three phases of the World Bank TEQIP project" },
        ].map((s) => (
          <div key={s.l} className="bg-[var(--forest)] p-6">
            <p className="num text-5xl text-[var(--brass)]"><Counter to={s.n} /></p>
            <p className="mt-2 text-[0.95rem] opacity-90">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div role="tablist" aria-label="Role groups" className="flex flex-col">
            {groups.map((x) => (
              <button key={x.key} role="tab" aria-selected={g === x.key} onClick={() => setG(x.key)} className={`border-t border-[color-mix(in_srgb,var(--forest-fg)_28%,transparent)] py-4 text-left font-serif text-2xl transition-all ${g === x.key ? "translate-x-3" : "opacity-65 hover:opacity-100"}`}>
                {x.label}
              </button>
            ))}
          </div>
        </div>
        <ul className="md:col-span-8" role="tabpanel">
          {rows.map((r) => (
            <li key={r.title} className="grid gap-x-6 gap-y-1 border-t border-[color-mix(in_srgb,var(--forest-fg)_22%,transparent)] py-5 sm:grid-cols-[9.5rem_1fr]">
              <span className="num text-lg opacity-80">{span(r)}</span>
              <div>
                <h3 className="text-[1.3rem] leading-snug">{r.title}</h3>
                <p className="text-[0.95rem] opacity-75">{r.org}</p>
                {r.summary && <p className="measure mt-2 text-[0.98rem] opacity-95">{r.summary}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-24 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <h3 className="text-3xl">Programmes started while he was Dean</h3>
          <p className="mt-4 opacity-90">Approved through the Executive Council and Academic Council, with intake as recorded in the biodata. The university was among the first in the country to implement NEP-2020.</p>
        </div>
        <ul className="grid gap-x-8 sm:grid-cols-2 md:col-span-7">
          {[...newPrograms].sort((a, b) => a.year - b.year).map((p) => (
            <li key={p.name} className="flex items-baseline justify-between gap-3 border-t border-[color-mix(in_srgb,var(--forest-fg)_22%,transparent)] py-3 text-[0.95rem]">
              <span>
                <span className="opacity-70">{p.level}</span> · {p.name}
              </span>
              <span className="num shrink-0 opacity-80">{p.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
