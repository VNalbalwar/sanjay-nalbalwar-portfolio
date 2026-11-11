import { courses, quantumFdps, quantumNote } from "@/content/engagement";
import { Heading, Reveal, Section } from "./ui";

export function Teaching() {
  return (
    <>
      <Section id="teaching">
        <Heading id="teaching" lead="Thirty-six years of teaching, from first-year mathematics for engineers to postgraduate estimation theory.">
          What he has taught.
        </Heading>
        <div className="grid gap-12 md:grid-cols-2">
          {(["UG", "PG"] as const).map((lv) => (
            <div key={lv}>
              <h3 className="text-3xl">{lv === "UG" ? "Undergraduate" : "Postgraduate"}</h3>
              <ul className="mt-5">
                {courses[lv].map((c) => (
                  <li key={c} className="border-t border-[var(--line)] py-3.5 font-serif text-[1.3rem]">{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="measure mt-12 text-ink2">Beyond the classroom he has delivered expert lectures at AICTE-ISTE short-term programmes and QIP workshops, produced video lectures, notes and transcripts for e-learning, and organised fifteen faculty development programmes and short-term training programmes.</p>
      </Section>

      <Section id="emerging" tone="surface">
        <Heading id="emerging" lead="Between February 2025 and May 2026 he completed seven online faculty programmes in quantum technologies, a new field he is learning alongside the one he has taught for decades.">
          Still learning: seven programmes in quantum technologies.
        </Heading>
        <ol className="grid gap-x-10 md:grid-cols-2">
          {quantumFdps.map((q, i) => (
            <Reveal key={q.code} delay={(i % 2) * 0.05}>
              <li className="grid grid-cols-[4rem_1fr] gap-x-4 border-t border-[var(--line)] py-4">
                <span className="num text-lg text-brassink">{q.code}</span>
                <div>
                  <h3 className="text-[1.25rem] leading-snug">{q.name}</h3>
                  <p className="text-sm text-muted">{q.when}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="measure mt-8 text-ink2">{quantumNote}</p>
        <ul className="mt-14 flex flex-wrap gap-3">
          {["Quantum technologies", "Artificial intelligence", "Signal and image processing", "Emerging communication technologies", "Research and innovation management", "Higher-education leadership", "Academic quality systems", "University transformation"].map((t) => (
            <li key={t} className="rounded-full border border-[var(--line)] px-4 py-2">{t}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
