"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Heading, Pending, Section, ease } from "./ui";

type Node = { id: string; year: number; end?: number; lane: "edu" | "career"; title: string; place: string; detail: string; pending?: string };

// Layout: nodes keep chronological order but are spaced at least GAP apart within their lane, so cards never overlap.
const START = 1988;
const GAP = 200; // px between neighbouring cards in the same lane (card is 176px wide)
const PX_PER_YEAR = 70;
const PAD = 110;

const nodes: Node[] = [
    { id: "be", year: 1990, lane: "edu", title: "B.E.", place: "SGGS College of Engineering & Technology, Nanded", detail: "First engineering degree." },
    { id: "me", year: 1995, lane: "edu", title: "M.E., Electronics", place: "SGGS College of Engineering & Technology, Nanded", detail: "Master's degree in Electronics, the field he has taught and researched since." },
  { id: "qip", year: 2001, end: 2004, lane: "edu", title: "QIP Fellowship", place: "IIT Delhi", detail: "Quality Improvement Programme fellowship for the Ph.D. programme, July 2001 to July 2004." },
  { id: "phd", year: 2008, lane: "edu", title: "Ph.D., Communication and Signal Processing", place: "IIT Delhi", detail: "Doctoral degree awarded in 2008." },
  { id: "tuljapur", year: 1991, end: 1996, lane: "career", title: "Lecturer, STB College of Engineering, Tuljapur", place: "Earlier appointment", detail: "24 August 1991 to 29 August 1996, after a first lectureship at Dr. P.V.V.P.I. Technology & Engineering, Pravaranagar (September 1990 to August 1991).", pending: "From DBATU's faculty profile; not in the biodata." },
  { id: "join", year: 1996, lane: "career", title: "Joins DBATU, Lonere", place: "Dr. Babasaheb Ambedkar Technological University", detail: "Joined on 24 August 1996. His rank history before 2012 is taken from DBATU\'s faculty profile: Lecturer, Senior Lecturer (2001), Assistant Professor (2004), Associate Professor (2007), then Professor in 2012." },
  { id: "aicte", year: 2006, lane: "career", title: "AICTE R&D grant", place: "Multirate DSP on fast FPGA", detail: "Rs. 5.75 lakh project begun 1 August 2006, completed 2010." },
  { id: "hod", year: 2010, lane: "career", title: "Head of Department", place: "E&TC Engineering, DBATU", detail: "From 29 May 2010. Also Chairman of the Board of Studies and the Research Committee, and a member of the Academic Council." },
  { id: "prof", year: 2012, lane: "career", title: "Professor (L-14)", place: "DBATU", detail: "From 20 August 2012." },
  { id: "ec", year: 2013, lane: "career", title: "Executive Council", place: "DBATU", detail: "Member 2013–2016 and again 2020–2023." },
  { id: "ict", year: 2016, lane: "career", title: "Director, ICT", place: "DBATU", detail: "From 3 October 2016." },
  { id: "dfiie", year: 2018, lane: "career", title: "Director, DFIIE", place: "DBATU Forum of Innovation, Incubation & Enterprise", detail: "From 29 August 2018; Director and CEO for two years; Chairman from 31 March 2026." },
  { id: "dean", year: 2019, lane: "career", title: "Dean (Academics)", place: "Faculty of Engineering & Technology", detail: "From 16 October 2019. Quality oversight of 455 affiliated colleges." },
  { id: "senior", year: 2022, lane: "career", title: "Senior Professor (L-15)", place: "DBATU", detail: "From 21 August 2022." },
  { id: "iqac", year: 2023, lane: "career", title: "Director, IQAC", place: "DBATU", detail: "From 15 September 2023." },
  { id: "quantum", year: 2025, end: 2026, lane: "career", title: "Quantum technologies", place: "Online faculty development programmes", detail: "Seven online faculty development programmes in quantum technologies, between February 2025 and May 2026." },
  { id: "emeritus", year: 2026, lane: "career", title: "Professor Emeritus", place: "DBATU", detail: "From 5 August 2026, after the administrative tenure closed on 31 July 2026." },
];

