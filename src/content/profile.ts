export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanjaynalbalwar.vercel.app";

export const profile = {
  name: "Prof. Dr. Sanjay Laxmikant Nalbalwar",
  short: "Sanjay Nalbalwar",
  title: "Professor Emeritus",
  department: "Electronics & Telecommunication Engineering",
  institution: "Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere",
  tagline: "Professor Emeritus · Academic Leader · Researcher · Innovation & Technology Expert",
  // Public email as printed in the biodata (section 1). Phone intentionally omitted.
  email: "slnalbalwar@gmail.com",
  emeritusFrom: "5 August 2026",
};

export type ProfileLink = { id: string; label: string; url: string; kind: "research" | "social" | "editorial"; note?: string };

export const profileLinks: ProfileLink[] = [
  { id: "scholar", label: "Google Scholar", url: "https://scholar.google.com/citations?hl=en&user=PUECsiAAAAAJ", kind: "research" },
  { id: "orcid", label: "ORCID", url: "https://orcid.org/0000-0001-7307-0243", kind: "research" },
  { id: "wos", label: "Web of Science", url: "https://www.webofscience.com/wos/author/record/AAZ-8524-2021", kind: "research" },
  { id: "researchgate", label: "ResearchGate", url: "https://www.researchgate.net/profile/Sanjay-Nalbalwar-2", kind: "research" },
  { id: "vidwan", label: "Vidwan", url: "https://vidwan.inflibnet.ac.in/profile/351539", kind: "research" },
  {
    id: "adsi",
    label: "AD Scientific Index",
    url: "https://adscientificindex.com/scientist/sanjay-nalbalwarsanjay-nalbalwar-sanjay-l-nalbalwar/4305050",
    kind: "research",
  },
  { id: "stm", label: "STM Journals editorial profile", url: "https://journals.stmjournals.com/editor-detail/profile/238416/", kind: "editorial" },
  { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/dr-sanjay-nalbalwar", kind: "social" },
];

export type MetricSource = {
  source: string;
  url: string;
  retrieved: string;
  citations?: number;
  hIndex?: number;
  i10?: number;
  works?: string;
  how: "Biodata (self-reported)" | "Public page, checked once" | "Public API";
  note?: string;
};

/**
 * Metrics are never merged. Each source is shown with its own retrieval date.
 * Live refresh: /api/metrics (OpenAlex). Scholar is not scraped by the site; the Scholar row
 * is a manual snapshot and must be updated by the owner.
 */
export const metricSources: MetricSource[] = [
  {
    source: "Biodata 2026",
    url: "https://scholar.google.com/citations?hl=en&user=PUECsiAAAAAJ",
    retrieved: "2026-09-05",
    citations: 2105,
    hIndex: 26,
    i10: 58,
    works: "200 journal · 100 conference",
    how: "Biodata (self-reported)",
    note: "Document dated 5 Sept 2026. Counts of 200 and 100 are as printed.",
  },
  {
    source: "Google Scholar",
    url: "https://scholar.google.com/citations?hl=en&user=PUECsiAAAAAJ",
    retrieved: "2026-11-11",
    citations: 2190,
    hIndex: 27,
    i10: 59,
    how: "Public page, checked once",
    note: "Snapshot of the public profile. Citations since 2021: 1,362 (h 20, i10 44).",
  },
  {
    source: "OpenAlex",
    url: "https://openalex.org/A5058413396",
    retrieved: "2026-11-11",
    citations: 1355,
    hIndex: 21,
    i10: 39,
    works: "183 works",
    how: "Public API",
    note: "Open index; covers fewer venues than Scholar, so lower counts are expected.",
  },
];

export const headlineStats = {
  teachingYears: 36,
  researchYears: 20,
  adminYears: 16,
  phdGuided: 19,
  books: 5,
  chapters: 25,
  patentEntries: 9,
  grantedPatents: 2,
  grantedDesigns: 4,
  translatedBooks: 70,
  affiliatedColleges: 455,
};
