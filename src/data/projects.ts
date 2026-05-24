export type AccentTheme =
  | "neural"
  | "galaxy"
  | "agent"
  | "vision"
  | "rag"
  | "ocr"
  | "translate"
  | "wave";

export type ProjectTier = "featured" | "lab";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tier: ProjectTier;
  accentTheme: AccentTheme;
  year?: string;
  award?: string;
  image: string;
  problem: string;
  approach: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  links: {
    github: string;
    demo: string;
    paper: string;
  };
}

export const projects: Project[] = [
  {
    id: "gitgalaxy",
    title: "GitGalaxy",
    subtitle: "Explore any GitHub repo as a navigable 3D semantic galaxy",
    tier: "featured",
    accentTheme: "galaxy",
    year: "2026",
    image: "",
    problem:
      "Reading a large codebase file-by-file misses the shape of the system — which modules cluster, which are outliers, where the gravity is. Traditional file trees flatten this structure away.",
    approach:
      "Used jina-embeddings-v2-base-code to generate 768-dim representations for every typed symbol extracted by Tree-sitter, then projected the resulting manifold into 3D with UMAP for spatial exploration in WebGL. Tuned a FAISS index delivering sub-20ms queries over the embedded corpus, backed by a content-addressed cache that loads pre-computed repos instantly; runs fully on-device with no API keys.",
    techStack: ["3D Knowledge Graph", "Semantic Search"],
    metrics: [
      { label: "Search Latency", value: "<20ms" },
      { label: "Embed Dim", value: "768" },
      { label: "Models", value: "Local-only" },
    ],
    links: {
      github: "https://github.com/VaibhavKanojia3773/GitGalaxy",
      demo: "",
      paper: "",
    },
  },
  {
    id: "project-synapse",
    title: "Project Synapse",
    subtitle: "Autonomous agent for last-mile delivery disruptions",
    tier: "featured",
    accentTheme: "agent",
    year: "2025",
    image: "",
    problem:
      "Last-mile delivery breaks in unpredictable ways — overloaded merchants, packaging disputes, recipient unavailability, traffic. Rule-based alerts can't reason about novel combinations of these failures.",
    approach:
      "Designed a custom ReAct loop (perceive → plan → execute → reflect → close) over a typed tool registry, exposing function signatures to the LLM and orchestrating multi-tool resolution plans for last-mile delivery disruptions. Built structured trace logging for every plan, tool call, and reflection step, with a 3-tier provider fallback that degrades gracefully to a deterministic mock — the agent runs end-to-end with no internet, no API keys, and no LangChain.",
    techStack: ["Agentic AI", "Multi-Step Reasoning"],
    metrics: [
      { label: "Fallback Chain", value: "3-tier" },
      { label: "Services", value: "Food · Express · Car" },
      { label: "Observability", value: "Full Trace" },
    ],
    links: {
      github: "https://github.com/VaibhavKanojia3773/project-synapse",
      demo: "",
      paper: "",
    },
  },
  {
    id: "dr-buddy",
    title: "Dr. Buddy",
    subtitle: "AI medical assistant — voice-first RAG + clinical vision",
    tier: "featured",
    accentTheme: "rag",
    year: "2025",
    image: "",
    problem:
      "Clinicians need diagnostic context in seconds — but switching between EHR, imaging, and reference material breaks flow. Existing assistants don't speak to vision artifacts (scans, reports) or handle voice in real time.",
    approach:
      "Built a RAG + LLM system for real-time voice-based clinical interaction. Deployed ResNet-based vision models with OpenCV to parse medical reports automatically, returning context-aware insights grounded in retrieved clinical references.",
    techStack: ["RAG + Vision", "Voice Interaction"],
    metrics: [
      { label: "Interaction", value: "Real-time Voice" },
      { label: "Report Parsing", value: "Automated" },
      { label: "Architecture", value: "RAG + Vision" },
    ],
    links: {
      github: "https://github.com/VaibhavKanojia3773/HealthCare-App",
      demo: "",
      paper: "",
    },
  },
  {
    id: "protect-her",
    title: "ProtectHer",
    subtitle: "Risk-aware urban-safety web application",
    tier: "featured",
    accentTheme: "vision",
    year: "2024",
    image: "",
    problem:
      "Urban safety apps either react after-the-fact or rely on static heatmaps. Real protection needs continuous threat inference fused with routing that adapts to live signals.",
    approach:
      "Built a 4-stage browser pipeline that fuses lightweight face and attribute detectors with a custom VGG16 + Dense-head harassment classifier trained on 1K paired frames to 88.5% accuracy, running at 30 FPS locally. Implemented a Dijkstra-based safest-route picker that re-ranks candidate routes via a hotspot-weighted edge model, alongside a domain-grounded safety assistant primed with Indian helpline directories and legal context for emergency-first responses.",
    techStack: ["Multi-Stage Computer Vision", "Graph Routing"],
    metrics: [
      { label: "Classifier Accuracy", value: "88.5%" },
      { label: "Throughput", value: "30 FPS" },
      { label: "Pipeline", value: "4-stage" },
    ],
    links: {
      github: "https://github.com/VaibhavKanojia3773/ProtectHer",
      demo: "",
      paper: "",
    },
  },

  {
    id: "neurosynx",
    title: "NeuroSynX",
    subtitle: "Synthetic EEG generation with explainable seizure analysis",
    tier: "lab",
    accentTheme: "neural",
    year: "2025",
    award: "IMPULSE 2025 Winner",
    image: "",
    problem:
      "EEG datasets are small and class-imbalanced — models overfit to majority classes and stay black-boxed.",
    approach:
      "Time + frequency feature extraction (FFT, wavelets), denoising and SVM baselines, WGAN-GP for class-balanced synthetic EEG, then SHAP + saliency analysis on 1K+ samples to read channel-level importance and failure modes.",
    techStack: ["Generative Modelling", "Explainable AI"],
    metrics: [
      { label: "Accuracy", value: "0.96" },
      { label: "ROC-AUC", value: "0.92" },
      { label: "Samples", value: "1K+" },
    ],
    links: {
      github: "https://github.com/VaibhavKanojia3773/Impulse-2025",
      demo: "",
      paper: "",
    },
  },
  {
    id: "bookify-ai",
    title: "Bookify-AI",
    subtitle: "YouTube playlists → typeset PDF books, ≤15% LLM framing",
    tier: "lab",
    accentTheme: "ocr",
    year: "2026",
    image: "",
    problem:
      "Course playlists carry great content but no reproducible artifact you can read, search, or cite.",
    approach:
      "Five-phase deterministic pipeline (only 2 phases touch an LLM). Transcripts via local cache → YouTube captions → yt-dlp → Whisper. Per-chapter LLM framing capped at 15% of word count. Provider-agnostic via LiteLLM (Gemini / Claude / Groq / Ollama). Content-addressed cache means comment-only edits don't invalidate downstream builds.",
    techStack: ["Deterministic Pipeline", "Multi-Provider LLM"],
    metrics: [
      { label: "LLM Framing Cap", value: "≤15%" },
      { label: "Providers", value: "4" },
      { label: "Offline Mode", value: "Full" },
    ],
    links: {
      github: "https://github.com/VaibhavKanojia3773/Bookify-AI",
      demo: "",
      paper: "",
    },
  },
  {
    id: "edtech-ai-coach",
    title: "EdTech AI Coach",
    subtitle: "Student JSON → personalized feedback PDFs via LLMs",
    tier: "lab",
    accentTheme: "ocr",
    year: "2025",
    image: "",
    problem:
      "Generic test reports tell students their score but not what to do next.",
    approach:
      "Parses subject + chapter-level performance JSON, forces time-vs-accuracy analysis in prompts (no empty insights), and renders a styled PDF combining Matplotlib charts with LLM-generated narrative feedback. Multi-provider — OpenAI, Claude, Gemini.",
    techStack: ["LLM Prompting", "Report Generation"],
    metrics: [
      { label: "Granularity", value: "Subject + Chapter" },
      { label: "Output", value: "Styled PDF" },
      { label: "Providers", value: "3" },
    ],
    links: {
      github: "https://github.com/VaibhavKanojia3773/EdTech-AI-Coach",
      demo: "",
      paper: "",
    },
  },
  {
    id: "lunar-crater",
    title: "Lunar Crater Detection",
    subtitle: "CNN + classical CV on Chandrayaan OHRC imagery — ISRO hackathon",
    tier: "lab",
    accentTheme: "wave",
    year: "2024",
    image: "",
    problem:
      "Manual crater annotation on orbital imagery doesn't scale — and pure-CV pipelines miss small craters under varied illumination.",
    approach:
      "Hybrid pipeline: Gaussian blur + Canny edge detection + contour extraction for candidates, CNN classifier with rotation/scale augmentation for verification. Outputs selenographic position, diameter, and polygonal shape files for each detection.",
    techStack: ["Hybrid CV", "Orbital Imagery"],
    metrics: [
      { label: "Imagery", value: "OHRC" },
      { label: "Output", value: "Shape Files" },
      { label: "Eval", value: "P / R / F1" },
    ],
    links: {
      github: "https://github.com/VaibhavKanojia3773/Lunar-Crater-Detection",
      demo: "",
      paper: "",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const labProjects = projects.filter((p) => p.tier === "lab");
