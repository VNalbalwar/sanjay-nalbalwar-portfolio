import type { Publication } from "./types";

export const DOMAINS = [
  "Signal Processing & Filter Banks",
  "Compressed Sensing & Wavelets",
  "Image & Video Processing",
  "Speech & Audio",
  "Biomedical Signals",
  "Antennas & Wireless",
  "Networks & IoT",
  "Smart Grid & Power",
  "Other",
] as const;
export type Domain = (typeof DOMAINS)[number];

/** Keyword classifier so every record gets a research domain without hand-tagging. */
export function inferDomain(title: string): Domain {
  const t = title.toLowerCase();
  const has = (...k: string[]) => k.some((x) => t.includes(x));
  if (has("antenna", "mimo", "microstrip", "wimax", "uwb", "hyperthermia")) return has("hyperthermia") ? "Biomedical Signals" : "Antennas & Wireless";
  if (has("compressed sensing", "wavelet", "sensing matri")) return "Compressed Sensing & Wavelets";
  if (has("ecg", "hrv", "heart rate", "eeg", "alzheimer", "seizure", "arrhythmia", "cardiac", "patient", "qrs", "lung")) return "Biomedical Signals";
  if (has("speech", "audio", "voice", "speaker", "echo", "emotion", "acoustic", "auditory", "hearing")) return "Speech & Audio";
  if (has("image", "video", "face", "text", "handwritten", "snake", "stabiliz", "ransac", "super-resolution", "steganography", "cheque", "motion estimation", "people tracker", "drone")) return "Image & Video Processing";
  if (has("filter bank", "filter-bank", "multirate", "fir", "lattice", "nyquist", "tail-biting", "ofdm", "papr")) return "Signal Processing & Filter Banks";
  if (has("sensor network", "iot", "wireless", "mac protocol", "routing", "sip", "ss7", "ngn", "ims", "lte", "qos", "network", "wdm", "optical", "telecom", "ism band")) return "Networks & IoT";
  if (has("smart grid", "sfcl", "solar", "power transmission", "fault current")) return "Smart Grid & Power";
  return "Other";
}

type Row = [title: string, venue: string, year: number, indexing?: string];

