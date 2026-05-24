export interface Paper {
  id: string;
  title: string;
  venue: string;
  year: string;
  authors?: string;
  link: string;
  summary?: string;
  screenshot: string;
  abstract: string;
  highlights: string[];
  keyResults?: { label: string; value: string }[];
  tags: string[];
  featured?: boolean;
}

export const papers: Paper[] = [
  {
    id: "divide-and-translate",
    title:
      "Divide and Translate: Parameter Isolation with Encoder Freezing for Low-Resource Indic NMT",
    venue: "IJCNLP-AACL 2025",
    year: "2025",
    authors: "Vaibhav Kanojia",
    link: "https://openreview.net/forum?id=yzK90yP53m",
    summary: "/Research_Summary_Vaibhav_Kanojia.pdf",
    screenshot: "/images/research/divide-translate-poster.png",
    abstract:
      "Transformer multilingual models assume fully-shared parameters across languages — in extreme low-resource settings this causes negative transfer, where high-resource patterns dominate and degrade structurally different languages. Divide and Translate enforces parameter isolation: a frozen NLLB-600M encoder preserves cross-lingual semantics, while 8 direction-specific decoders act as specialized morphological adapters. Bitext-reversal augmentation doubles data without noise; bfloat16 + gradient checkpointing fit the entire run on a single 16GB GPU.",
    highlights: [
      "Frozen NLLB-600M encoder + 8 direction-specific decoders",
      "Bitext-reversal augmentation in a <20k-pair data regime",
      "bfloat16 + gradient checkpointing → single 16GB GPU training",
      "Outperforms unified fine-tuning (gradient interference) and LoRA/adapters (insufficient capacity)",
      "Covers Hindi ↔ Bhili / Gondi / Mundari and English ↔ Santali",
    ],
    keyResults: [
      { label: "Leaderboard Score", value: "171.4 / 161.1" },
      { label: "Public–Private Drift", value: "<6%" },
      { label: "GPU Footprint", value: "16 GB" },
    ],
    tags: [
      "NMT",
      "Low-Resource NLP",
      "Parameter Isolation",
      "NLLB",
      "Indic Languages",
    ],
    featured: true,
  },
];
