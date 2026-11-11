import { Heading, Section } from "./ui";

/**
 * Deliberately empty of opinions: nothing here is attributed to Prof. Nalbalwar until he supplies it.
 * To publish an answer, add it to src/content/reflections.ts and set `answer`.
 */
import { reflections } from "@/content/reflections";

export function Reflections() {
  const answered = reflections.filter((r) => r.answer);
  return (
    <Section id="reflections" tone="surface">
      <Heading id="reflections" lead="A section for Prof. Nalbalwar's own words on education, research and mentoring. These are draft questions prepared for him; each answer will be published here only once he has given it.">
        Reflections, in his own words.
      </Heading>
      <ul className="grid gap-x-12 md:grid-cols-2">
        {reflections.map((r) => (
          <li key={r.q} className="border-t border-[var(--line)] py-6">
            <h3 className="text-[1.45rem] leading-snug">{r.q}</h3>
            {r.answer ? <p className="measure mt-3">{r.answer}</p> : <p className="mt-3 text-sm text-muted">Awaiting his answer.</p>}
          </li>
        ))}
      </ul>
      {answered.length === 0 && <p className="mt-8 text-sm text-muted">No statements have been attributed to him yet.</p>}
    </Section>
  );
}
