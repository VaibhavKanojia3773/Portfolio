export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  detail: string;
  category: "competition" | "hackathon" | "community";
}

export const stats: Stat[] = [
  {
    label: "Amazon ML Challenge",
    value: 67,
    suffix: " / 20,000",
    description: "Top 1% — ranked 67th out of 20,000+ participants",
  },
  {
    label: "Kaggle Playground",
    value: 22,
    suffix: " / 3,000+",
    description: "Top 1% — October 2024 competition",
  },
  {
    label: "Hackathon Wins",
    value: 4,
    suffix: " podiums",
    description: "4 national hackathon wins — incl. 3 podiums in one week",
  },
  {
    label: "Research Papers",
    value: 1,
    suffix: " published",
    description: "IJCNLP-AACL 2025",
  },
];

export const achievements: Achievement[] = [
  {
    id: "amazon-ml",
    title: "Top 1% — Amazon ML Challenge 2025",
    detail: "Ranked 67 out of 20,000+ participants in Amazon's ML Challenge.",
    category: "competition",
  },
  {
    id: "kaggle",
    title: "Top 1% — Kaggle Playground",
    detail:
      "Ranked 22 out of 3,000+ in the October 2024 Kaggle Playground competition.",
    category: "competition",
  },
  {
    id: "hackathons",
    title: "3 National Hackathon Podiums in a Week",
    detail:
      "1st @ Quantum Hackathon (IIT Jodhpur) · 2nd @ TensorQuest (IIEST Shibpur) · 3rd @ Impulse 2025 (NIT Karnataka)",
    category: "hackathon",
  },
  {
    id: "du-hackathon",
    title: "Winner — Hack The Universe (Delhi University)",
    detail:
      "1st place overall against 200+ competing teams at Delhi University's flagship hackathon.",
    category: "hackathon",
  },
  {
    id: "wunderfund",
    title: "Top 2% — Wunder Fund Quant Challenge",
    detail:
      "Ranked 79 / 5000 globally — score 0.3770 vs winner's 0.3920 (a 0.015 gap). A global quantitative-finance / time-series challenge.",
    category: "competition",
  },
  {
    id: "community",
    title: "Research & Community",
    detail:
      "Researcher at Calibre DTU · Member of IEEE, GDG DTU & AIMS (AI & ML Society)",
    category: "community",
  },
];
