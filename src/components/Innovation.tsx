"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { innovation } from "@/content/engagement";
import { Heading, Section, ease } from "./ui";

/** Ecosystem as documented in the biodata: research and students feed incubation, start-ups and industry, held by institutional support. */
const nodes = [
  { id: "research", label: "Research", x: 90, y: 90, note: "Industry-sponsored research (Rs. 14.40 lakh, Bi-optronics, 2018–20) and the patents filed from DBATU work." },
  { id: "students", label: "Students", x: 90, y: 270, note: "Smart India Hackathon, Avishkar, Business Idea Competition and product-development workshops." },
  { id: "incubation", label: "Incubation", x: 360, y: 180, note: "DFIIE, a Section-8 company he directed from 2018; an Incubation Centre funded under RUSA." },
  { id: "startups", label: "Start-ups", x: 630, y: 90, note: "Winning SIH teams were offered incubation-centre support; an IRG scheme of Rs. 50 lakh is listed through DFIIE start-ups." },
  { id: "industry", label: "Industry", x: 630, y: 270, note: "Industry-funded research assistantships and expert evaluation of proposals for AICTE." },
];
const edges = [["research", "incubation"], ["students", "incubation"], ["incubation", "startups"], ["incubation", "industry"], ["research", "industry"]];

export function Innovation() {
  const [a, setA] = useState(nodes[2]);
  const by = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <Section id="innovation" tone="surface">
      <Heading id="innovation" lead="Drawn from the roles and events in the biodata. No company or start-up ownership is implied; none is recorded there.">
        How research, students and industry were connected.
      </Heading>
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <svg viewBox="0 0 720 360" className="w-full" role="group" aria-label="Innovation ecosystem diagram">
            <rect x="170" y="14" width="380" height="332" rx="3" fill="none" stroke="var(--line)" strokeDasharray="3 5" />
            <text x="360" y="336" textAnchor="middle" fontSize="13" fill="var(--muted)">University support: IIC, DFIIE, RUSA, MSINS</text>
            {edges.map(([f, t], i) => (
              <motion.line key={i} x1={by[f].x} y1={by[f].y} x2={by[t].x} y2={by[t].y} stroke="var(--ink)" strokeOpacity={0.45} strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease, delay: 0.2 + i * 0.12 }} />
            ))}
            {nodes.map((n) => {
              const on = a.id === n.id;
              return (
                <g key={n.id} transform={`translate(${n.x} ${n.y})`} tabIndex={0} role="button" aria-pressed={on} aria-label={n.label} onClick={() => setA(n)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setA(n)} style={{ cursor: "pointer" }}>
                  {on && <circle r="44" fill="none" stroke="var(--brass)" strokeWidth="1.5" style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }} />}
                  <circle r="34" fill={on ? "var(--forest)" : "var(--paper)"} stroke="var(--ink)" strokeWidth="1.2" />
                  <text textAnchor="middle" dy="5" fontSize="14" fill={on ? "var(--forest-fg)" : "var(--ink)"} style={{ fontFamily: "var(--font-newsreader)" }}>{n.label}</text>
                </g>
              );
            })}
          </svg>
          <motion.p key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="measure mt-4 border-t border-[var(--line)] pt-4" aria-live="polite">
            <strong className="font-serif text-xl font-normal">{a.label}.</strong> {a.note}
          </motion.p>
        </div>
        <ul className="md:col-span-5">
          {innovation.map((x) => (
            <li key={x.name} className="border-t border-[var(--line)] py-4">
              <h3 className="text-xl">{x.name}</h3>
              <p className="mt-1 text-[0.97rem] text-ink2">{x.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
