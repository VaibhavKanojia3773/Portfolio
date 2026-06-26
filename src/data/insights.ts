export interface Exploration {
  id: string;
  title: string;
  description: string;
  icon: string;
}

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
