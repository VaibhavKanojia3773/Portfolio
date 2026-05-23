"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FileText,
  ExternalLink,
  BookOpen,
  X,
  ImageIcon,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ResearchFeature from "@/components/ResearchFeature";
import { papers } from "@/data/research";
import { fadeInUp, stagger } from "@/lib/animations";

/* ─── Screenshot Lightbox ────────────────────────────────────── */
function ScreenshotLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl w-full max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 p-2 rounded-lg text-white/70 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain bg-white"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Secondary Paper Card ───────────────────────────────────── */
function SecondaryPaperCard({
  paper,
  onScreenshotClick,
}: {
  paper: (typeof papers)[number];
  onScreenshotClick: (src: string, alt: string) => void;
}) {
  return (
    <motion.article
      variants={fadeInUp}
      className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 overflow-hidden
        hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5
        transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500" />

      <div className="grid lg:grid-cols-2 gap-0">
        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={14} className="text-violet-500" />
            <span className="text-xs font-mono font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              {paper.venue}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              · {paper.year}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white leading-snug mb-2">
            {paper.title}
          </h3>

          {paper.authors && (
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
              {paper.authors}
            </p>
          )}

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {paper.abstract}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider
                  bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400
                  border border-violet-200 dark:border-violet-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {paper.link ? (
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400
                hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all"
            >
              <FileText size={14} />
              Read Paper
              <ExternalLink size={11} />
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono
                border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600"
            >
              <FileText size={14} />
              Add paper link in research.ts
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8 lg:py-10 flex items-center">
          {paper.screenshot ? (
            <button
              type="button"
              onClick={() => onScreenshotClick(paper.screenshot, paper.title)}
              data-cursor="view"
              className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group/ss"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={paper.screenshot}
                  alt={paper.title}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </button>
          ) : (
            <div
              className="relative w-full rounded-xl overflow-hidden border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30"
            >
              <div className="aspect-[16/10] flex flex-col items-center justify-center gap-2">
                <ImageIcon size={32} className="text-slate-300 dark:text-slate-600" />
                <span className="text-xs font-mono text-slate-400 dark:text-slate-600">
                  Add screenshot in research.ts
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Research Section ───────────────────────────────────────── */
export default function Research() {
  const [lightboxSrc, setLightboxSrc] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const featured = papers.find((p) => p.featured);
  const others = papers.filter((p) => !p.featured);

  const handleScreenshot = (src: string, alt: string) =>
    setLightboxSrc({ src, alt });

  return (
    <section id="research" className="pt-10 pb-28 section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="02" title="Research" />

        {featured && (
          <ResearchFeature
            paper={featured}
            onScreenshotClick={handleScreenshot}
          />
        )}

        {others.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8 mt-10"
          >
            {others.map((paper) => (
              <SecondaryPaperCard
                key={paper.id}
                paper={paper}
                onScreenshotClick={handleScreenshot}
              />
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <ScreenshotLightbox
            src={lightboxSrc.src}
            alt={lightboxSrc.alt}
            onClose={() => setLightboxSrc(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
