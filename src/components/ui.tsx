"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export const ease = [0.16, 1, 0.3, 1] as const;

/** Section wrapper: consistent id/rhythm. Each section sets its own surface and layout inside. */
export function Section({ id, children, className, tone = "paper" }: { id: string; children: React.ReactNode; className?: string; tone?: "paper" | "surface" | "forest" }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className={clsx(
        "relative px-5 py-24 sm:px-8 md:py-32",
        tone === "surface" && "bg-surface",
        tone === "forest" && "bg-[var(--forest)] text-[var(--forest-fg)]",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function Heading({ id, children, lead, className }: { id: string; children: React.ReactNode; lead?: React.ReactNode; className?: string }) {
  return (
    <header className={clsx("mb-14 grid gap-6 md:grid-cols-12 md:gap-10", className)}>
      <h2 id={`${id}-h`} className="text-[clamp(2.1rem,5vw,4rem)] md:col-span-7">
        {children}
      </h2>
      {lead && <p className="measure self-end text-ink2 md:col-span-5 [section.bg-\[var\(--forest\)\]_&]:text-inherit">{lead}</p>}
    </header>
  );
}

/** One quiet reveal for blocks entering the viewport (opacity only on first paint is already visible). */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, className, suffix = "", duration = 1.8 }: { to: number; className?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return setV(to);
    const c = animate(0, to, { duration, ease, onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to, reduce, duration]);
  return (
    <span ref={ref} className={className} aria-label={`${to.toLocaleString("en-IN")}${suffix}`}>
      <span aria-hidden>{v.toLocaleString("en-IN")}{suffix}</span>
    </span>
  );
}

export function Badge({ children, tone = "line" }: { children: React.ReactNode; tone?: "line" | "brass" | "sage" | "oxide" }) {
  const t = {
    line: "border-[var(--line)] text-ink2",
    brass: "border-[var(--brass)] text-brassink",
    sage: "border-[var(--sage)] text-forest",
    oxide: "border-[var(--oxide)] text-oxide",
  }[tone];
  return <span className={clsx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.8rem] leading-5 whitespace-nowrap", t)}>{children}</span>;
}

/** Shown for any record whose verification flag is false. */
export function Pending({ note }: { note?: string }) {
  return (
    <span title={note} className="inline-flex items-center gap-1.5 text-[0.8rem] text-oxide">
      <span className="size-1.5 rounded-full bg-[var(--oxide)]" aria-hidden />
      Awaiting confirmation{note ? ` — ${note}` : ""}
    </span>
  );
}

export function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={clsx("link", className)}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function fmtDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(+d)) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
