"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { patents, patentStatusLabel } from "@/content/patents";
import type { PatentStatus } from "@/content/types";
import { Heading, Pending, Section, ease, fmtDate } from "./ui";

const look: Record<PatentStatus, { stamp: string; ring: string; text: string }> = {
  granted: { stamp: "GRANTED", ring: "border-[var(--forest)]", text: "text-forest" },
  "published-application": { stamp: "PUBLISHED APPLICATION", ring: "border-[var(--brass)]", text: "text-brassink" },
  "design-granted": { stamp: "GRANTED DESIGN", ring: "border-[var(--forest)]", text: "text-forest" },
};
const order: PatentStatus[] = ["granted", "design-granted"];

export function Patents() {
  const [f, setF] = useState<PatentStatus | "all">("all");
  const list = patents.filter((p) => f === "all" || p.status === f).sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));
  const count = (s: PatentStatus) => patents.filter((p) => p.status === s).length;
  return (
    <Section id="patents" tone="surface">
      <Heading id="patents" lead="Five patents and four designs, all granted. Each entry shows its number, jurisdiction and the dates on record.">
        An intellectual property register.
      </Heading>

      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {(["all", ...order] as const).map((s) => (
          <button key={s} onClick={() => setF(s)} aria-pressed={f === s} className={`rounded-full border px-4 py-2 text-[0.92rem] transition ${f === s ? "border-[var(--forest)] bg-[var(--forest)] text-[var(--forest-fg)]" : "border-[var(--line)] hover:border-[var(--ink)]"}`}>
            {s === "all" ? `All (${patents.length})` : `${patentStatusLabel[s]} (${count(s)})`}
          </button>
        ))}
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {list.map((p, i) => (
          <motion.li layout key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6%" }} transition={{ duration: 0.7, ease, delay: (i % 2) * 0.08 }} className="relative flex flex-col rounded-[3px] border border-[var(--line)] bg-paper p-7">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-muted">{p.kind === "Patent" ? "Patent" : "Design"} · {p.field}</p>
              <span className={`-rotate-3 rounded-[2px] border-2 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide ${look[p.status].ring} ${look[p.status].text}`}>{look[p.status].stamp}</span>
            </div>
            <h3 className="mt-5 text-[1.45rem] leading-snug">{p.title}</h3>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[0.95rem]">
              <dt className="text-muted">{p.numberLabel}</dt>
              <dd className="num">{p.number}</dd>
              <dt className="text-muted">Jurisdiction</dt>
              <dd>{p.jurisdiction}</dd>
              {p.filed && (<><dt className="text-muted">Filed</dt><dd>{fmtDate(p.filed)}</dd></>)}
              {p.published && (<><dt className="text-muted">Published</dt><dd>{fmtDate(p.published)}</dd></>)}
              {p.granted && (<><dt className="text-muted">Granted</dt><dd>{fmtDate(p.granted)}</dd></>)}
            </dl>
            <p className="mt-5 text-[0.95rem] text-ink2">{p.statusDetail}</p>
            {!p.verified && (
              <p className="mt-4">
                <Pending note={p.note} />
              </p>
            )}
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
