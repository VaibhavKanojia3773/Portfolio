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
    id: "opentrade",
    role: "Software Engineering Intern",
    organization: "OpenTrade",
    location: "Y Combinator S26",
    duration: "July 2026 – Present",
    highlights: [
      "First engineering hire at OpenTrade (YC S26); conceptualized and shipped the platform's first in-app game from zero as the sole engineer, reporting directly to the CEO & CTO.",
      "Building and iterating on AI-driven systems that power core product features, from data pipelines to real-time delivery logic.",
    ],
    techUsed: ["AI Systems", "Data Pipelines", "Product Engineering"],
  },
  {
    id: "infosys",
    role: "AI & Machine Learning Intern",
    organization: "Infosys",
    location: "India",
    duration: "Oct 2024 – Dec 2024",
    highlights: [
      "Shipped an end-to-end OCR pipeline in PyTorch + OpenCV, training a custom convolutional architecture on a 60K-sample corpus with automated preprocessing, normalization, and augmentation to harden the model against real-world noise.",
      "Stress-tested the network against LeNet and ResNet-18 under identical augmentation, optimizer, and seed protocols; the custom model beat ResNet-18 by ~0.4% accuracy at one-third the parameter count and half the training time, served behind a reproducible batch-inference pipeline at 1K samples per cycle.",
    ],
    techUsed: ["PyTorch", "OpenCV", "CNN", "OCR", "Python"],
  },
];
