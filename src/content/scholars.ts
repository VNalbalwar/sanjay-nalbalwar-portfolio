import type { Scholar } from "./types";

/** Source: biodata section 2.3. 19 completed; 6 in progress (names not given in the biodata). */
export const scholarStats = {
  phdGuided: 19,
  phdInProgress: 6,
  mtechTheses: 100,
  btechProjects: 500,
};

const s = (
  roll: string,
  name: string,
  title: string,
  year: number,
  domain: string,
  role: Scholar["role"] = "Guide",
  coGuide?: string,
): Scholar => ({ roll, name, title, year, domain, role, coGuide, verified: true });

export const scholars: Scholar[] = [
  s("RS20190305", "Pathak Prasad Arvind", "A Microstrip Flexible UWB Antenna for Wearable and Wireless Applications", 2026, "Antennas & Wireless", "Guide", "Dr. Abhay Wagh"),
  s("RS20170308", "Kulkarni Mukund Narayan", "Workload Prediction for Virtual Machine", 2025, "Computing Systems", "Guide", "Dr. A. B. Nandgaonkar"),
  s("RS20150303", "Kadge Sushma Shankar", "Analysis and Classification of the Fundus Images for the Diagnosis of Eye Disease", 2024, "Biomedical Signals & Imaging", "Guide", "Dr. A. B. Nandgaonkar"),
  s("RS20180301", "Gaikwad Snehal Sunil", "Development of Techniques for Handwritten Devanagari Character Recognition", 2024, "Image & Document Analysis", "Guide", "Dr. A. B. Nandgaonkar"),
  s("RS20140303", "Kotade Amol Bhaskar", "Analysis of PAPR Reduction in OFDM and System Performance Improvement", 2024, "Wireless Communication", "Co-guide", "Dr. A. B. Nandgaonkar (principal guide)"),
  s("RS20140301", "Bhide Girish Govind", "Analysis, Simulation and Design of Micro-strip Patch Antenna Using Suitable Computational Electromagnetics Method", 2024, "Antennas & Wireless", "Co-guide", "Dr. A. B. Nandgaonkar (principal guide)"),
  s("RS20170310", "Puri Digambar Vitthalbuwa", "Detection of Alzheimer's Diseases Using EEG Recording", 2023, "Biomedical Signals & Imaging"),
  s("RS20170311", "Rajput Jasawant Laxmansing", "Some Studies on Diagnosis & Curing of Cancer Deploying Hyperthermia Technique", 2022, "Biomedical Signals & Imaging", "Co-guide", "Dr. A. B. Nandgaonkar (principal guide)"),
  s("RS20130302", "Yuvraj V. Parkale", "Development of Compressed Sensing Techniques for 1-D and 2-D Signals", 2019, "Compressed Sensing & Signal Processing"),
  s("RS20130301", "Pallavi Pandurang Ingale", "An Information Extraction Approach to Acoustic Signal Processing: Analysis, Segregation and Detection", 2020, "Speech & Audio"),
  s("RS20140302", "Khobragade Sanjay Vivekanand", "Some Studies on Fractal Tree MSA for Multiband Application", 2020, "Antennas & Wireless", "Guide", "Dr. A. B. Nandgaonkar"),
  s("RS20140304", "Nirmal Pratima Chabbilal", "Minimizing Mutual Coupling in MIMO Antenna", 2020, "Antennas & Wireless", "Co-guide", "Dr. A. B. Nandgaonkar (principal guide)"),
  s("RS20120302", "Pavan Paikrao", "Speech Enhancement in Real Time Background Noise Environment Based on Optimized Modulation Spectral Subtraction", 2019, "Speech & Audio"),
  s("10022P0449", "S. M. Kulkarni", "Stabilization of Jittery Videos Using Feature Point Matching Technique", 2020, "Image & Video Processing"),
  s("RS20120303", "Rohit Gawade", "Development of Energy Efficient Technique for Wireless Network", 2018, "Wireless Sensor Networks"),
  s("RS20090302", "V. V. Ingle", "Some Studies on HRV Signal Processing", 2018, "Biomedical Signals & Imaging"),
  s("RS20090303", "M. P. Bhagat", "Wireless Power Transmission", 2018, "Antennas & Wireless"),
  s("RS2007061", "S. M. Jadhav", "Artificial Neural Network Based Medical Decision Support System for Cardiac Arrhythmia Detection and Classification Using ECG Signal Data", 2015, "Biomedical Signals & Imaging", "Co-guide", "Dr. A. A. Ghatol (principal guide)"),
  s("RS20090304", "Munir Sayyad", "Next Generation Telecom Network Optimization", 2014, "Telecom Networks"),
];