/** Source: biodata section 18 (journal papers after Ph.D.). Titles as printed; listed indexing as printed. */
const journals: Row[] = [
  ["Impact of optimal scaling coefficients in bi-orthogonal wavelet filters on compressed sensing", "International Journal of Pervasive Computing and Communications, 17(1)", 2021, "Scopus"],
  ["Optimized Structural Compressed Sensing Matrices for Speech Compression", "IETE Journal of Research, 66(6)", 2020, "Scopus"],
  ["An Efficient Implementation and Analysis of Tail-Biting Convolution Coding Algorithm for OFDM Based System in Terms of Speed, Memory and Peak-to-Average Power Ratio Using DSP", "Wireless Personal Communications, 116(1)", 2021, "Scopus"],
  ["IoT Based Intelligent Patient Monitoring System", "International Journal of Engineering Sciences & Research Technology, 8(10)", 2019, "UGC"],
  ["Patient Healthcare System using IoT", "International Research Journal of Engineering & Technology, 6(7)", 2019, "Scopus"],
  ["A review on liquid solar array system", "International Research Journal of Engineering & Technology, 6(6)", 2019, "Google Scholar, Scribd"],
  ["Surveillance Drone", "International Research Journal of Engineering & Technology, 6(7)", 2019, "Google Scholar"],
  ["Design of Asymmetrical Antenna Using Slotted Mirror Image Ground Aperture Coupling for Multiband Application", "IETE Journal of Research, 67(2)", 2019, "Scopus"],
  ["Modified meta-heuristic-oriented compressed sensing reconstruction algorithm for bio-signals", "International Journal of Wavelets, Multiresolution and Information Processing, 17(5)", 2019, "SCImago"],
  ["Compact wideband MIMO antenna for 4G WI-MAX, WLAN and UWB applications", "AEU - International Journal of Electronics and Communications, 99", 2019, "Scopus"],
  ["Equivalence between multirate filter bank and circular lattice filter and its application in statistically matched multirate filter bank", "International Journal of Speech Technology, 22(2)", 2019, "Index Copernicus"],
  ["Deep neural network-based speech enhancement using mono channel mask", "International Journal of Speech Technology, Issue 3", 2019, "Index Copernicus"],
  ["Identification of snake type from image", "International Journal of Electrical, Electronics and Data Communication, 6(6)", 2018, "Google Scholar"],
  ["Real time abandoned object detection and addressing using IoT", "IJCER, 07", 2017, "Advance Science Index"],
  ["Video Stabilization Using Feature Point Matching", "IOP Journal of Physics: Conference Series, 787", 2017, "Scopus"],
  ["Stabilization of Jittery Videos Using Feature Point Matching Technique", "Advances in Intelligent Systems Research, 137", 2017, "SCImago"],
  ["RANSAC Algorithm for Matching Inlier Correspondences in Video Stabilization", "Advances in Image and Video Processing (UK), 5(1)", 2017, "SCImago"],
  ["Mean Territorial Energy Based Clustering Protocol for Randomly Deployed Wireless Sensor Networks", "Advances in Internet of Things, 7", 2017, "SCI"],
  ["ECG Classification using Dynamic High Pass Filtering and Statistical Framework (HRV)", "Signal Processing: An International Journal, 10(2)", 2016, "SCI"],
  ["A Centralized Energy Efficient Distance Based Routing Protocol for Wireless Sensor Networks", "Journal of Sensors, 2016", 2016, "SCImago"],
  ["Voice to the Voiceless on Android Platform", "International Journal of Industrial Electronics and Electrical Engineering", 2016, "Scopus"],
  ["Detection of Multi oriented Text in Video frames", "International Journal of Emerging Technology and Advanced Engineering, 5(7)", 2015, "Scopus"],
  ["Kernel Eigen faces Framework for Feature Extraction and face recognition", "International Journal of Emerging Technology and Advanced Engineering, 5(6)", 2015, "Scopus"],
  ["Design of Digital FIR Non-Uniform Reconfigurable Filter bank for hearing Impairments", "International Journal of Industrial Electronics and Electrical Engineering, 3(7)", 2015, "SCI"],
  ["Multi oriented Text Detection in the Video", "International Journal of Advanced Research in Electrical and Electronics Engineering, 2(10)", 2015, "OALib, TIB, Google Scholar"],
  ["Automated People Tracker for Visual Surveillance Application", "International Journal of Research in Engineering and Advanced Technology, 2(3)", 2014, "DOAJ, Index Copernicus"],
  ["A New Approach for Automatic Audio Segmentation and Reconstruction", "International Journal of Research in Engineering and Advanced Technology, 2(3)", 2014, "DOAJ"],
  ["Mac Protocol Based Low Energy Operations In Wireless Sensor Networks", "International Journal of Electronics and Communication Engineering & Technology, 5(3)", 2014, "Google Scholar, Index Copernicus"],
  ["Heart Rate Variability Analysis of Normal Sinus Rhythm, Atrial Fibrillation and Supra-ventricular Arrhythmia Using ApEn, HRV Index and LFHF Ratio", "International Journal of Scientific and Engineering Research (IJSER), 5(6)", 2014, "Index Copernicus"],
  ["QRS complex detection in ECG signal using K-Means algorithm", "International Journal of Engineering Research and Technology, 3(5)", 2014, "ResearchGate, Google Scholar"],
  ["Position of SFCL for maximum fault current reduction in smart grid", "International Journal of Advance Electrical and Electronics Engineering, 2(4)", 2013, "OALib, TIB"],
  ["Image Super-Resolution Using Multiple Images", "International Journal of Advance Electrical and Electronics Engineering, 2(4)", 2013, "OALib, TIB"],
  ["A Review on Lossy to Lossless Image Coding", "International Journal of Computer Application, 65(17)", 2013, "Google Scholar"],
  ["Emotion Recognition through Speech Using Gaussian Mixture Model and Hidden Markov Model", "International Journal of Advanced Research in Computer Science and Software Engineering, 3(4)", 2013, "DOAJ"],
  ["Design of Signal Matched Non uniform Synthesis Filter Bank: A Novel Approach", "IJECTT, 4(2)", 2013, "Scopus"],
  ["Monitoring Greenhouse using Wireless Sensor Network", "International Journal of Advanced Computer Research, 3", 2013, "CiteSeerX, J-Gate"],
  ["Lawful interception monitoring using distributed architecture for NGN", "International Journal of Electronics and Communication Engineering & Technology", 2012, "Publons, Google Scholar"],
  ["Performance Evaluation of Generalized feed-forward Neural Network Based ECG Arrhythmia Classifier", "IJCSI International Journal of Computer Science", 2012, "DOAJ"],
  ["Learning Based Single-Frame Image Super-Resolution using Contourlet Transform", "International Journal of Computer Science and Information Technologies", 2012, "Google Scholar, DOAJ"],
  ["Smart Grid: New Era of Electricity Distribution Network", "Journal of International Organization of Scientific Research of Engineering", 2012, "Google Scholar, DOAJ"],
  ["Novel Approach to Text Independent Speaker Identification", "International Journal of Electronics and Communication Engineering & Technology, 3(2)", 2012, "Google Scholar, DOAJ"],
  ["Implementation of LMS algorithm for Acoustic Echo Cancellation", "International Journal of Information Engineering and Electronic Business", 2012, "Google Scholar, DOAJ"],
  ["Artificial Neural Network Models based Cardiac Arrhythmia Disease Diagnosis from ECG Signal Data", "International Journal of Computer Applications Foundation of Computer Science", 2012, "Scopus"],
  ["Evaluation of Speech Processing with Modified Wavelet Packets to Condense the Effect of Auditory Masking", "International Journal of Signal Processing, 5(3)", 2011, "Google Scholar"],
  ["Advanced Intelligent Vehicular Analytics (AIVA) using IMS Architecture", "International Journal of Smart Home, 5(2)", 2011, "SCImago"],
  ["Automatic Recognition and Verification of Handwritten Legal and Courtesy Amounts in English Language Present on Bank Cheques", "International Journal of Computer Applications, 8", 2011, "DOAJ, Google Scholar"],
  ["Novel Speech Processing Methodology to Shrink Spectral Masking for Hearing Impaired", "International Journal of Advanced Science and Technology, 4(1)", 2011, "EBSCO, ProQuest"],
  ["Proposed Method for Wimax Microstrip Patch Antenna Design for Enhance Bandwidth and Reflection Characteristics", "International Journal of Computer and Electronics Engineering Research Science", 2010, "ICopernicus"],
  ["Next generation optimized telecom network architecture with LTE-IMS", "International Journal of Mobile Network Design and Innovation, 3(3)", 2010, "Scopus, Compendex"],
  ["Novel Approach to Resolve Network Security Issues In IP-PBX in Converged Architecture", "International Journal for Engineering Science and Technology, 2", 2010, "Google Scholar"],
  ["Review: Steganography – Bit Plane Complexity Segmentation (BPCS) Technique", "International Journal for Engineering Science and Technology, 2", 2010, "Google Scholar"],
  ["A Fast Fractional Pel Motion Estimation Algorithm", "International Journal of Advanced Engineering & Applications", 2010, "Google Scholar, Crossref"],
  ["Review of Wireless Power Transmission by Using Strongly Coupled Magnetic Resonance", "International Journal of Advanced Engineering & Applications", 2010, "Google Scholar, Crossref"],
  ["Proposed Model for SIP Security enhancement", "International Journal of Communications and Network Scientific Research", 2010, "Web of Science, Google Scholar"],
  ["Novel Approach of Analysis to improve QoS of a Multiple Server Queue", "International Journal of Communications, Network and System Sciences", 2010, "Web of Science"],
  ["Linear Phase Characterization of Non uniform Filter Bank", "Elsevier Journal of Signal Processing, 88(8)", 2008, "Scopus"],
  ["Signal Matched Two Channel Multirate Filter Bank using Nyquist filter approach", "International Journal of Modeling and Simulation (ACTA Press), 29(3)", 2009, "Quantum Engineering"],
  ["Novel Approach to Signal Matched M-Channel Multirate Filter Bank using Nyquist Filter", "International Journal of Computer Science and Information Technology, 3(1)", 2009, "WJCI"],
  ["Survival in the 2.4 GHz ISM Band: Impact on the 802.15.1 Performance", "International Journal of Computer Science and Applications, 1(2)", 2008, "ProQuest CSA"],
  ["Face recognition using locality preserving projections method", "Journal of Advanced Research in Computer Engineering, 3(1)", 2009, "EBSCO, Crossref"],
  ["Remote Administration and Network Monitoring", "International Journal of Computing Science and Communication Technologies, 1(3)", 2009, "DOAJ"],
  ["An Efficient method for Multimedia Data Storage and retrieval: Based on Attributes", "International Journal of Computer Science and Information Technology, 3(1)", 2009, "CrossRef, Index Copernicus"],
  ["Analyzing Different Methods for Congestion Control in SS7 Network", "International Journal of Computing Science and Communication Technologies, 2(2)", 2009, "DOAJ"],
  ["Novel Approach of Accessing Real-Time Data using SIP", "International Journal of Computing Science and Communication Technologies, 2(2)", 2009, "DOAJ"],
];

