/** Every curated record carries a verification flag so the UI can mark unconfirmed items. */
export type Verified = {
  /** true = confirmed against the biodata or an official source */
  verified: boolean;
  /** why it is unconfirmed, shown to the owner/visitor */
  note?: string;
};

export type Role = Verified & {
  title: string;
  org: string;
  from: string; // ISO-ish or year
  to: string | "present";
  group: "academic" | "administrative" | "statutory" | "national" | "external";
  summary?: string;
  current?: boolean;
};

export type Project = Verified & {
  id: string;
  title: string;
  agency: string;
  value: string;
  start: string;
  end?: string;
  status: "Completed" | "Ongoing" | "Status not stated";
  category: "Research" | "Laboratory & Infrastructure" | "Institutional Development" | "Innovation & Industry";
  note?: string;
};

export type Scholar = Verified & {
  roll: string;
  name: string;
  title: string;
  year: number;
  domain: string;
  coGuide?: string;
  role: "Guide" | "Co-guide";
};

export type Publication = {
  title: string;
  venue: string;
  year: number;
  type: "journal" | "conference" | "chapter" | "book";
  indexing?: string;
  domain: string;
  doi?: string;
  url?: string;
  authors?: string[];
  source: "biodata" | "orcid" | "openalex";
};
