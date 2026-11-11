"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { profile, profileLinks, headlineStats } from "@/content/profile";
import { SignalField } from "./SignalField";
import { Counter, ExternalLink, ease } from "./ui";

const word = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1, ease, delay: 0.15 + i * 0.09 } }),
};

export function Hero() {
  const name = ["Sanjay", "Laxmikant", "Nalbalwar"];
  const ledger = [
    { n: headlineStats.teachingYears, l: "years of teaching" },
    { n: headlineStats.phdGuided, l: "Ph.D. scholars guided" },
    { n: headlineStats.translatedBooks, l: "technical books in Marathi" },
    { n: headlineStats.books, l: "books published" },
  ];
  return (
    <header id="top" className="relative overflow-hidden px-5 pt-28 sm:px-8 md:pt-32">
      <div className="mx-auto grid max-w-7xl items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          {/* Disabled for now:
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 1 }} className="mb-6 text-ink2">
            Professor Emeritus, Electronics &amp; Telecommunication Engineering
          </motion.p>
          */}
          <h1 className="text-[clamp(3rem,9.2vw,7.25rem)] leading-[0.95]" aria-label={profile.name}>
            <span className="mb-3 block text-[0.34em] leading-none tracking-normal text-muted italic">Prof. Dr.</span>
            {name.map((w, i) => (
              <span key={w} className="-mb-[0.02em] block overflow-hidden pt-[0.14em] pb-[0.1em]" aria-hidden>
                <motion.span className="block" variants={word} custom={i} initial="hidden" animate="show">
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }}>
            <p className="measure mt-8 text-[1.2rem] text-ink2">
              Researcher in signal and image processing, mentor of nineteen doctoral scholars, and for sixteen years an administrator at Dr. Babasaheb Ambedkar Technological University, Lonere, where he served as Dean (Academics) and led the university&rsquo;s quality, innovation and ICT functions.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#library" className="rounded-full bg-[var(--forest)] px-7 py-3.5 text-[var(--forest-fg)] transition hover:opacity-90 active:scale-[0.98]">
                Explore the research
              </a>
              <a href="#biography" className="link py-2">
                Read the biography
              </a>
            </div>
            <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-muted">
              {profileLinks.filter((l) => l.kind === "research").map((l) => (
                <ExternalLink key={l.id} href={l.url} className="hover:text-ink">
                  {l.label}
                </ExternalLink>
              ))}
              <ExternalLink href={profileLinks.find((l) => l.id === "linkedin")!.url} className="hover:text-ink">
                LinkedIn
              </ExternalLink>
            </p>
          </motion.div>
        </div>

        <motion.figure initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3, ease, delay: 0.2 }} className="relative mx-auto w-full max-w-[22rem] p-3 md:col-span-5 md:max-w-[30rem]">
          <div className="portrait-disc relative aspect-square overflow-hidden rounded-full">
            <Image src="/images/portrait.webp" alt="Portrait of Prof. Dr. Sanjay Laxmikant Nalbalwar" fill priority sizes="(min-width: 768px) 30rem, 22rem" className="scale-[1.04] object-cover object-[50%_18%]" />
          </div>
        </motion.figure>
      </div>

      <SignalField className="mx-auto mt-14 h-52 max-w-7xl md:h-64" />

      <div className="mx-auto max-w-7xl border-y border-[var(--line)]">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {ledger.map((s, i) => (
            <div key={s.l} className={`flex flex-col-reverse gap-2 px-1 py-6 md:px-6 ${i ? "md:border-l md:border-[var(--line)]" : ""} ${i % 2 ? "border-l border-[var(--line)] pl-5" : ""}`}>
              <dt className="order-2 text-[0.92rem] text-muted">{s.l}</dt>
              <dd className="num text-[clamp(2rem,4vw,3rem)] leading-none">
                <Counter to={s.n} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <a href="#biography" aria-label="Scroll to biography" className="no-print mx-auto flex w-fit items-center gap-2 py-6 text-sm text-muted transition hover:text-ink">
        <ArrowDown size={15} /> Begin
      </a>
      {/* The portrait's white backdrop multiplies into a soft sage disc in both themes; a brass hairline ring sits just outside it. */}
      <style>{`.portrait-disc{background:#d9e1d3;box-shadow:0 0 0 10px var(--paper),0 0 0 11px var(--brass)}.portrait-disc img{mix-blend-mode:multiply}`}</style>
    </header>
  );
}
