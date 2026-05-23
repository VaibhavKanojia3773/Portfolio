# Portfolio — Vaibhav Kanojia

Personal portfolio site. ML research, agentic systems, and the engineering behind both.

**Live:** *(coming soon — deploys to Vercel)*
**Resume:** [`/VaibhavKanojia_Resume_2026.pdf`](./public/VaibhavKanojia_Resume_2026.pdf)
**Paper:** [Divide and Translate — IJCNLP-AACL 2025](https://openreview.net/forum?id=yzK90yP53m)

---

## What's inside

- **Hero** with an interactive neural-network canvas that reacts to the cursor
- **Terminal intro** that auto-plays once per session, skippable on any keypress
- **Featured projects** (GitGalaxy, Project Synapse, ProtectHer) + a lab strip for smaller experiments
- **Research feature tile** for the published paper, with the architecture animation and poster side-by-side
- **Custom cursor** with a "view" label on interactive elements
- **Magnetic CTAs** that drift toward the cursor when nearby
- **Themed generative SVG placeholders** for each project (no stock illustrations)
- **Dark / light theme** with a flicker-free initial paint

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Animation | Framer Motion + plain `<canvas>` 2D for the neural hero |
| Icons | lucide-react |
| Hosting | Vercel |
| Fonts | Inter (sans) · JetBrains Mono (mono) |

No GSAP, no Three.js, no UI-component library. Everything is hand-built.

---

## Run it locally

```bash
git clone https://github.com/VaibhavKanojia3773/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Open `http://localhost:3000`. Hot reload is on.

To build for production:

```bash
npm run build
npm start
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx           Root layout, theme provider, custom cursor mount
│   ├── page.tsx             Section orchestration
│   └── globals.css          Base styles + custom utilities
├── components/
│   ├── TerminalIntro.tsx    Auto-play terminal splash, session-once
│   ├── Hero.tsx             Name + tagline + stats + magnetic CTAs
│   ├── HeroNeuralCanvas.tsx Cursor-reactive neural net (canvas 2D)
│   ├── CustomCursor.tsx     Dot + ring cursor with "view" label
│   ├── MagneticButton.tsx   Spring-eased magnetic anchor
│   ├── About.tsx            Photo + identity card + bio + focus areas
│   ├── Projects.tsx         Featured grid + lab strip + detail modal
│   ├── LabStrip.tsx         Horizontal-scroll secondary projects
│   ├── ResearchFeature.tsx  Paper tile with arch animation + poster
│   ├── placeholders/        Themed SVG animations per project
│   └── ...                  Experience, Achievements, Skills, Contact
├── data/
│   ├── personal.ts          Name, links, bio, skills
│   ├── projects.ts          Featured + lab projects, with metadata
│   ├── research.ts          Papers
│   ├── experience.ts        Work history
│   └── achievements.ts      Stats + awards
└── lib/
    ├── animations.ts        Shared Framer Motion variants
    └── utils.ts             clsx wrapper
```

Content lives in `src/data/`. Component files don't need editing to update text — only to change layout.

---

## Adding a new project

1. Append to `src/data/projects.ts`. Set `tier: "featured"` for the main grid or `"lab"` for the strip.
2. Pick an `accentTheme` from the existing eight (`neural`, `galaxy`, `agent`, `vision`, `rag`, `ocr`, `translate`, `wave`) — drives the animated placeholder.
3. Drop a screenshot into `public/images/projects/` if you want a real image instead of the placeholder, then set `image: "/images/projects/your-file.png"`.

That's it. No component changes needed.

---

## License

Code is MIT. Content (text, images, research) is mine — don't redistribute without asking.