function layout(list: Node[]) {
  const last: Record<Node["lane"], number> = { edu: -1e9, career: -1e9 };
  return [...list]
    .sort((a, b) => a.year - b.year || (a.lane === "edu" ? -1 : 1))
    .map((n) => {
      const x = Math.max(PAD + (n.year - START) * PX_PER_YEAR, last[n.lane] + GAP);
      last[n.lane] = x;
      return { ...n, x };
    });
}
const placed = layout(nodes);
const RAIL_W = Math.max(...placed.map((n) => n.x)) + PAD;

export function Journey() {
  const [active, setActive] = useState<Node>(nodes[nodes.length - 1]);
  const rail = useRef<HTMLDivElement>(null);
  const scrollBy = (d: number) => rail.current?.scrollBy({ left: d, behavior: "smooth" });

  return (
    <Section id="journey" tone="surface">
      <Heading id="journey" lead="Select any point on the rail. Education runs above the line; appointments and responsibilities run below.">
        From Nanded to IIT Delhi to a university&rsquo;s leadership.
      </Heading>

      <div className="mb-3 flex justify-end gap-2 no-print">
        <button onClick={() => scrollBy(-600)} aria-label="Scroll timeline left" className="flex size-10 items-center justify-center rounded-full border border-[var(--line)] hover:bg-[var(--line-soft)]">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => scrollBy(600)} aria-label="Scroll timeline right" className="flex size-10 items-center justify-center rounded-full border border-[var(--line)] hover:bg-[var(--line-soft)]">
          <ChevronRight size={18} />
        </button>
      </div>

      <div ref={rail} className="hscroll -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8" tabIndex={0} aria-label="Career timeline, scrollable">
        <div className="relative h-[26rem]" style={{ width: RAIL_W }}>
          <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--ink)]" />
          {placed.filter((n) => n.end).map((n) => (
            <div key={`r-${n.id}`} className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-[var(--brass)]" style={{ left: n.x, width: (n.end! - n.year) * PX_PER_YEAR }} aria-hidden />
          ))}
          {placed.map((n, i) => {
            const isEdu = n.lane === "edu";
            const lift = isEdu ? 0 : (i % 2) * 4.6; // rem; alternate depth below the axis
            const on = active.id === n.id;
            return (
              <div key={n.id}>
                <span className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)]" style={{ left: n.x }} aria-hidden />
                <button
                  onClick={() => setActive(n)}
                  aria-pressed={on}
                  className="group absolute -translate-x-1/2 text-left"
                  style={{ left: n.x, ...(isEdu ? { bottom: "calc(50% + 22px)" } : { top: `calc(50% + 28px + ${lift}rem)` }) }}
                >
                  <span className={`absolute left-1/2 w-px -translate-x-1/2 bg-[var(--line)] ${isEdu ? "top-full h-[22px]" : "bottom-full"}`} style={isEdu ? undefined : { height: `calc(28px + ${lift}rem)` }} />
                  <span className={`block w-44 rounded-[3px] border px-3 py-2.5 text-[0.88rem] leading-snug transition-colors ${on ? "border-[var(--forest)] bg-[var(--forest)] text-[var(--forest-fg)]" : "border-[var(--line)] bg-paper group-hover:border-[var(--ink)]"}`}>
                    <span className="num block text-base">{n.end ? `${n.year}–${String(n.end).slice(2)}` : n.year}</span>
                    {n.title}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 min-h-40 border-t border-[var(--line)] pt-8" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="grid gap-4 md:grid-cols-12">
            <p className="num text-5xl md:col-span-3">{active.end ? `${active.year}–${active.end}` : active.year}</p>
            <div className="md:col-span-9">
              <h3 className="text-3xl">{active.title}</h3>
              <p className="mt-1 text-muted">{active.place}</p>
              <p className="measure mt-4">{active.detail}</p>
              {active.pending && (
                <p className="mt-3">
                  <Pending note={active.pending} />
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
