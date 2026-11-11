/**
 * Source: biodata section 2.4, in the biodata's own order and wording.
 * Rule: show only what the biodata states. A field that is not stated is left out (never inferred).
 * Dates are ISO (the biodata writes them day/month/year).
 */
export type PatentEntry = {
  id: string;
  title: string;
  /** Wording the biodata uses for the type, if it gives one */
  type?: string;
  numberLabel: string;
  number: string;
  jurisdiction?: string;
  filed?: string;
  published?: string;
  granted?: string;
  /** Extra statements from the biodata, kept in its words */
  remarks?: string[];
};

export const patents: PatentEntry[] = [
  {
    id: "image-compression",
    title: "System and Method for Image Compression",
    numberLabel: "Application No.",
    number: "2024 2101 7118",
    filed: "2024-03-09",
    published: "2024-05-03",
    remarks: ["Patent Office Journal No. 18/2024, p. 41454."],
  },
  {
    id: "hypnosis-analysis",
    title: "System for Hypnosis Analysis for Stress Reduction Using Imagery",
    numberLabel: "Patent No.",
    number: "445334",
    granted: "2022-06-21",
  },
  {
    id: "snake-identification",
    title: "System to Identify a Snake and a Method Thereof",
    numberLabel: "Patent No.",
    number: "2022/09386",
    jurisdiction: "Republic of South Africa",
    granted: "2022-12-21",
  },
  {
    id: "hexagonal-cpw-antenna",
    title: "Hexagonal Shaped CPW FED Dual Band Antenna",
    type: "Design Patent",
    numberLabel: "Application No.",
    number: "483436-001",
    filed: "2025-12-11",
  },
  {
    id: "ai-healthcare-device",
    title: "An Electronics Device for AI-Assisted Healthcare Monitoring Applications",
    type: "Design Patent",
    numberLabel: "Application No.",
    number: "485593-001",
    filed: "2025-12-30",
  },
  {
    id: "obstacle-detection-device",
    title: "Multi-Directional Obstacle Detection Computing Device",
    type: "UK International Design Patent",
    numberLabel: "Design Application No.",
    number: "6518161",
    jurisdiction: "United Kingdom",
    filed: "2026-04-03",
    granted: "2026-05-29",
  },
  {
    id: "handwritten-text-segmentation-device",
    title: "Computing Device for Mask-Driven Segmentation of Handwritten Text Lines",
    type: "UK International Design Patent",
    numberLabel: "Design Application No.",
    number: "6518162",
    jurisdiction: "United Kingdom",
    filed: "2026-04-03",
    granted: "2026-05-29",
  },
  {
    id: "devanagari-line-segmentation",
    title: "Line Segmentation System for Processing Handwritten Devanagari Document Images Using a Mask-Based Approach",
    numberLabel: "Application No.",
    number: "202621042907",
    filed: "2026-04-03",
    published: "2026-05-29",
  },
  {
    id: "portable-obstacle-detection",
    title: "Multidimensional Portable Obstacle Detection System Using Multi-Sensor Feedback for Visually Disabled Persons",
    numberLabel: "Application No.",
    number: "202621042906",
    filed: "2026-04-03",
    published: "2026-05-29",
  },
];
