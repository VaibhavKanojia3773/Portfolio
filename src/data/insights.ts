export interface Insight {
  id: string;
  text: string;
  context?: string;
}

export interface Exploration {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name (used as lookup key)
}

export const insights: Insight[] = [
  {
    id: "generalize",
    text: "A model that doesn't generalize is just a lookup table with extra steps.",
    context: "On evaluation rigor",
  },
  {
    id: "production-gap",
    text: "The gap between a notebook and production is where most ML projects go to die.",
    context: "On systems thinking",
  },
  {
    id: "evaluation",
    text: "Evaluation is not a metric — it's a strategy.",
    context: "On methodology",
  },
  {
    id: "low-resource",
    text: "Low-resource doesn't mean low-ambition.",
    context: "On research",
  },
  {
    id: "wrong",
    text: "The best ML system is one that knows when it's wrong.",
    context: "On robustness",
  },
];

export const explorations: Exploration[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI Systems",
    description:
      "Building autonomous systems that can reason, plan, and execute multi-step tasks, not just predict.",
    icon: "bot",
  },
  {
    id: "ai-products",
    title: "0 → 1 AI Products",
    description:
      "Engineering production AI under startup constraints: small teams, fast iteration, real users from day one.",
    icon: "rocket",
  },
  {
    id: "generative-models",
    title: "Generative Models & Diffusion",
    description:
      "Exploring diffusion architectures, controllable generation, and applications beyond image synthesis.",
    icon: "sparkles",
  },
];
