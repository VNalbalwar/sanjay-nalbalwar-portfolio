import type { Verified } from "./types";

export type Book = Verified & {
  title: string;
  publisher: string;
  isbn?: string;
  referredAt: string;
  kind: "Authored" | "Translated into Marathi" | "Reviewer";
  note?: string;
};

/** Source: biodata section 2.2. The biodata says "5 books"; it lists 7 rows, including a reviewer role. */
export const books: Book[] = [
  { title: "A Text Book on Signals and Systems", publisher: "Synergy Knowledge Publication, Mumbai", isbn: "978-93-8335-236-4", referredAt: "University of Mumbai and DBATU, Lonere", kind: "Authored", verified: true },
  { title: "A Text Book on Basic Electronics", publisher: "Synergy Knowledge Publication, Mumbai", isbn: "978-93-8335-246-3", referredAt: "—", kind: "Authored", verified: true },
  { title: "Electronics Devices and Circuits", publisher: "Synergy Knowledge Publication, Mumbai", isbn: "978-93-8335-261-6", referredAt: "DBATU, Lonere", kind: "Authored", verified: true },
  { title: "Digital Signal Processing", publisher: "Synergy Knowledge Publication, Mumbai", isbn: "978-93-8335-238-8", referredAt: "—", kind: "Authored", verified: true },
  { title: "Signals and Systems", publisher: "AICTE", isbn: "978-93-6023-086-5", referredAt: "Referred in the AICTE Model Curriculum; available on the e-Kumbh website", kind: "Authored", verified: true },
  { title: "Signals and Systems (translated into Marathi)", publisher: "AICTE", referredAt: "Referred in the AICTE Model Curriculum; available on the e-Kumbh website", kind: "Translated into Marathi", verified: true },
  { title: "Basic Electronics (English-language book)", publisher: "AICTE", referredAt: "Referred in the AICTE Model Curriculum; available on the e-Kumbh website", kind: "Reviewer", verified: true, note: "Role: reviewer of the English-language book." },
];

export const translationFacts = {
  books: 70,
  detail:
    "As AICTE's coordinator for the whole of Maharashtra, he appointed translators and reviewers from across the state. The biodata records 70 technical books translated into Marathi to date, under a Rs. 1 crore Ministry of Education project.",
  felicitation: "Felicitated by AICTE on 15 July 2022 for coordinating the activity.",
};

export type Award = Verified & {
  title: string;
  by: string;
  year: string;
  kind: "Award" | "Fellowship" | "Appreciation";
  detail?: string;
  image?: { src: string; alt: string; w: number; h: number; credit: string };
};

/** Source: biodata section 12. */
export const awards: Award[] = [
  { title: "Padma Vibhushan Dr. Murli Manohar Joshi Teachers Award", by: "Federation for World Academics", year: "31 Oct 2025", kind: "Award", verified: true, detail: "A private-foundation award; not a Government of India Padma honour." },
  { title: "Best Paper Award, ICAMIDA 2025", by: "International Conference on Applications of Machine Intelligence and Data Analytics (AIML Track)", year: "21–22 Aug 2025", kind: "Award", verified: true, detail: "For “Deep Learning Based Framework for Classifying Lung Cancer Stages Using CT Imaging Data”." },
  { title: "Lifetime Achievement in Education & Research Award", by: "I2OR International Award 2025", year: "2025", kind: "Award", verified: true },
  { title: "The Pride of Maharashtra: Aadarsh Shikshan Seva Sanman", by: "Maharashtra Journalist Foundation", year: "Nov 2023", kind: "Award", verified: true },
  { title: "Bharat Gaurav Puraskar", by: "KTK Outstanding Achievers and Education Foundation", year: "2023", kind: "Award", verified: true },
  { title: "Felicitation for Technical Book Translation in Marathi", by: "AICTE", year: "15 Jul 2022", kind: "Appreciation", verified: true, detail: "For coordinating the activity for the entire state of Maharashtra." },
  { title: "Award of Excellence in Higher Education", by: "VI Foundation, 3rd Industry Leadership Conclave and Awards (ILCA 2021)", year: "2021", kind: "Award", verified: true },
  { title: "Indo Asian Distinguished Professor Award", by: "International Multidisciplinary Research Foundation", year: "5 Oct 2021", kind: "Award", verified: true, detail: "Presented on World Teachers' Day, 5 October 2021, in recognition of consistent superior performance in Electronics & Telecommunication Engineering.", image: { src: "/images/indo-asian-award-2021.webp", alt: "Indo Asian Distinguished Professor Award 2021 certificate issued to Dr. Sanjay Laxmikant Nalbalwar", w: 1000, h: 1413, credit: "Certificate as published on dbatu.ac.in" } },
  { title: "Best Teacher Award (AY 2006–2007)", by: "Dr. Babasaheb Ambedkar Technological University, Lonere", year: "18 Oct 2006", kind: "Award", verified: true },
  { title: "QIP Fellowship for Ph.D. at IIT Delhi", by: "Quality Improvement Programme", year: "Jul 2001 – Jul 2004", kind: "Fellowship", verified: true },
  { title: "Recognised Innovation Ambassador", by: "Ministry of Education's Innovation Cell (MIC)", year: "—", kind: "Appreciation", verified: true },
  { title: "4.5 / 5 rating as President of the Institute Innovation Council", by: "MHRD Innovation Cell", year: "—", kind: "Appreciation", verified: true },
];

export type Membership = Verified & { body: string; grade: string; id?: string };

/** Source: biodata section 5. Identifiers shown only as printed in the biodata. */
export const memberships: Membership[] = [
  { body: "IEEE", grade: "Senior Member", id: "98108979", verified: true },
  { body: "IETE", grade: "Fellow", id: "F-123221", verified: true },
  { body: "Institution of Engineers (India)", grade: "Fellow", id: "F-1284675", verified: true },
  { body: "InSc", grade: "Fellow", verified: true },
  { body: "Computer Society of India", grade: "Life Member", id: "LM54758", verified: true },
  { body: "Indian Society for Technical Education", grade: "Life Member", id: "LM17072", verified: true },
  { body: "Institution of Engineers (India)", grade: "Professional & Chartered Engineer (from 2021)", verified: true },
  { body: "NABET-accredited course", grade: "Lead Auditor, ISMS (ISO/IEC 27001:2005)", verified: true },
];
