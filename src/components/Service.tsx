import { academicService, editorial, reviewerFor } from "@/content/engagement";
import { Heading, Reveal, Section } from "./ui";

export function Service() {
  return (
    <Section id="service">
      <Heading id="service" lead="Editorial appointments and the review work that keeps published research reliable. Terms are as given in the biodata; exact dates are not stated for all.">
        Keeping the record honest: editing, review and evaluation.
      </Heading>
      <div className="grid gap-px overflow-hidden rounded-[3px] border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
        {editorial.map((e, i) => (
          <Reveal key={e.journal} delay={(i % 2) * 0.07} className="bg-paper p-7">
            <p className="text-forest">{e.role}</p>
            <h3 className="mt-2 text-[1.55rem] leading-snug">{e.journal}</h3>
            <p className="mt-3 text-ink2">{e.publisher} · {e.term}</p>
            {e.detail && <p className="mt-1 text-sm text-muted">{e.detail}</p>}
          </Reveal>
        ))}
        <Reveal className="bg-paper p-7">
          <p className="text-forest">Reviewer</p>
          <h3 className="mt-2 text-[1.55rem] leading-snug">Elsevier, IEEE and Taylor &amp; Francis journals</h3>
          <p className="mt-3 text-ink2">{reviewerFor.join(" · ")}</p>
          <p className="mt-1 text-sm text-muted">About four years, regularly reviewing as reviewer and editor.</p>
        </Reveal>
      </div>
      <h3 className="mt-20 text-3xl">Evaluation and committee service</h3>
      <ul className="mt-6 grid gap-x-12 md:grid-cols-2">
        {academicService.map((s) => (
          <li key={s} className="border-t border-[var(--line)] py-4 text-[1.02rem]">{s}</li>
        ))}
      </ul>
    </Section>
  );
}
