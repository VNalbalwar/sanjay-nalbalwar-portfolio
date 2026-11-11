"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { sections } from "@/content/sections";
import { ease } from "./ui";

function ThemeToggle() {
  const [theme, setTheme] = useState<string>("light");
  useEffect(() => setTheme(document.documentElement.dataset.theme ?? "light"), []);
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      setTheme(next);
    };
    // View Transitions give a soft cross-fade where supported.
    const d = document as Document & { startViewTransition?: (cb: () => void) => void };
    d.startViewTransition ? d.startViewTransition(apply) : apply();
  };
  return (
    <button onClick={flip} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="flex size-10 items-center justify-center rounded-full border border-[var(--line)] transition hover:bg-[var(--line-soft)]">
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const on = () => setSolid(scrollY > 40);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-[var(--paper)]">
        Skip to content
      </a>
      <nav aria-label="Primary" className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] backdrop-blur-md" : ""}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="font-serif text-lg tracking-tight">
            Sanjay L. Nalbalwar
          </a>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden items-center gap-6 pr-4 text-[0.95rem] md:flex">
              {["library", "patents", "leadership", "contact"].map((id) => (
                <a key={id} href={`#${id}`} className="link">
                  {sections.find((s) => s.id === id)!.label.split(" ")[0]}
                </a>
              ))}
            </div>
            <button onClick={() => setOpen(true)} className="h-10 rounded-full border border-[var(--line)] px-5 text-[0.95rem] transition hover:bg-[var(--line-soft)]" aria-haspopup="dialog">
              Index
            </button>
            <ThemeToggle />
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-[var(--brass)]" />
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" aria-label="Site index" className="fixed inset-0 z-[60] overflow-y-auto bg-paper" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.7, ease }}>
            <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg">Index</span>
                <button onClick={() => setOpen(false)} aria-label="Close index" className="flex size-10 items-center justify-center rounded-full border border-[var(--line)]">
                  <X size={18} />
                </button>
              </div>
              <ul className="mt-10 grid gap-x-12 sm:grid-cols-2">
                {sections.map((s, i) => (
                  <motion.li key={s.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.025, duration: 0.6, ease }} className="border-t border-[var(--line)]">
                    <a href={`#${s.id}`} onClick={() => setOpen(false)} className="group flex items-baseline justify-between gap-6 py-4">
                      <span className="font-serif text-[clamp(1.35rem,2.6vw,2rem)] transition-transform duration-500 group-hover:translate-x-2">{s.label}</span>
                      <span className="hidden max-w-[18rem] text-right text-sm text-muted lg:block">{s.blurb}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
