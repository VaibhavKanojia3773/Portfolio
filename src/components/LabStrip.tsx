"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, ArrowUpRight, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { ThemedPlaceholder } from "@/components/placeholders";
import type { Project } from "@/data/projects";

interface LabStripProps {
  projects: Project[];
  onOpen: (p: Project) => void;
}

const SCROLL_STEP = 320;

export default function LabStrip({ projects, onOpen }: LabStripProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateButtons();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * SCROLL_STEP, behavior: "smooth" });
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-xs text-violet-500 dark:text-violet-400 tracking-[0.25em] uppercase shrink-0">
            // lab
          </span>
          <div className="h-px w-12 bg-violet-500/30 shrink-0" />
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 truncate">
            Experiments &amp; smaller builds
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll lab strip left"
            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400
              hover:border-violet-300 dark:hover:border-violet-500/40 hover:text-violet-600 dark:hover:text-violet-400
              disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 dark:disabled:hover:border-slate-800
              disabled:hover:text-slate-500 dark:disabled:hover:text-slate-400
              transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            aria-label="Scroll lab strip right"
            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400
              hover:border-violet-300 dark:hover:border-violet-500/40 hover:text-violet-600 dark:hover:text-violet-400
              disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 dark:disabled:hover:border-slate-800
              disabled:hover:text-slate-500 dark:disabled:hover:text-slate-400
              transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="-mx-6 px-6 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24 xl:-mx-32 xl:px-32
          overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <div className="flex gap-5 min-w-min">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => onOpen(project)}
              data-cursor="view"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              style={{ scrollSnapAlign: "start" }}
              className="group relative flex-shrink-0 w-[280px] sm:w-[300px] text-left rounded-2xl border border-slate-200 dark:border-slate-800
                bg-white dark:bg-slate-900/60 overflow-hidden
                hover:border-violet-300 dark:hover:border-violet-500/30
                hover:shadow-xl hover:shadow-violet-500/5
                transition-all duration-300"
            >
              <div className="relative h-32 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ThemedPlaceholder theme={project.accentTheme} />
                )}
                {project.award && (
                  <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-sm">
                    <Award size={10} className="text-white" />
                    <span className="text-[9px] font-semibold text-white tracking-wide">
                      {project.award}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </h4>
                  {project.year && (
                    <span className="shrink-0 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      {project.year}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                  {project.subtitle}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.techStack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider
                        bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                        border border-slate-200 dark:border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-1 text-[9px] font-mono text-slate-400 dark:text-slate-600">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  {project.links.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      <Github size={11} />
                      Code
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 italic">
                      private
                    </span>
                  )}
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    details
                    <ArrowUpRight size={10} />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}

          <div className="flex-shrink-0 w-12 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.25em] text-slate-300 dark:text-slate-700">
            //end
          </div>
        </div>
      </div>
    </div>
  );
}
