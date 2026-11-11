"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Publication } from "@/content/types";
import { DOMAINS, type Domain } from "@/content/publications-biodata";
import { Heading, Section, ease } from "./ui";

const about: Record<Domain, { text: string; keywords: string[] }> = {
  "Signal Processing & Filter Banks": { text: "Multirate and non-uniform filter banks, signal-matched design with Nyquist filters, circular lattice structures and DSP implementations of OFDM coding and PAPR reduction. This was the subject of his AICTE FPGA project and runs through his early journal papers.", keywords: ["Multirate", "Non-uniform filter banks", "OFDM / PAPR", "FPGA"] },
  "Compressed Sensing & Wavelets": { text: "Sensing matrices, wavelet-based reconstruction and bio-signal compression, including Daubechies-based matrices for ECG and optimised structural matrices for speech. A first doctoral thesis in the area was completed in 2019.", keywords: ["Sensing matrices", "Wavelets", "ECG compression", "Reconstruction"] },
  "Image & Video Processing": { text: "Video stabilisation by feature-point matching, text detection in video, face recognition, handwritten-document analysis, super-resolution and snake identification from images, with granted and pending intellectual property in the area.", keywords: ["Video stabilisation", "Handwriting & Devanagari", "Super-resolution", "Recognition"] },
  "Speech & Audio": { text: "Speech enhancement, echo cancellation, speaker identification, emotion recognition, and processing designed for the hearing impaired, which his AICTE-funded hearing-aid project also addressed.", keywords: ["Speech enhancement", "Hearing aids", "Speaker ID", "Acoustic signals"] },
  "Biomedical Signals": { text: "ECG classification and HRV analysis, EEG-based detection of Alzheimer's disease, seizure detection, fundus-image analysis and hyperthermia modelling for cancer treatment, with five doctoral theses completed in this area.", keywords: ["ECG / HRV", "EEG", "Medical imaging", "Hyperthermia"] },
  "Antennas & Wireless": { text: "Microstrip, fractal, MIMO and UWB antennas, mutual-coupling reduction and wearable designs, together with design filings for a hexagonal CPW-fed dual-band antenna.", keywords: ["Microstrip", "MIMO", "UWB wearables", "Computational EM"] },
  "Networks & IoT": { text: "Energy-efficient protocols for wireless sensor networks, next-generation telecom (LTE-IMS, SIP, SS7), IoT-based monitoring, free-space optical links and machine learning for wireless communication.", keywords: ["Sensor networks", "LTE-IMS / SIP", "IoT", "Optical links"] },
  "Smart Grid & Power": { text: "A UGC major project on smart grids, fault-current limiting, and a TEQIP-funded solar-wind micro-grid with analysis of power-quality issues.", keywords: ["Smart grid", "Micro-grid", "Power quality"] },
  Other: { text: "Papers that sit outside the main domains.", keywords: [] },
};

export function Research({ items }: { items: Publication[] }) {
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((p) => m.set(p.domain, (m.get(p.domain) ?? 0) + 1));
    return m;
  }, [items]);
  const list = DOMAINS.filter((d) => d !== "Other");
  const [active, setActive] = useState<Domain>(list[0]);
  const max = Math.max(...list.map((d) => counts.get(d) ?? 0));
  const sample = items.filter((p) => p.domain === active && p.type !== "chapter").slice(0, 4);

  return (
    <Section id="research" tone="forest">
      <Heading id="research" lead="Domains are assigned from titles by a keyword rule, so counts are approximate and cover only the records searchable here.">
        Eight research domains, one thread: extracting information from signals.
      </Heading>
      <div className="grid gap-10 md:grid-cols-12">
        <ul className="md:col-span-5" role="tablist" aria-label="Research domains">
          {list.map((d) => {
            const n = counts.get(d) ?? 0;
            const on = d === active;
            return (
              <li key={d} role="presentation" className="border-t border-[color-mix(in_srgb,var(--forest-fg)_28%,transparent)] last:border-b">
                <button role="tab" aria-selected={on} onClick={() => setActive(d)} className="group relative flex w-full items-center justify-between gap-4 py-4 text-left">
                  <span className={`font-serif text-xl transition-all duration-500 sm:text-2xl ${on ? "translate-x-3" : "opacity-70 group-hover:translate-x-1 group-hover:opacity-100"}`}>{d}</span>
                  <span className="flex items-center gap-3 text-sm">
                    <span className="hidden h-px w-20 bg-[color-mix(in_srgb,var(--forest-fg)_25%,transparent)] sm:block">
                      <motion.span className="block h-px bg-[var(--brass)]" initial={false} animate={{ width: `${(n / max) * 100}%` }} transition={{ duration: 0.9, ease }} style={{ height: 3, marginTop: -1 }} />
                    </span>
                    <span className="num w-7 text-right">{n}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="md:col-span-7" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
              <h3 className="text-3xl">{active}</h3>
              <p className="measure mt-4 text-[1.1rem] opacity-90">{about[active].text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {about[active].keywords.map((k) => (
                  <li key={k} className="rounded-full border border-[color-mix(in_srgb,var(--forest-fg)_35%,transparent)] px-3 py-1 text-sm">
                    {k}
                  </li>
                ))}
              </ul>
              {sample.length > 0 && (
                <div className="mt-10">
                  <p className="mb-3 text-sm opacity-70">Recent papers in this domain</p>
                  <ul className="divide-y divide-[color-mix(in_srgb,var(--forest-fg)_22%,transparent)]">
                    {sample.map((p) => (
                      <li key={p.title} className="flex gap-4 py-3">
                        <span className="num w-12 shrink-0 opacity-70">{p.year}</span>
                        <span>{p.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
