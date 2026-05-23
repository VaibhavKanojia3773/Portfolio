/* ─── Projects ──────────────────────────────────────────────────
   Add new projects by appending to the array below.
   Each project follows the same shape — just copy one and edit.

   Images:
     Place screenshots in /public/images/projects/
     Then set image to "/images/projects/your-file.png"
     Leave "" to fall back to the themed generative placeholder.
   ─────────────────────────────────────────────────────────────── */

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
  /* ─── FEATURED ─────────────────────────────────────────────── */
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
      "Embed every code symbol with jinaai/jina-embeddings-v2-base-code (768-dim), project to 3D via UMAP, index with FAISS for sub-20ms semantic search, and render an interactive WebGL galaxy. Tree-sitter parses code structure; an optional qwen2.5-coder:7b layer adds cluster explanations and impact analysis. All models run locally — no API keys.",
    techStack: [
      "Jina Embeddings",
      "UMAP",
      "FAISS",
      "Tree-sitter",
      "FastAPI",
      "WebGL",
      "Ollama",
    ],
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
    subtitle:
      "Autonomous ReAct agent for last-mile delivery disruptions — built for GrabHack",
    tier: "featured",
    accentTheme: "agent",
    year: "2025",
    image: "",
    problem:
      "Last-mile delivery breaks in unpredictable ways — overloaded merchants, packaging disputes, recipient unavailability, traffic. Rule-based alerts can't reason about novel combinations of these failures.",
    approach:
      "Custom ReAct loop (perceive → plan → execute → reflect → close) with a typed tool registry. LLM provider fallback chain: Gemini 2.5 Flash → GPT-4o-mini → deterministic Mock — fully functional offline. Streamlit + Folium UI surfaces evidence trails and driver re-routing. No LangChain — every decision is logged and replayable.",
    techStack: [
      "ReAct",
      "Gemini",
      "OpenAI",
      "TomTom Maps",
      "Streamlit",
      "Folium",
      "Python",
    ],
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
    techStack: ["LLMs", "RAG", "ResNet", "OpenCV", "CNNs", "Python"],
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
    subtitle: "Tri-model CV pipeline + risk-aware navigation for urban safety",
    tier: "featured",
    accentTheme: "vision",
    year: "2024",
    image: "",
    problem:
      "Urban safety apps either react after-the-fact or rely on static heatmaps. Real protection needs continuous threat inference fused with routing that adapts to live signals.",
    approach:
      "Integrated a tri-model CV pipeline — emotion detection, harassment-context classification, gender recognition — evaluated on ~300 curated video clips. Risk-aware navigation runs Dijkstra's algorithm over a hotspot graph aggregated from ~2K live inference events, re-weighting edges as new threats are detected.",
    techStack: [
      "PyTorch",
      "OpenCV",
      "React",
      "Dijkstra",
      "CNNs",
    ],
    metrics: [
      { label: "Combined Accuracy", value: "~82%" },
      { label: "Inference Events", value: "~2K" },
      { label: "Video Clips", value: "~300" },
    ],
    links: {
      github: "https://github.com/VaibhavKanojia3773/ProtectHer",
      demo: "",
      paper: "",
    },
  },

  /* ─── LAB STRIP ────────────────────────────────────────────── */
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
    techStack: ["WGAN-GP", "SHAP", "SVM", "FFT", "Wavelets", "Python"],
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
    techStack: ["LiteLLM", "yt-dlp", "ReportLab", "Whisper", "SQLite"],
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
    techStack: [
      "Streamlit",
      "Matplotlib",
      "Gemini",
      "ReportLab",
      "Python",
    ],
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
    techStack: ["CNN", "OpenCV", "PDS4", "Python"],
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
