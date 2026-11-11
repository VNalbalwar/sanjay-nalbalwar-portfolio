import { Heading, Reveal, Section } from "./ui";

/** Every statement below traces to the biodata (2026), or to details confirmed by the site owner (B.E./M.E.). */
const chapters = [
  {
    h: "Training",
    p: "Sanjay Nalbalwar studied at Shri Guru Gobind Singhji College of Engineering and Technology, Nanded, taking his B.E. in 1990 and an M.E. in Electronics in 1995. He joined Dr. Babasaheb Ambedkar Technological University at Lonere on 24 August 1996. A Quality Improvement Programme fellowship (July 2001 to July 2004) took him to IIT Delhi, where he earned his Ph.D. in Communication and Signal Processing in 2008.",
  },
  {
    h: "Teaching and research",
    p: "Over thirty-six years of teaching and twenty of research, he has taught Signals and Systems, Digital Signal Processing, Linear Algebra and Probability and Random Processes at undergraduate level, and Advanced DSP, Statistical Signal Processing, Estimation and Detection Theory, Multirate Signal Processing and Quantum Technology at postgraduate level. An AICTE R&D grant in 2006 supported his work on multirate DSP algorithms on fast FPGAs, an early marker of the filter-bank thread that runs through later work.",
  },
  {
    h: "A research programme across domains",
    p: "His papers span compressed sensing and wavelets, multirate and non-uniform filter banks, speech enhancement, ECG, HRV and EEG analysis, video stabilisation, wireless sensor networks, and microstrip and MIMO antennas. He has guided nineteen Ph.D. scholars to completion and six more are in progress, along with about a hundred M.Tech. theses and five hundred B.Tech. projects. Five granted patents and four granted designs extend that work into image compression, snake identification, healthcare monitoring and assistive technology.",
  },
  {
    h: "Building the institution",
    p: "From May 2010 he headed the Department of Electronics & Telecommunication Engineering and chaired its Board of Studies and the Research Committee, designing curricula for five undergraduate and eleven postgraduate programmes. He became Director of Information & Communication Technology in 2016, Director of DFIIE, the university's innovation and incubation company, in 2018, Dean (Academics) in 2019, and Director of the Internal Quality Assurance Cell in 2023. As Dean, he oversaw quality assurance across 455 affiliated colleges and brought twelve new programmes into the university between 2022 and 2024. He has also served as in-charge Vice-Chancellor, Registrar and Finance Officer for short periods.",
  },
  {
    h: "Beyond one university",
    p: "For the Government of Maharashtra he sat on the committee for implementing the National Education Policy 2020 in engineering education and on the perspective-plan committee for technical education, 2025 to 2030. For AICTE he coordinates, for the whole state, the translation of technical textbooks into Marathi, with seventy books completed. He has been an AICTE scrutiny expert since 2014, a NAAC peer-team member, and a member of a UGC expert committee on online and distance programmes.",
  },
  {
    h: "Now",
    p: "His administrative tenure at DBATU closed on 31 July 2026 and he became Professor Emeritus on 5 August 2026. He continues as an editor and reviewer for several journals, chairs conference sessions abroad, and has completed several online faculty programmes in quantum technologies between 2025 and 2026, a field that now sits alongside signal processing in his work.",
  },
];

export function Biography() {
  return (
    <Section id="biography">
      <Heading id="biography" lead="A career in engineering education, told in six parts.">
        Teaching, research and institution-building, in one working life.
      </Heading>
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-12">
        <div className="hidden md:col-span-3 md:block" aria-hidden />
        <div className="md:col-span-9">
          {chapters.map((c, i) => (
            <Reveal key={c.h} className="grid gap-3 border-t border-[var(--line)] py-9 md:grid-cols-9 md:gap-10">
              <h3 className="text-2xl text-forest md:col-span-3">{c.h}</h3>
              <p className={`measure md:col-span-6 ${i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-forest" : ""}`}>{c.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
