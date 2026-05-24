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
      "Architected a 4-stage self-learning CBT chatbot leveraging BERT-based sentiment analysis, BERTopic-driven topic modelling, and unsupervised clustering to surface cognitive distortions directly from unlabeled conversational data.",
      "Authored Python preprocessing and analysis prototypes over ~300 simulated dialogue samples, formalizing open research gaps in hallucination control, persona conditioning, and long-horizon dialogue safety for downstream publication.",
    ],
    techUsed: ["BERT", "BERTopic", "Python", "NLP", "Clustering"],
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
