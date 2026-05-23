"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BookOpen,
  FileText,
  ExternalLink,
  ScrollText,
  Snowflake,
} from "lucide-react";
import { TranslatePlaceholder } from "@/components/placeholders";
import type { Paper } from "@/data/research";
import { fadeInUp } from "@/lib/animations";

export default function ResearchFeature({
  paper,
  onScreenshotClick,
}: {
  paper: Paper;
  onScreenshotClick?: (src: string, alt: string) => void;
}) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative rounded-3xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900/40 overflow-hidden
        hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10
        transition-all duration-500"
    >
      {/* Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-400" />

      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-0">
        {/* Left: rich content */}
        <div className="p-8 sm:p-10 lg:p-12">
          {/* Venue + paper-of-record badge */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20">
              <BookOpen size={11} className="text-violet-500" />
              <span className="text-[10px] font-mono font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                {paper.venue}
              </span>
            </span>
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
              · {paper.year}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.18em] text-amber-500 dark:text-amber-400">
              <Snowflake size={10} />
              frozen encoder
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white leading-tight mb-3">
            {paper.title}
          </h3>

          {paper.authors && (
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-5">
              {paper.authors}
            </p>
          )}

          <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {paper.abstract}
          </p>

          {/* Key results stat grid */}
          {paper.keyResults && paper.keyResults.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {paper.keyResults.map((r) => (
                <div
                  key={r.label}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/40 text-center"
                >
                  <div className="text-base sm:text-lg font-bold text-violet-600 dark:text-violet-400">
                    {r.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Core Idea
            </h4>
            <ul className="space-y-2">
              {paper.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-violet-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
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

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {paper.link ? (
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  bg-violet-600 text-white hover:bg-violet-500
                  dark:bg-violet-500 dark:hover:bg-violet-400 dark:text-slate-900
                  transition-all"
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
                Link coming soon
              </span>
            )}
            {paper.summary && (
              <a
                href={paper.summary}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  border border-violet-200 dark:border-violet-500/30 text-violet-600 dark:text-violet-400
                  hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all"
              >
                <ScrollText size={14} />
                Read Summary
              </a>
            )}
          </div>
        </div>

        {/* Right: architecture animation on top, poster below */}
        <div className="relative flex flex-col border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800/60 bg-slate-50/40 dark:bg-slate-950/40">
          {/* Architecture animation */}
          <div className="relative w-full h-44 sm:h-52">
            <TranslatePlaceholder />
            <span className="absolute top-2 left-3 text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500/80 select-none pointer-events-none">
              // architecture
            </span>
          </div>

          {/* Poster (clickable) */}
          {paper.screenshot && (
            <button
              type="button"
              onClick={() =>
                onScreenshotClick?.(paper.screenshot, paper.title)
              }
              data-cursor="view"
              className="relative flex-1 w-full group/poster overflow-hidden border-t border-slate-200/60 dark:border-slate-800/60"
              aria-label={`Open poster preview for ${paper.title}`}
            >
              <Image
                src={paper.screenshot}
                alt={`${paper.title} — poster`}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-contain object-center px-4 pt-7 pb-4 sm:px-5 sm:pt-7 sm:pb-4 transition-transform duration-500 group-hover/poster:scale-[1.02]"
              />
              <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-sm border border-white/10 z-10">
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-slate-200">
                  MMLoSo · poster
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-violet-500/0 group-hover/poster:bg-violet-500/5 transition-colors duration-300" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
