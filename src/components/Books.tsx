"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { books, translationFacts } from "@/content/credentials";
import { Badge, Counter, Heading, Section, ease } from "./ui";

const spines = ["var(--forest)", "var(--sage)", "var(--brass)", "var(--oxide)", "var(--ink-2)", "var(--forest)", "var(--muted)"];
const heights = [15, 13.5, 14.5, 12.5, 15.5, 14, 13];

export function Books() {
  const [i, setI] = useState(0);
  const b = books[i];
  return (
    <Section id="books" tone="surface">
      <Heading id="books" lead="Five published books and twenty-five book chapters are recorded in the biodata. The seven titles below are the book entries it lists; one is a reviewer role and one a translation.">
        Textbooks written for the classroom.
      </Heading>

      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="flex items-end gap-2 border-b-[6px] border-[var(--ink)] px-3 sm:gap-3" role="tablist" aria-label="Books">
            {books.map((bk, n) => (
              <button
                key={bk.title}
                role="tab"
                aria-selected={n === i}
                aria-label={bk.title}
                onClick={() => setI(n)}
                className="group relative w-full max-w-[4.2rem] rounded-t-[2px] text-left transition-transform duration-500 ease-out hover:-translate-y-2 aria-selected:-translate-y-4"
                style={{ height: `${heights[n]}rem`, background: spines[n % spines.length] }}
              >
                <span className="absolute inset-x-0 top-3 mx-auto block h-px w-8 bg-white/40" />
                <span className="absolute bottom-4 left-1/2 max-h-[85%] -translate-x-1/2 overflow-hidden font-serif text-[0.9rem] leading-none whitespace-nowrap text-white [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
                  {bk.title.replace("A Text Book on ", "")}
                </span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={b.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="mt-10">
              <Badge tone={b.kind === "Authored" ? "sage" : "brass"}>{b.kind}</Badge>
              <h3 className="mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)]">{b.title}</h3>
              <dl className="mt-6 grid max-w-xl gap-y-3 text-[0.98rem] sm:grid-cols-[8rem_1fr]">
                <dt className="text-muted">Publisher</dt>
                <dd>{b.publisher}</dd>
                {b.isbn && (
                  <>
                    <dt className="text-muted">ISBN</dt>
                    <dd className="num">{b.isbn}</dd>
                  </>
                )}
                <dt className="text-muted">Referred at</dt>
                <dd>{b.referredAt}</dd>
              </dl>
              {b.note && <p className="mt-4 text-sm text-muted">{b.note}</p>}
            </motion.div>
          </AnimatePresence>
        </div>

        <aside className="rounded-[3px] bg-[var(--forest)] p-8 text-[var(--forest-fg)] md:col-span-5 md:p-10" aria-labelledby="marathi-h">
          <p lang="mr" className="font-serif text-[1.7rem] leading-snug">
            अभियांत्रिकी शिक्षण मराठीतून
          </p>
          <h3 id="marathi-h" className="mt-3 text-2xl">
            Technical education in the student&rsquo;s own language
          </h3>
          <p className="num mt-8 text-[clamp(4.5rem,9vw,7rem)] leading-none text-[var(--brass)]">
            <Counter to={translationFacts.books} />
          </p>
          <p className="mt-2 opacity-90">technical books translated into Marathi</p>
          <p className="mt-6 text-[0.98rem] opacity-90">{translationFacts.detail}</p>
          <p className="mt-4 text-[0.98rem] opacity-90">{translationFacts.felicitation}</p>
        </aside>
      </div>
    </Section>
  );
}