/** Source: biodata section 19 (book chapters listed). */
const chapters: Row[] = [
  ["On the Novel Image Algorithms Filling Material Index over the Finite-Difference Time-Domain Grid for Analysis of Microstrip Patch Antenna Using MATLAB", "Applied Computer Vision and Image Processing", 2020],
  ["A Novel Approach of Image Processing to Identify Type and Name of Snake", "Applied Computer Vision and Image Processing", 2020],
  ["Design Study and Feasibility of Hyperthermia Technique", "Computing in Engineering and Technology", 2019],
  ["Sensing Matrices in Compressed Sensing", "Computing in Engineering and Technology", 2019],
  ["Performance Analysis of SLM Technique for PAPR Reduction in OFDM Using QPSK Modulation", "Computing, Communication and Signal Processing", 2021],
  ["Application of compressed sensing (CS) for ECG signal compression: A Review", "Advances in Intelligent Systems and Computing (AISC 469)", 2017],
  ["Detection of Epileptic Seizure Using Wavelet Transform and Neural Network Classifier", "Advances in Intelligent Systems and Computing (AISC 810)", 2018],
  ["Investigation on Daubechies Wavelet-Based Compressed Sensing Matrices for ECG Compression", "Advances in Intelligent Systems and Computing (AISC 810)", 2018],
  ["EEG-based diagnosis of Alzheimer's disease using Kolmogorov complexity", "Advances in Intelligent Systems and Computing (AISC 1354)", 2021],
  ["Data Handling Approach for Machine Learning in Wireless Communication: A Survey", "Advances in Intelligent Systems and Computing (AISC 1354)", 2021],
  ["240 Gbps WDM DPSK Free Space Optical Link for Clear Weather Condition", "Lecture Notes in Electrical Engineering", 2022],
  ["Feasibility Study for Local Hyperthermia of Breast Tumors: A 2D Modeling Approach", "Lecture Notes in Networks and Systems (LNNS 301)", 2022],
];

const toPub = (type: Publication["type"]) => (r: Row): Publication => ({
  title: r[0],
  venue: r[1],
  year: r[2],
  indexing: r[3],
  type,
  domain: inferDomain(r[0]),
  source: "biodata",
});

export const biodataPublications: Publication[] = [...journals.map(toPub("journal")), ...chapters.map(toPub("chapter"))];
