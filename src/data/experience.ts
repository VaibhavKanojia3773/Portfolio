/* ─── Experience ────────────────────────────────────────────────
   Add new roles by appending to the array.
   Entries are rendered in the order they appear here.
   ─────────────────────────────────────────────────────────────── */

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location?: string;
  duration: string;
  highlights: string[];
  techUsed?: string[];
}

export const experiences: Experience[] = [
  {
    id: "igdtuw",
    role: "ML Research Intern",
    organization: "IGDTUW",
    location: "Delhi, India",
    duration: "Jan 2025 – Mar 2025",
    highlights: [
      "Designed a 4-stage architecture for a self-learning CBT chatbot using BERT-based sentiment analysis, topic modelling, and clustering for cognitive distortion discovery.",
      "Engineered Python prototypes to preprocess and analyse ~300 simulated dialogue samples, documenting research gaps in hallucination control and personalization.",
    ],
    techUsed: ["BERT", "Python", "NLP", "Clustering", "Topic Modelling"],
  },
  {
    id: "infosys",
    role: "AI & Machine Learning Intern",
    organization: "Infosys",
    location: "India",
    duration: "Oct 2024 – Dec 2024",
    highlights: [
      "Developed a CNN-based OCR system in PyTorch and OpenCV, training on ~60K samples with automated preprocessing and augmentation.",
      "Set up a batch inference pipeline processing 1K samples per test cycle with reproducible evaluation & logging workflows.",
    ],
    techUsed: ["PyTorch", "OpenCV", "CNN", "OCR", "Python"],
  },
];
